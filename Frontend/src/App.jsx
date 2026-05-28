import React, { useState, useEffect } from 'react';
import {
  Search,
  Plus,
  Bell,
  User as UserIcon,
  LogOut,
  Settings as SettingsIcon,
  Heart,
  Bookmark,
  Share2,
  Upload,
  ArrowRight,
  Sparkles,
  HelpCircle,
  X,
  PlusCircle,
  CheckCircle,
  Inbox,
  Home,
  Compass,
  ArrowUpRight,
  User,
  Settings,
  LayoutGrid
} from 'lucide-react';
import { api } from './services/api';
import MasonryGrid from './components/MasonryGrid';
import PostDetailModal from './components/PostDetailModal';
import AuthModal from './components/AuthModal';
import './App.css';

export default function App() {
  // Session & User
  const [user, setUser] = useState(api.getUser());
  const [showAuthModal, setShowAuthModal] = useState(false);

  // View Routing
  const [currentView, setCurrentView] = useState('explore'); // Defaults to explore (guest-friendly)
  const [searchQuery, setSearchQuery] = useState('');
  
  // Data State
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [followedUserIds, setFollowedUserIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  // Profile Tab State
  const [profileTab, setProfileTab] = useState('created'); // 'created' or 'saved'
  const [profileUser, setProfileUser] = useState(null);

  // Upload Form State
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadPreview, setUploadPreview] = useState(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCaption, setUploadCaption] = useState('');
  const [uploadTagInput, setUploadTagInput] = useState('');
  const [uploadTags, setUploadTags] = useState([]);
  
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiCaptioning, setAiCaptioning] = useState(false);
  
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Support & Settings Form States
  const [settingsFullName, setSettingsFullName] = useState('');
  const [settingsBio, setSettingsBio] = useState('');
  const [settingsWebsite, setSettingsWebsite] = useState('');
  const [settingsLocation, setSettingsLocation] = useState('');
  const [settingsMessage, setSettingsMessage] = useState('');
  const [settingsAvatarPreview, setSettingsAvatarPreview] = useState(null);
  const [avatarUploading, setAvatarUploading] = useState(false);
  
  const [supportEmail, setSupportEmail] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSuccess, setSupportSuccess] = useState('');

  // Initial load
  useEffect(() => {
    if (user) {
      setCurrentView('feed');
    } else {
      setCurrentView('explore');
    }
  }, [user]);

  // Load feed/explore images
  const loadFeed = async (view = currentView) => {
    setLoading(true);
    try {
      const type = view === 'feed' ? 'followed' : 'explore';
      const data = await api.getFeed(type);
      const loaded = data.images || [];
      setImages(loaded);
      setFilteredImages(loaded);
    } catch (err) {
      console.error('Failed to load feed:', err);
    } finally {
      setLoading(false);
    }
  };

  // Search filter
  const handleSearchSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) {
      setFilteredImages(images);
      return;
    }
    setLoading(true);
    try {
      const data = await api.search(searchQuery.trim());
      setFilteredImages(data.images || []);
      if (currentView !== 'feed' && currentView !== 'explore') {
        setCurrentView('explore');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Click on a tag chip -> searches by tag
  const handleTagClick = async (tag) => {
    setSearchQuery(tag);
    setLoading(true);
    try {
      const data = await api.search(tag);
      setFilteredImages(data.images || []);
      if (currentView !== 'feed' && currentView !== 'explore') {
        setCurrentView('explore');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Toggle Like from Card/Grid
  const handleLikeToggle = async (imageId) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    try {
      const res = await api.likeImage(imageId);
      setImages(prev => prev.map(img => img.id === imageId ? {
        ...img,
        likeCount: res.liked ? img.likeCount + 1 : Math.max(0, img.likeCount - 1),
        isLiked: res.liked
      } : img));
      setFilteredImages(prev => prev.map(img => img.id === imageId ? {
        ...img,
        likeCount: res.liked ? img.likeCount + 1 : Math.max(0, img.likeCount - 1),
        isLiked: res.liked
      } : img));
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle Save from Card/Grid
  const handleSaveToggle = async (imageId) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    try {
      const res = await api.saveImage(imageId);
      setImages(prev => prev.map(img => img.id === imageId ? {
        ...img,
        saveCount: res.saved ? img.saveCount + 1 : Math.max(0, img.saveCount - 1),
        isSaved: res.saved
      } : img));
      setFilteredImages(prev => prev.map(img => img.id === imageId ? {
        ...img,
        saveCount: res.saved ? img.saveCount + 1 : Math.max(0, img.saveCount - 1),
        isSaved: res.saved
      } : img));
    } catch (err) {
      console.error(err);
    }
  };

  // Uploading an image file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file);
      setUploadPreview(URL.createObjectURL(file));
    }
  };

  // Adding visual tag pills in upload tags input
  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = uploadTagInput.trim().replace(/^#/, '');
      if (val && !uploadTags.includes(val)) {
        setUploadTags([...uploadTags, val]);
      }
      setUploadTagInput('');
    }
  };

  const removeUploadTag = (tagToRemove) => {
    setUploadTags(uploadTags.filter(tag => tag !== tagToRemove));
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!uploadFile) {
      setUploadMessage('Please select an image to upload.');
      return;
    }
    setUploadLoading(true);
    setUploadMessage('');
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      formData.append('image', uploadFile);
      formData.append('title', uploadTitle || 'Untitled Inspiration');
      formData.append('caption', uploadCaption);
      formData.append('tags', uploadTags.join(','));

      await api.uploadImage(formData);
      setUploadSuccess(true);
      setUploadMessage('Post successfully published to Nexa!');
      setUploadFile(null);
      setUploadPreview(null);
      setUploadTitle('');
      setUploadCaption('');
      setUploadTags([]);
      loadFeed();
      setTimeout(() => {
        setCurrentView('feed');
        setUploadSuccess(false);
        setUploadMessage('');
      }, 1500);
    } catch (err) {
      setUploadMessage(err.message || 'Failed to publish post.');
    } finally {
      setUploadLoading(false);
    }
  };

  // AI Image generation
  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setAiGenerating(true);
    setUploadMessage('');
    try {
      const res = await api.generateAIImage({
        prompt: aiPrompt,
        title: uploadTitle || 'AI Masterpiece',
        caption: uploadCaption,
        tags: uploadTags
      });
      loadFeed();
      setUploadSuccess(true);
      setUploadMessage('AI Image successfully generated and published!');
      setAiPrompt('');
      setTimeout(() => {
        setCurrentView('feed');
        setUploadSuccess(false);
        setUploadMessage('');
      }, 1500);
    } catch (err) {
      setUploadMessage(err.message || 'AI Generation failed.');
    } finally {
      setAiGenerating(false);
    }
  };

  // AI Caption generation helper
  const handleAICaption = async () => {
    setAiCaptioning(true);
    try {
      const res = await api.generateAICaption({
        prompt: aiPrompt || uploadTitle || 'Aesthetic composition',
        title: uploadTitle,
        tags: uploadTags
      });
      setUploadCaption(res.caption);
      if (!uploadTitle) setUploadTitle("Curated Vintage Aesthetic");
      if (uploadTags.length === 0) setUploadTags(["vintage", "curation", "editorial", "design"]);
    } catch (err) {
      console.error(err);
    } finally {
      setAiCaptioning(false);
    }
  };

  // Notifications Page Actions
  const loadNotifications = async () => {
    try {
      const data = await api.getNotifications();
      const notifs = data.notifications || [];
      setNotifications(notifs);
      
      const followed = notifs.filter(n => n.isFollowing).map(n => n.actorId);
      if (followed.length > 0) {
        setFollowedUserIds(prev => [...new Set([...prev, ...followed])]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllNotifications = async () => {
    try {
      await api.markAllNotificationsAsRead();
      loadNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkSingleNotification = async (id) => {
    try {
      await api.markNotificationAsRead(id);
      loadNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  // Profile View Tab Filtering
  const loadProfileData = async () => {
    if (!user) return;
    try {
      const profile = await api.getUserProfile(user.id);
      setProfileUser(profile);
      
      // Settings form fields preload
      setSettingsFullName(profile.fullName || '');
      setSettingsBio(profile.bio || '');
      setSettingsWebsite(profile.website || '');
      setSettingsLocation(profile.location || '');
      setSettingsAvatarPreview(profile.avatarUrl || null);

      // Load both feeds in parallel to merge and deduplicate so saved and created items from both feeds load correctly
      const [followedData, exploreData] = await Promise.all([
        api.getFeed('followed'),
        api.getFeed('explore')
      ]);

      const followedList = followedData.images || [];
      const exploreList = exploreData.images || [];

      const combinedMap = new Map();
      followedList.forEach(img => combinedMap.set(img.id, img));
      exploreList.forEach(img => combinedMap.set(img.id, img));

      const mergedList = Array.from(combinedMap.values());
      
      setImages(mergedList);
      setFilteredImages(mergedList);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (currentView === 'feed' || currentView === 'explore') {
      loadFeed(currentView);
    }
    if (currentView === 'notifications') {
      loadNotifications();
    }
    if (currentView === 'profile') {
      loadProfileData();
    }
  }, [currentView]);

  // Support Submission
  const handleSupportSubmit = (e) => {
    e.preventDefault();
    setSupportSuccess('Thank you! Your inquiry was submitted to our curation desk.');
    setSupportEmail('');
    setSupportMessage('');
    setTimeout(() => setSupportSuccess(''), 4000);
  };

  // Settings update
  const handleSettingsUpdate = async (e) => {
    e.preventDefault();
    setSettingsMessage('');
    try {
      await api.updateProfile({
        fullName: settingsFullName,
        bio: settingsBio,
        website: settingsWebsite,
        location: settingsLocation
      });
      setSettingsMessage('Settings successfully saved!');
      loadProfileData();
      setTimeout(() => setSettingsMessage(''), 3000);
    } catch (err) {
      setSettingsMessage(err.message || 'Failed to update profile.');
    }
  };

  const handleLogout = () => {
    api.clearSession();
    setUser(null);
    setCurrentView('explore');
  };

  const handleAuthSuccess = (authenticatedUser) => {
    setUser(authenticatedUser);
    setCurrentView('feed');
  };

  // Filtering user's profile images: Created vs Saved
  const profileImages = filteredImages.filter(img => {
    if (profileTab === 'created') {
      return img.userId === user?.id;
    } else {
      return img.isSaved || img.isLiked;
    }
  });

  return (
    <div className="min-h-screen bg-background flex flex-col antialiased font-sans pb-24">
      
      {/* Universal Top Header */}
      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-outline-variant w-full px-4 md:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <span
          onClick={() => { setCurrentView(user ? 'feed' : 'explore'); setSearchQuery(''); setFilteredImages(images); }}
          className="text-2xl font-serif font-black text-[#E0D9D9] cursor-pointer flex-shrink-0"
        >
          Nexa
        </span>

        {/* Center: Search Bar */}
        {user ? (
          <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-lg mx-2 md:mx-6">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search aesthetics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container rounded-full py-2.5 pl-10 pr-4 text-xs font-semibold outline-none border border-outline-variant focus:border-neutral-400 focus:ring-1 focus:ring-secondary-container transition-all text-neutral-800 shadow-sm"
            />
          </form>
        ) : (
          <div className="flex-1"></div>
        )}

        {/* Right: Notifications & Profile */}
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          {user ? (
            <>
              <button
                onClick={() => setCurrentView('notifications')}
                className="relative p-2 rounded-full hover:bg-surface-container-low text-neutral-400 transition-colors cursor-pointer"
              >
                <Bell className="h-5 w-5" />
                {notifications.some(n => !n.readAt) && (
                  <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full ring-2 ring-[#120E0E] animate-pulse"></span>
                )}
              </button>

              <button
                onClick={() => setCurrentView('profile')}
                className="flex items-center gap-2 rounded-full border border-outline-variant bg-surface hover:bg-surface-container-low px-2.5 py-1.5 transition-colors cursor-pointer"
              >
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-[10px] font-serif uppercase">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:inline text-xs font-bold text-[#E0D9D9] pr-1">@{user.username}</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-primary text-[#120E0E] rounded-full px-5 py-2 text-xs font-bold shadow-sm transition-all hover:opacity-90"
            >
              Connect
            </button>
          )}
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 md:px-8 md:py-8 flex flex-col gap-6 bg-background">
        
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        )}

        {!loading && (
          <>
            {/* VIEW: Feed / Explore Board */}
            {(currentView === 'feed' || currentView === 'explore') && (
              <div className="space-y-6">
                
                {/* Header (Dynamic Luxury Curation Headline) */}


                {/* Explore categories pills layout (matches legacy Explore chip filters exactly!) */}
                {currentView === 'explore' && (
                  <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1.5 border-b border-outline-variant/30">
                    {['All', 'Cricket', 'Travel', 'Food', 'Bollywood', 'Wildlife', 'Festival', 'Coding', 'Marvel', 'Pets', 'Nature', 'Art', 'Architecture'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => {
                          if (cat === 'All') {
                            setSearchQuery('');
                            setFilteredImages(images);
                          } else {
                            handleTagClick(cat.toLowerCase());
                          }
                        }}
                        className={`px-5 py-2.5 rounded-full whitespace-nowrap text-xs font-bold transition-all ${
                          (cat === 'All' && !searchQuery) || searchQuery.toLowerCase() === cat.toLowerCase()
                            ? 'bg-primary text-white shadow-sm'
                            : 'bg-surface border border-outline-variant hover:bg-neutral-50 text-neutral-600'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}

                {/* Grid layout */}
                <MasonryGrid
                  images={filteredImages}
                  user={user}
                  showLikeCounter={currentView === 'feed'}
                  onPostClick={(id) => setSelectedPostId(id)}
                  onTagClick={handleTagClick}
                  onLikeToggle={handleLikeToggle}
                  onSaveToggle={handleSaveToggle}
                  onShareToggle={(id) => setSelectedPostId(id)}
                  onAuthPrompt={() => setShowAuthModal(true)}
                />
              </div>
            )}

            {/* VIEW: Notifications */}
            {currentView === 'notifications' && (() => {
              // Helper: Format Time Ago
              const formatTimeAgo = (dateString) => {
                const date = new Date(dateString);
                const now = new Date();
                const seconds = Math.floor((now - date) / 1000);
                if (seconds < 60) return 'Just now';
                const minutes = Math.floor(seconds / 60);
                if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
                const hours = Math.floor(minutes / 60);
                if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
                const days = Math.floor(hours / 24);
                if (days < 7) {
                  if (days === 1) return 'Yesterday';
                  return `${days} day${days > 1 ? 's' : ''} ago`;
                }
                return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
              };

              // Helper: Group notifications
              const getGroupedNotifications = () => {
                const unread = [];
                const today = [];
                const thisWeek = [];
                const earlier = [];

                const now = new Date();
                const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
                const oneWeekAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;

                notifications.forEach(notif => {
                  const createdTime = new Date(notif.createdAt).getTime();
                  if (!notif.readAt) {
                    unread.push(notif);
                  } else if (createdTime >= startOfToday) {
                    today.push(notif);
                  } else if (createdTime >= oneWeekAgo) {
                    thisWeek.push(notif);
                  } else {
                    earlier.push(notif);
                  }
                });

                return { unread, today, thisWeek, earlier };
              };

              // Helper: Parse message format
              const parseNotificationMessage = (notif) => {
                const msg = notif.message || '';
                const actorName = notif.actorFullName || (notif.actorUsername ? `@${notif.actorUsername}` : 'Someone');

                if (msg.startsWith('commented: "')) {
                  const commentText = msg.replace('commented: "', '').slice(0, -1);
                  return {
                    actorName,
                    actionText: 'commented: ',
                    highlightText: `“${commentText}”`,
                    quoteText: null,
                    isComment: true
                  };
                }

                if (msg.startsWith('commented: ')) {
                  const commentText = msg.replace('commented: ', '');
                  return {
                    actorName,
                    actionText: 'commented: ',
                    highlightText: commentText.startsWith('"') ? commentText : `“${commentText}”`,
                    quoteText: null,
                    isComment: true
                  };
                }

                if (msg.startsWith('liked your "')) {
                  const title = msg.replace('liked your "', '').replace('" post.', '').replace('"', '');
                  return {
                    actorName,
                    actionText: 'liked your post ',
                    highlightText: `“${title}”`,
                    quoteText: null,
                    isLike: true
                  };
                }

                // If it's a mention or contains a quotation to blockquote
                if (msg.toLowerCase().includes('mentioned you')) {
                  const quoteIndex = msg.indexOf('"');
                  if (quoteIndex !== -1) {
                    const commentText = msg.substring(quoteIndex + 1, msg.lastIndexOf('"'));
                    return {
                      actorName,
                      actionText: 'mentioned you in a comment.',
                      highlightText: null,
                      quoteText: `“${commentText}”`,
                      isMention: true
                    };
                  }
                }

                return {
                  actorName,
                  actionText: msg,
                  highlightText: null,
                  quoteText: null
                };
              };

              const handleFollowBack = async (actorId, e) => {
                e.stopPropagation();
                try {
                  const res = await api.toggleFollowUser(actorId);
                  if (res.following) {
                    setFollowedUserIds(prev => [...prev, actorId]);
                  } else {
                    setFollowedUserIds(prev => prev.filter(id => id !== actorId));
                  }
                } catch (err) {
                  console.error('Failed to toggle follow:', err);
                }
              };

              const { unread, today, thisWeek, earlier } = getGroupedNotifications();

              const renderNotificationCard = (notif) => {
                const parsed = parseNotificationMessage(notif);
                const isFollowing = followedUserIds.includes(notif.actorId);

                return (
                  <div key={notif.id} className="flex items-center gap-3 w-full group">
                    {/* Unread indicator dot */}
                    <div className="w-2 flex justify-center flex-shrink-0">
                      {!notif.readAt && (
                        <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                      )}
                    </div>

                    {/* Notification Card */}
                    <div
                      onClick={() => {
                        if (notif.imageId) setSelectedPostId(notif.imageId);
                        if (!notif.readAt) handleMarkSingleNotification(notif.id);
                      }}
                      className={`flex-1 p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        !notif.readAt
                          ? 'bg-surface border-outline-variant/60 shadow-sm hover:border-neutral-300'
                          : 'bg-surface-container-low/60 border-transparent hover:bg-surface-container-low'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        {notif.actorAvatarUrl ? (
                          <img
                            src={notif.actorAvatarUrl}
                            alt={parsed.actorName}
                            className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm font-serif uppercase flex-shrink-0">
                            {parsed.actorName.replace(/^@/, '').charAt(0).toUpperCase()}
                          </div>
                        )}

                        {/* Text Content */}
                        <div className="text-xs">
                          <span className="leading-normal">
                            <span className="font-bold text-neutral-900 mr-1.5">{parsed.actorName}</span>
                            <span className="text-neutral-600">{parsed.actionText}</span>
                            {parsed.highlightText && (
                              <span className={parsed.isComment ? "text-primary font-medium" : "italic text-neutral-800"}>
                                {parsed.highlightText}
                              </span>
                            )}
                          </span>

                          {/* Blockquote quoteText (Mentions/Comments quote) */}
                          {parsed.quoteText && (
                            <blockquote className="mt-2.5 pl-3 border-l-2 border-neutral-300 text-xs italic text-neutral-500 leading-relaxed font-medium">
                              {parsed.quoteText}
                            </blockquote>
                          )}

                          <span className="block mt-1 text-[11px] text-neutral-400 font-medium">{formatTimeAgo(notif.createdAt)}</span>
                        </div>
                      </div>

                      {/* Right actions: follow back button or image thumbnail */}
                      <div className="flex-shrink-0">
                        {notif.type === 'follow' && notif.actorId && (
                          <button
                            onClick={(e) => handleFollowBack(notif.actorId, e)}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                              isFollowing
                                ? 'border border-neutral-300 bg-surface hover:bg-neutral-50 text-neutral-500'
                                : 'bg-primary hover:bg-primary-container text-white shadow-sm'
                            }`}
                          >
                            {isFollowing ? 'Following' : 'Follow Back'}
                          </button>
                        )}

                        {notif.imageUrl && (
                          <div className="h-14 w-14 rounded-lg overflow-hidden border border-neutral-100 shadow-sm flex-shrink-0">
                            <img src={notif.imageUrl} alt={notif.imageTitle} className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              };

              return (
                <div className="max-w-3xl mx-auto space-y-8 w-full pb-10">
                  {/* Top Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant/30 pb-6">
                    <div>
                      <h1 className="font-serif text-4xl font-bold text-neutral-900 tracking-tight leading-tight">Notifications</h1>
                      <p className="font-sans text-neutral-500 font-medium text-xs mt-1">Stay connected with your creative circle.</p>
                    </div>

                    {notifications.some(n => !n.readAt) && (
                      <button
                        onClick={handleMarkAllNotifications}
                        className="flex items-center rounded-lg border border-outline-variant bg-surface hover:bg-neutral-50 px-4 py-2 text-xs font-bold text-neutral-800 transition-colors shadow-sm cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5 mr-1.5 text-neutral-700" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5M8.25 18l6-6 4.5 4.5" />
                        </svg>
                        Mark all as read
                      </button>
                    )}
                  </div>

                  {/* Notification List Container */}
                  <div className="space-y-8">
                    {notifications.length === 0 ? (
                      <div className="text-center py-20 bg-surface rounded-2xl border border-outline-variant p-8 flex flex-col items-center shadow-sm">
                        <Inbox className="h-12 w-12 text-neutral-300 mb-3" />
                        <p className="text-xs font-bold text-neutral-400 tracking-wider uppercase">Your inbox is clear</p>
                      </div>
                    ) : (
                      <>
                        {/* 1. NEW SECTION */}
                        {unread.length > 0 && (
                          <div className="space-y-4">
                            <h2 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-5">New</h2>
                            <div className="space-y-3">
                              {unread.map(renderNotificationCard)}
                            </div>
                          </div>
                        )}

                        {/* 2. EARLIER TODAY SECTION */}
                        {today.length > 0 && (
                          <div className="space-y-4">
                            <h2 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-5">Earlier Today</h2>
                            <div className="space-y-3">
                              {today.map(renderNotificationCard)}
                            </div>
                          </div>
                        )}

                        {/* 3. THIS WEEK SECTION */}
                        {thisWeek.length > 0 && (
                          <div className="space-y-4">
                            <h2 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-5">This Week</h2>
                            <div className="space-y-3">
                              {thisWeek.map(renderNotificationCard)}
                            </div>
                          </div>
                        )}

                        {/* 4. EARLIER SECTION */}
                        {earlier.length > 0 && (
                          <div className="space-y-4">
                            <h2 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-5">Earlier</h2>
                            <div className="space-y-3">
                              {earlier.map(renderNotificationCard)}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* VIEW: Profile */}
            {currentView === 'profile' && profileUser && (() => {
              // Helper to format stat number (e.g. 2400 -> 2.4k)
              const formatStatNumber = (num) => {
                if (num === undefined || num === null) return '0';
                if (num >= 1000) {
                  return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
                }
                return num.toLocaleString();
              };

              // Mockup biography fallback
              const bioText = profileUser.bio || "Visual Storyteller & Editorial Designer. Exploring the intersection of minimalist architecture and natural light. Curating moments of quiet beauty for the modern creative.";
              
              // Mockup website fallback
              const websiteUrl = profileUser.website || "vance-studios.com/curation";
              const displayWebsite = websiteUrl.replace(/^(https?:\/\/)?(www\.)?/, "");

              return (
                <div className="space-y-8 w-full pb-10">
                  
                  {/* Luxury Profile Header matching Mockup exactly */}
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16 w-full max-w-4xl mx-auto py-6 px-4">
                    
                    {/* Left Column: Circular framed avatar */}
                    <div className="flex-shrink-0">
                      <div className="border-[3.5px] border-[#d5c3b1] p-1.5 rounded-full shadow-sm hover:scale-[1.01] transition-transform duration-300">
                        {profileUser.avatarUrl ? (
                          <img
                            src={profileUser.avatarUrl}
                            alt={profileUser.fullName}
                            className="h-36 w-36 md:h-40 md:w-40 rounded-full object-cover shadow-inner"
                          />
                        ) : (
                          <div className="h-36 w-36 md:h-40 md:w-40 rounded-full bg-gradient-to-tr from-[#30578f]/10 to-[#30578f]/5 flex items-center justify-center font-serif text-[#30578f] font-bold text-5xl uppercase shadow-inner">
                            {profileUser.fullName ? profileUser.fullName.charAt(0).toUpperCase() : (profileUser.username ? profileUser.username.charAt(0).toUpperCase() : 'U')}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Column: User details, Stats, Bio & Website */}
                    <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
                      
                      {/* Name & Edit Profile button styled in Stitch Blue */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-4">
                        <div>
                          <h1 className="font-serif text-3.5xl font-black text-neutral-900 leading-tight">
                            {profileUser.fullName}
                          </h1>
                          <span className="text-[13px] font-bold text-primary tracking-wide block mt-0.5">
                            @{profileUser.username}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 self-center sm:self-auto mt-2 sm:mt-0">
                          <button
                            onClick={() => setCurrentView('support')}
                            title="Support"
                            className="bg-surface border border-outline-variant text-[#E0D9D9] hover:bg-surface-container-low rounded-xl px-3 py-2.5 transition-all duration-150 shadow-sm flex items-center justify-center cursor-pointer"
                          >
                            <HelpCircle className="w-4 h-4" />
                          </button>
                          
                          <button
                            onClick={handleLogout}
                            title="Sign Out"
                            className="bg-surface border border-outline-variant text-[#E0D9D9] hover:bg-red-900/30 hover:text-red-400 hover:border-red-900/50 rounded-xl px-3 py-2.5 transition-all duration-150 shadow-sm flex items-center justify-center cursor-pointer"
                          >
                            <LogOut className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setCurrentView('settings')}
                            className="bg-primary text-[#120E0E] rounded-xl px-5 py-2.5 text-[11px] font-bold tracking-wider uppercase transition-all duration-150 active:scale-[0.98] shadow-sm flex items-center gap-1.5 hover:opacity-90 cursor-pointer"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                            </svg>
                            Edit
                          </button>
                        </div>
                      </div>

                      {/* Horizontal stats line */}
                      <div className="flex gap-8 my-5 text-[13.5px] text-neutral-500 font-sans tracking-wide">
                        <span>
                          <strong className="text-neutral-900 font-extrabold text-[15px] mr-1">{formatStatNumber(profileUser.postsCount)}</strong> Posts
                        </span>
                        <span>
                          <strong className="text-neutral-900 font-extrabold text-[15px] mr-1">{formatStatNumber(profileUser.followersCount)}</strong> Followers
                        </span>
                        <span>
                          <strong className="text-neutral-900 font-extrabold text-[15px] mr-1">{formatStatNumber(profileUser.followingCount)}</strong> Following
                        </span>
                      </div>

                      {/* Biography paragraph with fallback */}
                      <p className="text-neutral-600 text-[13.5px] leading-relaxed max-w-xl font-sans text-center md:text-left">
                        {bioText}
                      </p>

                      {/* Website link with link icon */}
                      <div className="flex items-center gap-1.5 mt-4 text-[13px] font-bold text-primary hover:underline cursor-pointer">
                        <svg className="h-3.5 w-3.5 text-primary" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                        </svg>
                        <a href={websiteUrl.startsWith("http") ? websiteUrl : `https://${websiteUrl}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          {displayWebsite}
                        </a>
                      </div>

                    </div>
                  </div>

                  {/* Horizontal Divider Line */}
                  <div className="w-full border-t border-outline-variant/30 my-8 max-w-4xl mx-auto"></div>

                  {/* Center Aligned Tabs Selection with icons (Posts and Saved only!) */}
                  <div className="flex justify-center border-t border-outline-variant/30 max-w-4xl mx-auto -mt-8 mb-8">
                    <div className="flex gap-12">
                      <button
                        onClick={() => setProfileTab('created')}
                        className={`pt-4 px-6 flex items-center text-xs font-bold uppercase tracking-widest border-t-2 transition-all duration-200 cursor-pointer ${
                          profileTab === 'created'
                            ? 'border-primary text-primary font-black scale-105'
                            : 'border-transparent text-neutral-400 hover:text-neutral-700'
                        }`}
                      >
                        <LayoutGrid className="w-4 h-4 mr-2" strokeWidth={2.5} />
                        Posts
                      </button>
                      
                      <button
                        onClick={() => setProfileTab('saved')}
                        className={`pt-4 px-6 flex items-center text-xs font-bold uppercase tracking-widest border-t-2 transition-all duration-200 cursor-pointer ${
                          profileTab === 'saved'
                            ? 'border-primary text-primary font-black scale-105'
                            : 'border-transparent text-neutral-400 hover:text-neutral-700'
                        }`}
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.157 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>
                        Saved
                      </button>
                    </div>
                  </div>

                  {/* Profile Grid */}
                  <MasonryGrid
                    images={profileImages}
                    user={user}
                    onPostClick={(id) => setSelectedPostId(id)}
                    onTagClick={handleTagClick}
                    onLikeToggle={handleLikeToggle}
                    onSaveToggle={handleSaveToggle}
                    onShareToggle={(id) => setSelectedPostId(id)}
                    onAuthPrompt={() => setShowAuthModal(true)}
                  />

                  {/* View More Curation centered down chevron button */}
                  {profileImages.length > 0 && (
                    <div className="flex flex-col items-center justify-center py-12 gap-2 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer w-full mt-6 border-t border-outline-variant/10">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">View more curation</span>
                      <svg className="w-4 h-4 animate-bounce mt-1 text-neutral-500" fill="none" stroke="currentColor" strokeWidth="3.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                  )}

                </div>
              );
            })()}

            {/* VIEW: Create Post */}
            {currentView === 'create' && (
              <div className="max-w-3xl mx-auto space-y-6 w-full">
                <h1 className="font-serif text-3xl font-black text-neutral-900 border-b border-outline-variant pb-4 tracking-tight">
                  Share Your Vision
                </h1>

                {uploadMessage && (
                  <div className={`p-4 rounded-xl text-xs font-bold border ${
                    uploadSuccess
                      ? 'bg-green-50 text-green-600 border-green-100'
                      : 'bg-red-50 text-red-600 border-red-100'
                  }`}>
                    {uploadMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface p-6 md:p-8 rounded-2xl border border-outline-variant shadow-sm">
                  {/* File selector or AI generator preview */}
                  <div className="space-y-4">
                    <label className="block text-xs font-bold text-neutral-600 uppercase tracking-widest">Visual Asset</label>
                    
                    {uploadPreview ? (
                      <div className="relative rounded-xl overflow-hidden border border-neutral-200 aspect-[4/5] bg-neutral-50">
                        <img src={uploadPreview} alt="Upload Preview" className="w-full h-full object-cover" />
                        <button
                          onClick={() => { setUploadFile(null); setUploadPreview(null); }}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-black text-white"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-neutral-200 hover:border-primary/40 rounded-xl py-12 px-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:bg-neutral-50 aspect-[4/5]">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="file-select-input"
                        />
                        <label htmlFor="file-select-input" className="cursor-pointer flex flex-col items-center justify-center">
                          <Upload className="h-10 w-10 text-neutral-300 mb-3 hover:text-primary transition-colors" />
                          <span className="block text-xs font-bold text-neutral-800">Browse device image files</span>
                          <span className="block text-[10px] text-neutral-400 mt-1 font-semibold">Supports PNG, JPG, WEBP, GIF</span>
                        </label>
                      </div>
                    )}
                  </div>

                  {/* Form information */}
                  <form onSubmit={handleUploadSubmit} className="space-y-5 flex flex-col">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="block text-xs font-bold text-neutral-600 uppercase tracking-widest">Title</label>
                          <button
                            type="button"
                            onClick={handleAICaption}
                            disabled={aiCaptioning}
                            className="text-[10px] font-bold text-primary hover:opacity-80 flex items-center gap-1"
                          >
                            <Sparkles className="h-3 w-3" />
                            {aiCaptioning ? 'Writing...' : 'Write with AI'}
                          </button>
                        </div>
                        <input
                          type="text"
                          required
                          placeholder="Give your creation a descriptive title"
                          value={uploadTitle}
                          onChange={(e) => setUploadTitle(e.target.value)}
                          className="w-full rounded-xl border border-outline-variant bg-neutral-50 px-4 py-3 text-xs outline-none focus:border-primary/50 focus:bg-surface transition-all font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-600 uppercase tracking-widest mb-1.5">Caption</label>
                        <textarea
                          placeholder="Tell a short story about this compositions..."
                          value={uploadCaption}
                          onChange={(e) => setUploadCaption(e.target.value)}
                          rows={3}
                          className="w-full rounded-xl border border-outline-variant bg-neutral-50 px-4 py-3 text-xs outline-none focus:border-primary/50 focus:bg-surface transition-all leading-normal"
                        />
                      </div>

                      {/* Tag Chip input pills */}
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="block text-xs font-bold text-neutral-600 uppercase tracking-widest">Tags</label>
                          <button
                            type="button"
                            onClick={handleAICaption}
                            disabled={aiCaptioning}
                            className="text-[10px] font-bold text-primary hover:opacity-80 flex items-center gap-1"
                          >
                            <Sparkles className="h-3 w-3" />
                            {aiCaptioning ? 'Generating...' : 'Write with AI'}
                          </button>
                        </div>
                        
                        {uploadTags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-2.5">
                            {uploadTags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary px-2.5 py-1 text-[10px] font-bold"
                              >
                                #{tag}
                                <button
                                  type="button"
                                  onClick={() => removeUploadTag(tag)}
                                  className="hover:bg-primary/20 rounded-full p-0.5"
                                >
                                  <X className="h-2.5 w-2.5" />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Type tag and press Enter or click Add..."
                            value={uploadTagInput}
                            onChange={(e) => setUploadTagInput(e.target.value)}
                            onKeyDown={handleTagInputKeyDown}
                            className="flex-1 rounded-xl border border-outline-variant bg-neutral-50 px-4 py-3 text-xs outline-none focus:border-primary/50 focus:bg-surface transition-all font-semibold"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const val = uploadTagInput.trim().replace(/^#/, '');
                              if (val && !uploadTags.includes(val)) {
                                setUploadTags([...uploadTags, val]);
                              }
                              setUploadTagInput('');
                            }}
                            className="bg-primary hover:bg-primary/90 text-[#120E0E] px-5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-[0.98] cursor-pointer"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-outline-variant/30 mt-2">
                      <button
                        type="submit"
                        disabled={uploadLoading}
                        className="w-full bg-primary hover:bg-primary/90 rounded-xl py-4 text-xs font-bold text-[#120E0E] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                      >
                        {uploadLoading ? 'Publishing...' : 'Publish'}
                      </button>
                    </div>
                  </form>
                </div>

                {/* AI studio builder */}
                <div className="bg-gradient-to-r from-neutral-800 to-neutral-900 text-white rounded-2xl p-6 md:p-8 space-y-4 shadow-xl">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-amber-400" />
                    <h3 className="font-serif text-xl font-bold tracking-tight text-white">AI Studio Generator</h3>
                  </div>
                  <p className="text-neutral-400 text-xs leading-relaxed max-w-xl">
                    Don't have an image ready? Type a textual concept prompt below and our generative models will compile an aesthetic masterpiece.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. minimalist brutalist concrete architecture overlooking desert dunes at dusk..."
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      className="flex-1 bg-surface/10 rounded-xl px-4 py-3 text-xs outline-none border border-transparent focus:bg-surface/15 focus:border-white/20 text-white placeholder:text-neutral-500 font-semibold"
                    />
                    <button
                      type="button"
                      onClick={handleAIGenerate}
                      disabled={aiGenerating || !aiPrompt.trim()}
                      className="bg-surface hover:bg-neutral-100 text-neutral-900 rounded-xl px-5 py-3 text-xs font-bold active:scale-[0.98] transition-all flex items-center gap-1.5 shadow-md disabled:opacity-50"
                    >
                      {aiGenerating ? 'Generating...' : 'Generate & Publish'}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* VIEW: Settings */}
            {currentView === 'settings' && (
              <div className="max-w-2xl mx-auto space-y-6 w-full">
                <h1 className="font-serif text-3xl font-black text-neutral-900 border-b border-outline-variant pb-4 tracking-tight">
                  Account Settings
                </h1>

                {settingsMessage && (
                  <div className="p-4 rounded-xl bg-neutral-100 border border-outline-variant text-xs font-bold text-neutral-700">
                    {settingsMessage}
                  </div>
                )}

                <form onSubmit={handleSettingsUpdate} className="bg-surface rounded-2xl border border-outline-variant p-6 md:p-8 space-y-4 shadow-sm">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="relative h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xl font-serif uppercase flex-shrink-0 overflow-hidden border border-outline-variant group">
                      {settingsAvatarPreview ? (
                        <img src={settingsAvatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        user?.username?.charAt(1).toUpperCase() || 'U'
                      )}
                      
                      <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <Upload className="h-5 w-5 text-white" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setSettingsAvatarPreview(URL.createObjectURL(file));
                              const formData = new FormData();
                              formData.append('image', file);
                              setAvatarUploading(true);
                              try {
                                await api.uploadAvatar(formData);
                                setSettingsMessage("Avatar updated successfully!");
                                loadProfileData();
                              } catch (err) {
                                setSettingsMessage(err.message || "Failed to upload avatar");
                              } finally {
                                setAvatarUploading(false);
                              }
                            }
                          }}
                        />
                      </label>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-neutral-800">Profile Picture</h3>
                      <p className="text-xs text-neutral-500 font-medium mt-0.5">
                        {avatarUploading ? "Uploading..." : "Click the avatar to upload a new image. JPEG, PNG."}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-600 uppercase tracking-widest mb-1.5">Full Name</label>
                    <input
                      type="text"
                      placeholder="Elena Thorne"
                      value={settingsFullName}
                      onChange={(e) => setSettingsFullName(e.target.value)}
                      className="w-full rounded-xl border border-outline-variant bg-neutral-50 px-4 py-3 text-xs outline-none focus:border-primary/50 focus:bg-surface transition-all font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-600 uppercase tracking-widest mb-1.5">Biography</label>
                    <textarea
                      placeholder="Tell the community about your curator philosophy..."
                      value={settingsBio}
                      onChange={(e) => setSettingsBio(e.target.value)}
                      rows={3}
                      className="w-full rounded-xl border border-outline-variant bg-neutral-50 px-4 py-3 text-xs outline-none focus:border-primary/50 focus:bg-surface transition-all leading-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-600 uppercase tracking-widest mb-1.5">Website</label>
                    <input
                      type="text"
                      placeholder="https://example.com"
                      value={settingsWebsite}
                      onChange={(e) => setSettingsWebsite(e.target.value)}
                      className="w-full rounded-xl border border-outline-variant bg-neutral-50 px-4 py-3 text-xs outline-none focus:border-primary/50 focus:bg-surface transition-all font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-600 uppercase tracking-widest mb-1.5">Location</label>
                    <input
                      type="text"
                      placeholder="Paris, France"
                      value={settingsLocation}
                      onChange={(e) => setSettingsLocation(e.target.value)}
                      className="w-full rounded-xl border border-outline-variant bg-neutral-50 px-4 py-3 text-xs outline-none focus:border-primary/50 focus:bg-surface transition-all font-semibold"
                    />
                  </div>

                  <button
                    type="submit"
                    style={{ backgroundColor: '#30578f', color: '#ffffff' }}
                    className="w-full rounded-xl py-3.5 text-xs font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {/* VIEW: Support */}
            {currentView === 'support' && (
              <div className="max-w-2xl mx-auto space-y-6 w-full">
                <h1 className="font-serif text-3xl font-black text-neutral-900 border-b border-outline-variant pb-4 tracking-tight">
                  Nexa Support Desk
                </h1>

                {supportSuccess && (
                  <div className="p-4 rounded-xl bg-green-50 border border-green-100 text-xs font-bold text-green-600">
                    {supportSuccess}
                  </div>
                )}

                <div className="bg-surface rounded-2xl border border-outline-variant p-6 md:p-8 space-y-6 shadow-sm">
                  <div className="flex gap-4 items-start">
                    <HelpCircle className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-serif text-xl font-bold text-neutral-800">How can we assist you?</h3>
                      <p className="text-neutral-500 text-xs leading-relaxed mt-1 font-medium">
                        Need assistance with your image uploads, S3 cloud connection configuration, or database seeding issues? Write our specialists.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSupportSubmit} className="space-y-4 border-t border-outline-variant/30 pt-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-600 uppercase tracking-widest mb-1.5">Contact Email</label>
                      <input
                        type="email"
                        required
                        placeholder="you@domain.com"
                        value={supportEmail}
                        onChange={(e) => setSupportEmail(e.target.value)}
                        className="w-full rounded-xl border border-outline-variant bg-neutral-50 px-4 py-3 text-xs outline-none focus:border-primary/50 focus:bg-surface transition-all font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-600 uppercase tracking-widest mb-1.5">Message Inquiry</label>
                      <textarea
                        required
                        placeholder="Detail your operational error or technical question here..."
                        value={supportMessage}
                        onChange={(e) => setSupportMessage(e.target.value)}
                        rows={4}
                        className="w-full rounded-xl border border-outline-variant bg-neutral-50 px-4 py-3 text-xs outline-none focus:border-primary/50 focus:bg-surface transition-all leading-normal"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-xl bg-neutral-900 py-3.5 text-xs font-bold text-white shadow-sm hover:bg-neutral-800 active:scale-[0.98] transition-all"
                    >
                      Submit Inquiry
                    </button>
                  </form>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Mobile bottom navigation bar matching legacy style */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface border-t border-outline-variant flex justify-around py-3.5 z-40 shadow-lg">
        <button
          onClick={() => { setCurrentView(user ? 'feed' : 'explore'); setSearchQuery(''); setFilteredImages(images); }}
          className={`flex flex-col items-center gap-1 ${
            currentView === 'feed' || (currentView === 'explore' && !user) ? 'text-primary' : 'text-neutral-500'
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-[9px] font-bold uppercase tracking-tight">Home</span>
        </button>

        <button
          onClick={() => { setCurrentView('explore'); setSearchQuery(''); setFilteredImages(images); }}
          className={`flex flex-col items-center gap-1 ${currentView === 'explore' && user ? 'text-primary' : 'text-neutral-500'}`}
        >
          <Compass className="h-5 w-5" />
          <span className="text-[9px] font-bold uppercase tracking-tight">Explore</span>
        </button>

        {user && (
          <>
            <button
              onClick={() => setCurrentView('create')}
              className={`flex flex-col items-center gap-1 ${currentView === 'create' ? 'text-primary' : 'text-neutral-500'}`}
            >
              <Plus className="h-5 w-5" />
              <span className="text-[9px] font-bold uppercase tracking-tight">Create</span>
            </button>
            
            <button
              onClick={() => setCurrentView('profile')}
              className={`flex flex-col items-center gap-1 ${currentView === 'profile' ? 'text-primary' : 'text-neutral-500'}`}
            >
              <UserIcon className="h-5 w-5" />
              <span className="text-[9px] font-bold uppercase tracking-tight">Profile</span>
            </button>
          </>
        )}
      </nav>

      {/* Post Modal popup */}
      <PostDetailModal
        isOpen={!!selectedPostId}
        imageId={selectedPostId}
        user={user}
        onClose={() => setSelectedPostId(null)}
        onAuthPrompt={() => setShowAuthModal(true)}
        onTagClick={handleTagClick}
        onLikeToggle={(id, isLiked) => {
          setImages(prev => prev.map(img => img.id === id ? {
            ...img,
            likeCount: isLiked ? img.likeCount + 1 : Math.max(0, img.likeCount - 1),
            isLiked
          } : img));
          setFilteredImages(prev => prev.map(img => img.id === id ? {
            ...img,
            likeCount: isLiked ? img.likeCount + 1 : Math.max(0, img.likeCount - 1),
            isLiked
          } : img));
        }}
        onSaveToggle={(id, isSaved) => {
          setImages(prev => prev.map(img => img.id === id ? {
            ...img,
            saveCount: isSaved ? img.saveCount + 1 : Math.max(0, img.saveCount - 1),
            isSaved
          } : img));
          setFilteredImages(prev => prev.map(img => img.id === id ? {
            ...img,
            saveCount: isSaved ? img.saveCount + 1 : Math.max(0, img.saveCount - 1),
            isSaved
          } : img));
        }}
        onDeleteToggle={(id) => {
          setImages(prev => prev.filter(img => img.id !== id));
          setFilteredImages(prev => prev.filter(img => img.id !== id));
        }}
      />

      {/* Guest authorization modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Universal Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 w-full bg-surface border-t border-outline-variant z-50 flex items-center justify-around py-3 px-2 sm:px-6 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <button
          onClick={() => { setCurrentView(user ? 'feed' : 'explore'); setSearchQuery(''); setFilteredImages(images); }}
          className={`flex flex-col items-center gap-1.5 w-16 ${(currentView === 'feed' || (!user && currentView === 'explore')) ? 'text-primary' : 'text-neutral-500 hover:text-neutral-300'}`}
        >
          <Home className="h-5 w-5" />
          <span className="text-[10px] font-bold">Home</span>
        </button>

        <button
          onClick={() => { setCurrentView('explore'); setSearchQuery(''); setFilteredImages(images); }}
          className={`flex flex-col items-center gap-1.5 w-16 ${(currentView === 'explore' && user) ? 'text-primary' : 'text-neutral-500 hover:text-neutral-300'}`}
        >
          <Compass className="h-5 w-5" />
          <span className="text-[10px] font-bold">Explore</span>
        </button>

        <button
          onClick={() => { user ? setCurrentView('create') : setShowAuthModal(true); }}
          className={`flex flex-col items-center gap-1.5 w-16 ${currentView === 'create' ? 'text-primary' : 'text-neutral-500 hover:text-neutral-300'}`}
        >
          <Plus className="h-5 w-5" />
          <span className="text-[10px] font-bold">Create</span>
        </button>

        <button
          onClick={() => { user ? setCurrentView('settings') : setShowAuthModal(true); }}
          className={`flex flex-col items-center gap-1.5 w-16 ${currentView === 'settings' ? 'text-primary' : 'text-neutral-500 hover:text-neutral-300'}`}
        >
          <Settings className="h-5 w-5" />
          <span className="text-[10px] font-bold">Settings</span>
        </button>
      </nav>
    </div>
  );
}
