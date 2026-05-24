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
  Settings
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
    loadFeed();
  }, [user]);

  // Load feed/explore images
  const loadFeed = async () => {
    setLoading(true);
    try {
      const data = await api.getFeed();
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
      setCurrentView(user ? 'feed' : 'explore');
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
        likeCount: res.isLiked ? img.likeCount + 1 : Math.max(0, img.likeCount - 1),
        isLiked: res.isLiked
      } : img));
      setFilteredImages(prev => prev.map(img => img.id === imageId ? {
        ...img,
        likeCount: res.isLiked ? img.likeCount + 1 : Math.max(0, img.likeCount - 1),
        isLiked: res.isLiked
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
        saveCount: res.isSaved ? img.saveCount + 1 : Math.max(0, img.saveCount - 1),
        isSaved: res.isSaved
      } : img));
      setFilteredImages(prev => prev.map(img => img.id === imageId ? {
        ...img,
        saveCount: res.isSaved ? img.saveCount + 1 : Math.max(0, img.saveCount - 1),
        isSaved: res.isSaved
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
      setUploadMessage('Post successfully published to Lumora!');
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
      setNotifications(data.notifications || []);
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
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
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

  // Auth Success helper callback
  const handleAuthSuccess = (authenticatedUser) => {
    setUser(authenticatedUser);
    setCurrentView('feed');
    loadFeed();
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
    <div className="min-h-screen bg-background flex flex-col md:flex-row antialiased font-sans">
      
      {/* 2. Left Sidebar Navigation (Restored EXACT design layout as requested!) */}
      <aside className="hidden md:flex h-screen w-[220px] fixed left-0 top-0 flex-col border-r border-outline-variant bg-white py-6 px-4 justify-between z-40">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-0.5">
            <span
              onClick={() => { setCurrentView(user ? 'feed' : 'explore'); setSearchQuery(''); setFilteredImages(images); }}
              className="text-2xl font-serif font-black text-primary tracking-tight cursor-pointer"
            >
              Lumora
            </span>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest leading-none">Editorial Curation</span>
          </div>

          <nav className="flex flex-col gap-1.5">
            {user ? (
              <>
                <button
                  onClick={() => { setCurrentView('feed'); setSearchQuery(''); setFilteredImages(images); }}
                  className={`flex items-center gap-3 py-2 px-3 rounded-lg text-left transition-colors duration-150 ${
                    currentView === 'feed'
                      ? 'bg-secondary-container text-neutral-900 font-bold border-r-2 border-primary'
                      : 'text-on-surface-variant hover:text-neutral-900 hover:bg-surface-container-low'
                  }`}
                >
                  <Home className="h-4.5 w-4.5" />
                  <span className="text-xs font-semibold">Feed</span>
                </button>

                <button
                  onClick={() => { setCurrentView('explore'); setSearchQuery(''); setFilteredImages(images); }}
                  className={`flex items-center gap-3 py-2 px-3 rounded-lg text-left transition-colors duration-150 ${
                    currentView === 'explore'
                      ? 'bg-secondary-container text-neutral-900 font-bold border-r-2 border-primary'
                      : 'text-on-surface-variant hover:text-neutral-900 hover:bg-surface-container-low'
                  }`}
                >
                  <Compass className="h-4.5 w-4.5" />
                  <span className="text-xs font-semibold">Explore</span>
                </button>

                <button
                  onClick={() => setCurrentView('create')}
                  className={`flex items-center gap-3 py-2 px-3 rounded-lg text-left transition-colors duration-150 ${
                    currentView === 'create'
                      ? 'bg-secondary-container text-neutral-900 font-bold border-r-2 border-primary'
                      : 'text-on-surface-variant hover:text-neutral-900 hover:bg-surface-container-low'
                  }`}
                >
                  <Plus className="h-4.5 w-4.5" />
                  <span className="text-xs font-semibold">Create</span>
                </button>

                <button
                  onClick={() => setCurrentView('notifications')}
                  className={`flex items-center gap-3 py-2 px-3 rounded-lg text-left transition-colors duration-150 relative ${
                    currentView === 'notifications'
                      ? 'bg-secondary-container text-neutral-900 font-bold border-r-2 border-primary'
                      : 'text-on-surface-variant hover:text-neutral-900 hover:bg-surface-container-low'
                  }`}
                >
                  <Bell className="h-4.5 w-4.5" />
                  <span className="text-xs font-semibold">Notifications</span>
                  {notifications.some(n => !n.readAt) && (
                    <span className="absolute top-2.5 right-3 h-2 w-2 bg-primary rounded-full ring-2 ring-white"></span>
                  )}
                </button>

                <button
                  onClick={() => setCurrentView('profile')}
                  className={`flex items-center gap-3 py-2 px-3 rounded-lg text-left transition-colors duration-150 ${
                    currentView === 'profile'
                      ? 'bg-secondary-container text-neutral-900 font-bold border-r-2 border-primary'
                      : 'text-on-surface-variant hover:text-neutral-900 hover:bg-surface-container-low'
                  }`}
                >
                  <User className="h-4.5 w-4.5" />
                  <span className="text-xs font-semibold">Profile</span>
                </button>

                <button
                  onClick={() => setCurrentView('settings')}
                  className={`flex items-center gap-3 py-2 px-3 rounded-lg text-left transition-colors duration-150 ${
                    currentView === 'settings'
                      ? 'bg-secondary-container text-neutral-900 font-bold border-r-2 border-primary'
                      : 'text-on-surface-variant hover:text-neutral-900 hover:bg-surface-container-low'
                  }`}
                >
                  <Settings className="h-4.5 w-4.5" />
                  <span className="text-xs font-semibold">Settings</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { setCurrentView('explore'); setSearchQuery(''); setFilteredImages(images); }}
                  className={`flex items-center gap-3 py-2 px-3 rounded-lg text-left transition-colors duration-150 ${
                    currentView === 'explore'
                      ? 'bg-secondary-container text-neutral-900 font-bold border-r-2 border-primary'
                      : 'text-on-surface-variant hover:text-neutral-900 hover:bg-surface-container-low'
                  }`}
                >
                  <Compass className="h-4.5 w-4.5" />
                  <span className="text-xs font-semibold">Explore</span>
                </button>
                
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center gap-3 py-2 px-3 rounded-lg text-left text-on-surface-variant hover:text-neutral-900 hover:bg-surface-container-low transition-colors duration-150"
                >
                  <User className="h-4.5 w-4.5" />
                  <span className="text-xs font-semibold">Log in / Sign up</span>
                </button>
              </>
            )}
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => setCurrentView('support')}
            className={`text-left text-[11px] font-bold text-on-surface-variant hover:text-primary transition-colors px-3 py-1 ${
              currentView === 'support' ? 'text-primary font-black' : ''
            }`}
          >
            Support
          </button>
          
          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 py-2 px-3 rounded-lg text-left text-neutral-500 hover:text-red-600 hover:bg-red-50 transition-colors duration-150"
            >
              <LogOut className="h-4.5 w-4.5" />
              <span className="text-xs font-semibold">Sign Out</span>
            </button>
          )}
        </div>
      </aside>

      {/* 3. Mobile Header (Bottom Navbar matches mobile layout!) */}
      <header className="flex md:hidden justify-between items-center w-full px-6 h-16 sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-outline-variant">
        <span
          onClick={() => { setCurrentView(user ? 'feed' : 'explore'); setSearchQuery(''); setFilteredImages(images); }}
          className="text-xl font-serif font-black text-primary cursor-pointer"
        >
          Lumora
        </span>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <button onClick={() => setCurrentView('notifications')} className="relative p-2 text-neutral-600 hover:bg-neutral-100 rounded-full">
                <Bell className="h-5 w-5" />
                {notifications.some(n => !n.readAt) && (
                  <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></span>
                )}
              </button>
              <button onClick={() => setCurrentView('profile')} className="p-1 border border-primary rounded-full">
                <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-[10px] font-serif uppercase">
                  {user.username.charAt(1).toUpperCase()}
                </div>
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-white shadow-sm"
            >
              Connect
            </button>
          )}
        </div>
      </header>

      {/* Content Canvas Area (Shifted to allow fixed sidebar) */}
      <main className="flex-1 md:ml-[220px] min-h-screen p-margin-mobile md:p-margin-desktop flex flex-col gap-6 md:gap-8 bg-background pb-20 md:pb-10">
        
        {/* Sleek top Pinterest Search Bar inside the content area (Spans wide and Centered!) */}
        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-4xl mx-auto z-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search aesthetics, minimalist designs, tag pills, or authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white rounded-full py-4 pl-12 pr-6 text-xs font-semibold outline-none border border-outline-variant focus:border-neutral-400 focus:ring-2 focus:ring-secondary-container focus:bg-white transition-all text-neutral-800 shadow-sm"
          />
        </form>

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
                
                {/* Header (Beautiful Playfair Display Typography - Curation wording removed!) */}
                <header className="max-w-4xl">
                  <h1 className="font-serif text-4xl md:text-5xl font-black text-neutral-900 tracking-tight leading-tight mb-2">
                    Aesthetic Curation Board
                  </h1>
                  <p className="font-sans text-neutral-500 font-medium text-sm leading-relaxed max-w-2xl">
                    Discover and share contemporary room visual textures, high-end editorial designs, and beautiful minimal architectures compiled by our creator circle.
                  </p>
                </header>

                {/* Explore categories pills layout (matches legacy Explore chip filters exactly!) */}
                {currentView === 'explore' && (
                  <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1.5 border-b border-outline-variant/30">
                    {['All', 'Architecture', 'Art', 'Editorial', 'Minimalist', 'Interior', 'Fashion', 'Food'].map(cat => (
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
                            : 'bg-white border border-outline-variant hover:bg-neutral-50 text-neutral-600'
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
            {currentView === 'notifications' && (
              <div className="max-w-2xl mx-auto space-y-6 w-full">
                <div className="flex items-center justify-between border-b border-outline-variant pb-4">
                  <h1 className="font-serif text-3xl font-black text-neutral-900 tracking-tight">Notifications</h1>
                  {notifications.some(n => !n.readAt) && (
                    <button
                      onClick={handleMarkAllNotifications}
                      className="rounded-full bg-neutral-100 hover:bg-neutral-200 px-4 py-2 text-xs font-bold text-neutral-600 transition-colors"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {notifications.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl border border-outline-variant p-8 flex flex-col items-center">
                      <Inbox className="h-10 w-10 text-neutral-300 mb-3" />
                      <p className="text-xs font-bold text-neutral-400 tracking-wider uppercase">Your inbox is clear</p>
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          if (notif.imageId) setSelectedPostId(notif.imageId);
                          if (!notif.readAt) handleMarkSingleNotification(notif.id);
                        }}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          notif.readAt
                            ? 'bg-white border-outline-variant/60 text-neutral-600 hover:bg-neutral-50'
                            : 'bg-primary/5 border-primary/10 text-neutral-900 shadow-sm font-semibold'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`h-2 w-2 rounded-full bg-primary ${notif.readAt ? 'opacity-0' : ''}`}></div>
                          <div className="text-xs">
                            <span className="block font-bold">
                              {notif.actor_id ? `@${notif.actor_username}` : 'System'}
                            </span>
                            <span className="block mt-0.5 text-neutral-500 leading-normal">{notif.message}</span>
                          </div>
                        </div>
                        <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                          {new Date(notif.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* VIEW: Profile */}
            {currentView === 'profile' && profileUser && (
              <div className="space-y-8 w-full">
                {/* Profile Banner */}
                <div className="bg-white rounded-2xl border border-outline-variant p-8 flex flex-col items-center text-center shadow-sm">
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-3xl font-serif uppercase shadow-inner mb-4">
                    {profileUser.username.charAt(1).toUpperCase()}
                  </div>
                  <h1 className="font-serif text-3xl font-bold text-neutral-900">{profileUser.fullName}</h1>
                  <p className="text-xs font-bold text-neutral-400 tracking-wider uppercase mt-1">@{profileUser.username}</p>
                  
                  {profileUser.bio && (
                    <p className="mt-3 text-sm text-neutral-600 max-w-md font-medium">{profileUser.bio}</p>
                  )}

                  <div className="flex gap-6 mt-4 text-xs font-bold text-neutral-400 tracking-wider uppercase">
                    <span>{profileUser.followersCount || 0} Followers</span>
                    <span>{profileUser.followingCount || 0} Following</span>
                  </div>
                </div>

                {/* Profile Tabs (Tagged option removed!) */}
                <div className="flex justify-center border-b border-outline-variant pb-2 gap-4">
                  <button
                    onClick={() => setProfileTab('created')}
                    className={`pb-2 px-4 text-sm font-bold border-b-2 transition-all ${
                      profileTab === 'created'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    Created
                  </button>
                  <button
                    onClick={() => setProfileTab('saved')}
                    className={`pb-2 px-4 text-sm font-bold border-b-2 transition-all ${
                      profileTab === 'saved'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    Saved
                  </button>
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
              </div>
            )}

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 md:p-8 rounded-2xl border border-outline-variant shadow-sm">
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
                  <form onSubmit={handleUploadSubmit} className="space-y-4 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-600 uppercase tracking-widest mb-1.5">Inspiration Title</label>
                        <input
                          type="text"
                          required
                          placeholder="Give your creation a descriptive title"
                          value={uploadTitle}
                          onChange={(e) => setUploadTitle(e.target.value)}
                          className="w-full rounded-xl border border-outline-variant bg-neutral-50 px-4 py-3 text-xs outline-none focus:border-primary/50 focus:bg-white transition-all font-semibold"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="block text-xs font-bold text-neutral-600 uppercase tracking-widest">Story / Caption</label>
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
                        <textarea
                          placeholder="Tell a short story about this compositions..."
                          value={uploadCaption}
                          onChange={(e) => setUploadCaption(e.target.value)}
                          rows={3}
                          className="w-full rounded-xl border border-outline-variant bg-neutral-50 px-4 py-3 text-xs outline-none focus:border-primary/50 focus:bg-white transition-all leading-normal"
                        />
                      </div>

                      {/* Tag Chip input pills */}
                      <div>
                        <label className="block text-xs font-bold text-neutral-600 uppercase tracking-widest mb-1.5">Tag pills</label>
                        
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

                        <input
                          type="text"
                          placeholder="Type tag and press Enter or comma..."
                          value={uploadTagInput}
                          onChange={(e) => setUploadTagInput(e.target.value)}
                          onKeyDown={handleTagInputKeyDown}
                          className="w-full rounded-xl border border-outline-variant bg-neutral-50 px-4 py-3 text-xs outline-none focus:border-primary/50 focus:bg-white transition-all font-semibold"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-outline-variant/30">
                      <button
                        type="submit"
                        disabled={uploadLoading}
                        className="w-full rounded-xl bg-primary py-3.5 text-xs font-bold text-white shadow-md hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        Publish Composition
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
                      className="flex-1 bg-white/10 rounded-xl px-4 py-3 text-xs outline-none border border-transparent focus:bg-white/15 focus:border-white/20 text-white placeholder:text-neutral-500 font-semibold"
                    />
                    <button
                      type="button"
                      onClick={handleAIGenerate}
                      disabled={aiGenerating || !aiPrompt.trim()}
                      className="bg-white hover:bg-neutral-100 text-neutral-900 rounded-xl px-5 py-3 text-xs font-bold active:scale-[0.98] transition-all flex items-center gap-1.5 shadow-md disabled:opacity-50"
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

                <form onSubmit={handleSettingsUpdate} className="bg-white rounded-2xl border border-outline-variant p-6 md:p-8 space-y-4 shadow-sm">
                  <div>
                    <label className="block text-xs font-bold text-neutral-600 uppercase tracking-widest mb-1.5">Full Name</label>
                    <input
                      type="text"
                      placeholder="Elena Thorne"
                      value={settingsFullName}
                      onChange={(e) => setSettingsFullName(e.target.value)}
                      className="w-full rounded-xl border border-outline-variant bg-neutral-50 px-4 py-3 text-xs outline-none focus:border-primary/50 focus:bg-white transition-all font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-600 uppercase tracking-widest mb-1.5">Biography</label>
                    <textarea
                      placeholder="Tell the community about your curator philosophy..."
                      value={settingsBio}
                      onChange={(e) => setSettingsBio(e.target.value)}
                      rows={3}
                      className="w-full rounded-xl border border-outline-variant bg-neutral-50 px-4 py-3 text-xs outline-none focus:border-primary/50 focus:bg-white transition-all leading-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-600 uppercase tracking-widest mb-1.5">Website</label>
                    <input
                      type="text"
                      placeholder="https://example.com"
                      value={settingsWebsite}
                      onChange={(e) => setSettingsWebsite(e.target.value)}
                      className="w-full rounded-xl border border-outline-variant bg-neutral-50 px-4 py-3 text-xs outline-none focus:border-primary/50 focus:bg-white transition-all font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-600 uppercase tracking-widest mb-1.5">Location</label>
                    <input
                      type="text"
                      placeholder="Paris, France"
                      value={settingsLocation}
                      onChange={(e) => setSettingsLocation(e.target.value)}
                      className="w-full rounded-xl border border-outline-variant bg-neutral-50 px-4 py-3 text-xs outline-none focus:border-primary/50 focus:bg-white transition-all font-semibold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-primary py-3.5 text-xs font-bold text-white shadow-sm hover:opacity-90 active:scale-[0.98] transition-all"
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
                  Lumora Support Desk
                </h1>

                {supportSuccess && (
                  <div className="p-4 rounded-xl bg-green-50 border border-green-100 text-xs font-bold text-green-600">
                    {supportSuccess}
                  </div>
                )}

                <div className="bg-white rounded-2xl border border-outline-variant p-6 md:p-8 space-y-6 shadow-sm">
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
                        className="w-full rounded-xl border border-outline-variant bg-neutral-50 px-4 py-3 text-xs outline-none focus:border-primary/50 focus:bg-white transition-all font-semibold"
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
                        className="w-full rounded-xl border border-outline-variant bg-neutral-50 px-4 py-3 text-xs outline-none focus:border-primary/50 focus:bg-white transition-all leading-normal"
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
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-outline-variant flex justify-around py-3.5 z-40 shadow-lg">
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
          setImages(prev => prev.map(img => img.id === id ? { ...img, isLiked } : img));
          setFilteredImages(prev => prev.map(img => img.id === id ? { ...img, isLiked } : img));
        }}
        onSaveToggle={(id, isSaved) => {
          setImages(prev => prev.map(img => img.id === id ? { ...img, isSaved } : img));
          setFilteredImages(prev => prev.map(img => img.id === id ? { ...img, isSaved } : img));
        }}
      />

      {/* Guest authorization modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}
