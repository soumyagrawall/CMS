import React, { useState, useEffect } from 'react';
import { X, Heart, Bookmark, Share2, Send, MessageCircle, Link, Check, Trash2 } from 'lucide-react';
import { api } from '../services/api';

export default function PostDetailModal({ isOpen, imageId, onClose, user, onAuthPrompt, onTagClick, onLikeToggle, onSaveToggle, onDeleteToggle }) {
  if (!isOpen || !imageId) return null;

  const [image, setImage] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const [followText, setFollowText] = useState('Follow');
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  // Micro-animations state
  const [likeAnimate, setLikeAnimate] = useState(false);
  const [saveAnimate, setSaveAnimate] = useState(false);

  useEffect(() => {
    let active = true;
    const fetchPostData = async () => {
      try {
        setLoading(true);
        const data = await api.getImageDetail(imageId);
        if (!active) return;
        setImage(data.image);

        // Fetch comments
        const commData = await api.getComments(imageId);
        if (!active) return;
        setComments(commData.comments || []);

        // Follow status logic
        if (user && data.image) {
          const profile = await api.getUserProfile(data.image.userId);
          if (!active) return;
          setIsFollowing(profile.isFollowing);
          // Set button follow-back context
          if (profile.isFollowing) {
            setFollowText('Following');
          } else if (profile.isFollowedBy) {
            setFollowText('Follow Back');
          } else {
            setFollowText('Follow');
          }
        }
      } catch (err) {
        console.error('Failed to load image details:', err);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchPostData();
    return () => { active = false; };
  }, [imageId, user]);

  const handleLike = async () => {
    if (!user) {
      onAuthPrompt();
      return;
    }
    setLikeAnimate(true);
    setTimeout(() => setLikeAnimate(false), 400);
    try {
      const res = await api.likeImage(imageId);
      setImage(prev => ({
        ...prev,
        likeCount: res.liked ? prev.likeCount + 1 : Math.max(0, prev.likeCount - 1),
        isLiked: res.liked
      }));
      if (onLikeToggle) onLikeToggle(imageId, res.liked);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    if (!user) {
      onAuthPrompt();
      return;
    }
    setSaveAnimate(true);
    setTimeout(() => setSaveAnimate(false), 400);
    try {
      const res = await api.saveImage(imageId);
      setImage(prev => ({
        ...prev,
        saveCount: res.saved ? prev.saveCount + 1 : Math.max(0, prev.saveCount - 1),
        isSaved: res.saved
      }));
      if (onSaveToggle) onSaveToggle(imageId, res.saved);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFollow = async () => {
    if (!user) {
      onAuthPrompt();
      return;
    }
    try {
      const res = await api.toggleFollowUser(image.userId);
      setIsFollowing(res.following);
      if (res.following) {
        setFollowText('Following');
      } else {
        // Fetch profile to see if follow back is still relevant
        const profile = await api.getUserProfile(image.userId);
        setFollowText(profile.isFollowedBy ? 'Follow Back' : 'Follow');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this visual inspiration? This action cannot be undone.")) return;
    try {
      await api.deleteImage(imageId);
      onClose();
      if (onDeleteToggle) {
        onDeleteToggle(imageId);
      }
    } catch (err) {
      console.error("Failed to delete image:", err);
      alert("Failed to delete post. Please try again.");
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) {
      onAuthPrompt();
      return;
    }
    if (!newComment.trim()) return;

    try {
      const res = await api.addComment(imageId, newComment);
      setComments(prev => [res.comment, ...prev]);
      setNewComment('');
      setImage(prev => ({ ...prev, commentCount: prev.commentCount + 1 }));
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = () => {
    const postUrl = `${window.location.origin}/post?id=${imageId}`;
    navigator.clipboard.writeText(postUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const postUrl = encodeURIComponent(`${window.location.origin}/post?id=${imageId}`);
    const text = encodeURIComponent(`Check out this premium creation on Lumora! `);
    window.open(`https://api.whatsapp.com/send?text=${text}${postUrl}`, '_blank');
  };

  const shareFacebook = () => {
    const postUrl = encodeURIComponent(`${window.location.origin}/post?id=${imageId}`);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`, '_blank');
  };

  const shareTwitter = () => {
    const postUrl = encodeURIComponent(`${window.location.origin}/post?id=${imageId}`);
    const text = encodeURIComponent(`Inspirational art on @LumoraCMS! `);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${postUrl}`, '_blank');
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className="rounded-3xl bg-white p-8 shadow-2xl flex flex-col items-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <span className="mt-4 text-xs font-semibold text-neutral-500">Loading dynamic inspiration details...</span>
        </div>
      </div>
    );
  }

  if (!image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-3xl bg-white shadow-2xl overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-200 flex flex-col md:flex-row h-auto max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full p-2 bg-white/80 backdrop-blur-md text-neutral-800 shadow-md hover:bg-neutral-100 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Side: Visual Assets */}
        <div className="w-full md:w-1/2 bg-neutral-100 flex items-center justify-center relative overflow-hidden min-h-[300px] md:min-h-full">
          <img
            src={image.imageUrl}
            alt={image.title}
            className="w-full h-full object-cover max-h-[40vh] md:max-h-[90vh]"
          />
        </div>

        {/* Right Side: Interactive Board and Controls */}
        <div className="w-full md:w-1/2 flex flex-col p-6 md:p-8 h-full overflow-y-auto max-h-[50vh] md:max-h-[90vh]">
          {/* Header Actions */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className={`p-3 rounded-full border border-neutral-100 hover:bg-red-50 text-neutral-700 hover:text-red-500 transition-all ${
                  image.isLiked ? 'bg-red-50 text-red-500 border-red-100' : ''
                } ${likeAnimate ? 'animate-heart' : ''}`}
              >
                <Heart className={`h-5 w-5 ${image.isLiked ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleSave}
                className={`p-3 rounded-full border border-neutral-100 hover:bg-primary/5 text-neutral-700 hover:text-primary transition-all ${
                  image.isSaved ? 'bg-primary/5 text-primary border-primary/10' : ''
                } ${saveAnimate ? 'scale-110' : ''}`}
              >
                <Bookmark className={`h-5 w-5 ${image.isSaved ? 'fill-current' : ''}`} />
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className={`p-3 rounded-full border border-neutral-100 hover:bg-neutral-50 text-neutral-700 transition-all ${
                    showShareMenu ? 'bg-neutral-100' : ''
                  }`}
                >
                  <Share2 className="h-5 w-5" />
                </button>

                {showShareMenu && (
                  <div className="absolute left-0 mt-2 z-30 w-48 rounded-2xl bg-white p-2 shadow-2xl border border-neutral-100 animate-in fade-in slide-in-from-top-3 duration-150">
                    <button
                      onClick={copyToClipboard}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-green-500">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Link className="h-4 w-4" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={shareWhatsApp}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
                    >
                      <MessageCircle className="h-4 w-4 text-green-600" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      onClick={shareFacebook}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
                    >
                      <span className="font-bold text-blue-600 w-4 text-center">F</span>
                      <span>Facebook</span>
                    </button>
                    <button
                      onClick={shareTwitter}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
                    >
                      <span className="font-bold text-neutral-800 w-4 text-center">𝕏</span>
                      <span>Twitter (X)</span>
                    </button>
                  </div>
                )}
              </div>
              
              {user && Number(user.id) === Number(image.userId) && (
                <button
                  onClick={handleDelete}
                  className="p-3 rounded-full border border-red-100 hover:bg-red-50 text-red-500 transition-all cursor-pointer"
                  title="Delete Post"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Like and Save Count Displays */}
            <div className="text-xs font-bold text-neutral-400 tracking-wider uppercase flex gap-4">
              <span>{image.likeCount} Likes</span>
              <span>{image.saveCount} Saves</span>
            </div>
          </div>

          {/* Title & Description */}
          <div className="mb-6">
            <h1 className="font-serif text-3xl font-bold text-neutral-900 leading-tight mb-2">
              {image.title || 'Untitled'}
            </h1>
            <p className="text-neutral-600 text-sm leading-relaxed whitespace-pre-line">
              {image.caption || 'No description provided.'}
            </p>
          </div>

          {/* Tags */}
          {image.tags && image.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {image.tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    onTagClick(tag);
                    onClose();
                  }}
                  className="rounded-full bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 text-xs font-bold text-neutral-600 transition-colors"
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}

          {/* Creator Information */}
          <div className="flex items-center justify-between border-t border-b border-neutral-100 py-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary font-serif uppercase shadow-inner">
                {image.username ? image.username.charAt(1).toUpperCase() : 'U'}
              </div>
              <div>
                <span className="block text-sm font-bold text-neutral-900">@{image.username || 'creator'}</span>
                <span className="block text-xs font-semibold text-neutral-400">Lumora Author</span>
              </div>
            </div>

            {(!user || Number(user.id) !== Number(image.userId)) && (
              <button
                onClick={handleFollow}
                style={{
                  backgroundColor: isFollowing ? '#f3f4f6' : '#30578f',
                  color: isFollowing ? '#4b5563' : '#ffffff',
                  border: isFollowing ? '1px solid #d1d5db' : 'none',
                  cursor: 'pointer'
                }}
                className="rounded-full px-5 py-2 text-xs font-bold shadow-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              >
                {followText}
              </button>
            )}
          </div>

          {/* Comments Panel */}
          <div className="flex-1 flex flex-col min-h-[150px]">
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">
              Comments ({comments.length})
            </h3>

            {/* List */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1 max-h-[220px]">
              {comments.length === 0 ? (
                <p className="text-xs font-semibold text-neutral-400 italic py-4">No thoughts yet. Share yours below!</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-neutral-200 flex items-center justify-center font-bold text-neutral-600 text-xs font-serif uppercase">
                      {comment.User?.username?.charAt(1).toUpperCase() || 'U'}
                    </div>
                    <div className="bg-neutral-50 rounded-2xl p-3 flex-1">
                      <span className="block text-xs font-bold text-neutral-800 mb-0.5">@{comment.User?.username || 'user'}</span>
                      <span className="block text-xs text-neutral-600 leading-normal">{comment.body}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                placeholder={user ? "Add your thoughts..." : "Sign in to add comment..."}
                disabled={!user}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 rounded-2xl border border-neutral-200 px-4 py-3 text-xs outline-none focus:border-primary/50 focus:bg-white transition-all bg-neutral-50"
              />
              <button
                type="submit"
                disabled={!user || !newComment.trim()}
                className="rounded-2xl bg-neutral-100 hover:bg-primary hover:text-white p-3 text-neutral-600 transition-colors disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
