import fs from 'fs';

const filePath = 'c:/NEXA/Lumora/Frontend/src/App.jsx';
let content = fs.readFileSync(filePath, 'utf-8');

// Normalize line endings for easier matching
content = content.replace(/\r\n/g, '\n');

const startIndex = content.indexOf('  return (\n');
const endIndex = content.indexOf('        {loading && (\n');

if (startIndex === -1 || endIndex === -1) {
  console.log("Could not find boundaries", {startIndex, endIndex});
  process.exit(1);
}

const topReplacement = `  return (
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
              className="bg-primary text-[#E0D9D9] rounded-full px-5 py-2 text-xs font-bold shadow-sm transition-all hover:opacity-90"
            >
              Connect
            </button>
          )}
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 md:px-8 md:py-8 flex flex-col gap-6 bg-background">
        
`;

content = content.substring(0, startIndex) + topReplacement + content.substring(endIndex);

const endDivIndex = content.lastIndexOf('    </div>');

const bottomNav = `
      {/* Universal Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 w-full bg-surface border-t border-outline-variant z-50 flex items-center justify-around py-3 px-2 sm:px-6 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <button
          onClick={() => { setCurrentView(user ? 'feed' : 'explore'); setSearchQuery(''); setFilteredImages(images); }}
          className={\`flex flex-col items-center gap-1.5 w-16 \${(currentView === 'feed' || (!user && currentView === 'explore')) ? 'text-primary' : 'text-neutral-500 hover:text-neutral-300'}\`}
        >
          <Home className="h-5 w-5" />
          <span className="text-[10px] font-bold">Home</span>
        </button>

        <button
          onClick={() => { setCurrentView('explore'); setSearchQuery(''); setFilteredImages(images); }}
          className={\`flex flex-col items-center gap-1.5 w-16 \${(currentView === 'explore' && user) ? 'text-primary' : 'text-neutral-500 hover:text-neutral-300'}\`}
        >
          <Compass className="h-5 w-5" />
          <span className="text-[10px] font-bold">Explore</span>
        </button>

        <button
          onClick={() => { user ? setCurrentView('create') : setShowAuthModal(true); }}
          className={\`flex flex-col items-center gap-1.5 w-16 \${currentView === 'create' ? 'text-primary' : 'text-neutral-500 hover:text-neutral-300'}\`}
        >
          <Plus className="h-5 w-5" />
          <span className="text-[10px] font-bold">Create</span>
        </button>

        <button
          onClick={() => { user ? setCurrentView('settings') : setShowAuthModal(true); }}
          className={\`flex flex-col items-center gap-1.5 w-16 \${currentView === 'settings' ? 'text-primary' : 'text-neutral-500 hover:text-neutral-300'}\`}
        >
          <Settings className="h-5 w-5" />
          <span className="text-[10px] font-bold">Settings</span>
        </button>
      </nav>
`;

content = content.substring(0, endDivIndex) + bottomNav + content.substring(endDivIndex);

// Re-apply original line endings just in case it matters for git/diffs, but it should be fine.
fs.writeFileSync(filePath, content, 'utf-8');
console.log('App.jsx layout successfully updated!');
