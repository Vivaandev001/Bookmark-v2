import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, ArrowRight, ShieldCheck, Heart, Terminal, Compass, 
  BookmarkCheck, Sparkles, Plus, PlusCircle, Search, HelpCircle,
  Menu, X, BookOpen, AlertCircle
} from 'lucide-react';
import { AppCardData, CustomCategory, SortFilter } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import Sidebar from './components/Sidebar';
import AppGrid from './components/AppGrid';
import EmptyState from './components/EmptyState';
import AddWebsiteModal from './components/AddWebsiteModal';
import WelcomePopup from './components/WelcomePopup';
import GreenPixelBg from './components/GreenPixelBg';

// Initial Categories Seed
const DEFAULT_CATEGORIES: CustomCategory[] = [
  { id: 'cat-productivity', name: 'Productivity', icon: 'FileText', color: '#E1D0C9', order: 0 },
  { id: 'cat-development', name: 'Development', icon: 'Code', color: '#3b82f6', order: 1 },
  { id: 'cat-design', name: 'Design', icon: 'Palette', color: '#8b5cf6', order: 2 },
  { id: 'cat-entertainment', name: 'Entertainment', icon: 'Music', color: '#ec4899', order: 3 },
  { id: 'cat-social', name: 'Social Tools', icon: 'Share2', color: '#10b981', order: 4 },
];

const PRESET_APPS: AppCardData[] = [
  {
    id: 'preset-notion',
    name: 'Notion Workspace',
    url: 'https://notion.so',
    logo: 'https://www.google.com/s2/favicons?domain=notion.so&sz=128',
    description: 'A single space where you can write, plan, and collaborate. Storing all workspace tools cleanly.',
    category: 'cat-productivity',
    createdAt: Date.now() - 5000,
    isFavorite: true,
    clickCount: 12,
    lastOpened: Date.now() - 3600000 * 2,
  },
  {
    id: 'preset-github',
    name: 'GitHub',
    url: 'https://github.com',
    logo: 'https://www.google.com/s2/favicons?domain=github.com&sz=128',
    description: 'AI-powered software developer platform. Review pull requests and organize issue cards.',
    category: 'cat-development',
    createdAt: Date.now() - 4000,
    isFavorite: false,
    clickCount: 24,
    lastOpened: Date.now() - 60000,
  },
  {
    id: 'preset-figma',
    name: 'Figma Design',
    url: 'https://figma.com',
    logo: 'https://www.google.com/s2/favicons?domain=figma.com&sz=128',
    description: 'Collaborative vector graphic editor and prototyping layout generator.',
    category: 'cat-design',
    createdAt: Date.now() - 3000,
    isFavorite: true,
    clickCount: 8,
    lastOpened: Date.now() - 3600000 * 24,
  },
  {
    id: 'preset-linear',
    name: 'Linear Tracker',
    url: 'https://linear.app',
    logo: 'https://www.google.com/s2/favicons?domain=linear.app&sz=128',
    description: 'Streamline project backlogs and sprints. Fast, responsive, keyboard-driven issue tracker.',
    category: 'cat-productivity',
    createdAt: Date.now() - 2000,
    isFavorite: false,
    clickCount: 5,
    lastOpened: Date.now() - 3600000 * 12,
  },
  {
    id: 'preset-spotify',
    name: 'Spotify Player',
    url: 'https://spotify.com',
    logo: 'https://www.google.com/s2/favicons?domain=spotify.com&sz=128',
    description: 'Stream millions of tracks, albums, podcasts, and digital music libraries.',
    category: 'cat-entertainment',
    createdAt: Date.now() - 1000,
    isFavorite: false,
    clickCount: 15,
    lastOpened: Date.now() - 600000,
  },
];

export default function App() {
  const [username, setUsername] = useState('');
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);

  const [categories, setCategories] = useState<CustomCategory[]>([]);
  const [apps, setApps] = useState<AppCardData[]>([]);

  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All'); // 'All' or custom category ID
  const [selectedFilter, setSelectedFilter] = useState<SortFilter>('all');
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<AppCardData | null>(null);

  // Mobile sidebar drawer helper
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Load username, categories, and apps on initial mount
  useEffect(() => {
    // 1. Username
    const savedName = localStorage.getItem('bookmark_username');
    if (savedName) {
      setUsername(savedName);
    } else {
      setIsWelcomeOpen(true);
    }

    // 2. Categories
    const savedCategories = localStorage.getItem('bookmark_categories');
    if (savedCategories) {
      try {
        setCategories(JSON.parse(savedCategories));
      } catch (e) {
        setCategories(DEFAULT_CATEGORIES);
      }
    } else {
      setCategories(DEFAULT_CATEGORIES);
      localStorage.setItem('bookmark_categories', JSON.stringify(DEFAULT_CATEGORIES));
    }

    // 3. App Bookmarks
    const savedApps = localStorage.getItem('bookmark_apps');
    if (savedApps) {
      try {
        setApps(JSON.parse(savedApps));
      } catch (e) {
        setApps(PRESET_APPS);
      }
    } else {
      setApps(PRESET_APPS);
      localStorage.setItem('bookmark_apps', JSON.stringify(PRESET_APPS));
    }
  }, []);

  const handleSaveUsername = (name: string) => {
    setUsername(name);
    localStorage.setItem('bookmark_username', name);
    setIsWelcomeOpen(false);
    setView('dashboard');
  };

  const handleSaveCategories = (updatedCats: CustomCategory[]) => {
    // Sort by order before saving
    const sorted = [...updatedCats].sort((a, b) => a.order - b.order);
    setCategories(sorted);
    localStorage.setItem('bookmark_categories', JSON.stringify(sorted));
  };

  const handleSaveApps = (updatedApps: AppCardData[]) => {
    setApps(updatedApps);
    localStorage.setItem('bookmark_apps', JSON.stringify(updatedApps));
  };

  // Category Management Handlers
  const handleAddCategory = (name: string, icon: string, color: string) => {
    const newCat: CustomCategory = {
      id: `cat-${Date.now()}`,
      name,
      icon,
      color,
      order: categories.length,
    };
    handleSaveCategories([...categories, newCat]);
  };

  const handleDeleteCategory = (id: string) => {
    const updatedCats = categories.filter(c => c.id !== id);
    handleSaveCategories(updatedCats);

    // Reassign apps that belonged to deleted category to 'Productivity' or 'Other'
    const fallbackId = categories.find(c => c.id !== id)?.id || '';
    const updatedApps = apps.map(app => {
      if (app.category === id) {
        return { ...app, category: fallbackId };
      }
      return app;
    });
    handleSaveApps(updatedApps);

    if (selectedCategory === id) {
      setSelectedCategory('All');
    }
  };

  const handleRenameCategory = (id: string, newName: string) => {
    const updatedCats = categories.map(c => {
      if (c.id === id) {
        return { ...c, name: newName };
      }
      return c;
    });
    handleSaveCategories(updatedCats);
  };

  const handleMoveCategory = (id: string, direction: 'up' | 'down') => {
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= categories.length) return;

    const updated = [...categories];
    // Swap order values
    const tempOrder = updated[index].order;
    updated[index].order = updated[newIndex].order;
    updated[newIndex].order = tempOrder;

    handleSaveCategories(updated);
  };

  // App Card Handlers
  const handleAddApp = (newApp: Omit<AppCardData, 'id' | 'createdAt'>) => {
    const app: AppCardData = {
      ...newApp,
      id: `app-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      createdAt: Date.now(),
      clickCount: 0,
      lastOpened: undefined,
    };
    const updated = [app, ...apps];
    handleSaveApps(updated);
    setView('dashboard');
  };

  const handleEditSaveApp = (updatedApp: AppCardData) => {
    const updated = apps.map(app => (app.id === updatedApp.id ? updatedApp : app));
    handleSaveApps(updated);
    setEditingApp(null);
  };

  const handleDeleteApp = (id: string) => {
    const updated = apps.filter(app => app.id !== id);
    handleSaveApps(updated);
  };

  const handleToggleFavorite = (id: string) => {
    const updated = apps.map(app => {
      if (app.id === id) {
        return { ...app, isFavorite: !app.isFavorite };
      }
      return app;
    });
    handleSaveApps(updated);
  };

  const handleOpenApp = (app: AppCardData) => {
    // Record statistics
    const updated = apps.map(item => {
      if (item.id === app.id) {
        return {
          ...item,
          lastOpened: Date.now(),
          clickCount: (item.clickCount || 0) + 1,
        };
      }
      return item;
    });
    handleSaveApps(updated);
  };

  const handleDuplicateApp = (app: AppCardData) => {
    const duplicate: AppCardData = {
      ...app,
      id: `app-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name: `${app.name} (Copy)`,
      createdAt: Date.now(),
      isFavorite: false,
      clickCount: 0,
      lastOpened: undefined,
    };
    handleSaveApps([duplicate, ...apps]);
  };

  const handleMoveAppCategory = (appId: string, targetCatId: string) => {
    const updated = apps.map(app => {
      if (app.id === appId) {
        return { ...app, category: targetCatId };
      }
      return app;
    });
    handleSaveApps(updated);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedFilter('all');
  };

  const handleResetAllData = () => {
    if (confirm('Are you sure you want to reset your local workspace launcher database? This deletes all custom cards and custom categories.')) {
      localStorage.removeItem('bookmark_apps');
      localStorage.removeItem('bookmark_categories');
      localStorage.removeItem('bookmark_username');
      window.location.reload();
    }
  };

  // Helper selectors
  const getAppCountForCategory = (catId: string) => {
    return apps.filter(app => app.category === catId).length;
  };

  const getAppCountForFilter = (filter: SortFilter) => {
    if (filter === 'all') return apps.length;
    if (filter === 'favorites') return apps.filter(app => app.isFavorite).length;
    if (filter === 'recent') return apps.filter(app => app.lastOpened).length;
    return 0;
  };

  // Computed filtering
  const filteredApps = apps.filter(app => {
    // 1. Sidebar category filter
    const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;

    // 2. Quick list filters
    let matchesFilter = true;
    if (selectedFilter === 'favorites') {
      matchesFilter = !!app.isFavorite;
    } else if (selectedFilter === 'recent') {
      matchesFilter = !!app.lastOpened;
    }

    // 3. Global search
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = 
      !query ||
      app.name.toLowerCase().includes(query) ||
      app.url.toLowerCase().includes(query) ||
      app.description.toLowerCase().includes(query);

    return matchesCategory && matchesFilter && matchesSearch;
  });

  // Sort according to selection
  const sortedApps = [...filteredApps].sort((a, b) => {
    if (selectedFilter === 'most-used') {
      return (b.clickCount || 0) - (a.clickCount || 0);
    }
    if (selectedFilter === 'alphabetical') {
      return a.name.localeCompare(b.name);
    }
    if (selectedFilter === 'recent') {
      return (b.lastOpened || 0) - (a.lastOpened || 0);
    }
    if (selectedFilter === 'oldest') {
      return a.createdAt - b.createdAt;
    }
    // Default: newest first
    return b.createdAt - a.createdAt;
  });

  return (
    <div id="bookmark-app-root" className="min-h-screen flex flex-col bg-[#3d2e2b] text-white selection:bg-[#764C4E]/40 selection:text-white">
      
      {/* Navbar header */}
      <Navbar
        onAddClick={() => {
          setEditingApp(null);
          setIsAddModalOpen(true);
        }}
        savedCount={apps.length}
        currentView={view}
        onNavigateHome={() => setView('landing')}
        onNavigateDashboard={() => setView('dashboard')}
        username={username}
      />

      {/* Main workspace views router */}
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          
          {/* Landing / Marketing View */}
          {view === 'landing' ? (
            <motion.div
              key="landing-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex-1"
            >
              <Hero
                onAddClick={() => {
                  setEditingApp(null);
                  setIsAddModalOpen(true);
                }}
                onExploreClick={() => {
                  if (!username) {
                    setIsWelcomeOpen(true);
                  } else {
                    setView('dashboard');
                  }
                }}
              />

              {/* High-end Pitch area */}
              <section className="bg-[#332624]/70 py-20 px-6 backdrop-blur-md">
                <div className="mx-auto max-w-7xl">
                  <div className="text-center max-w-xl mx-auto mb-16">
                    <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                      A visual workspace launcher for web creators.
                    </h2>
                    <p className="mt-4 text-sm text-white/50 font-light leading-relaxed">
                      Removes browser tab friction, offering instantaneous launchpads with local storage persistence.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="rounded-3xl border border-white/5 bg-[#231918]/40 p-8 hover:border-white/10 transition-all duration-300">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-white border border-white/10 mb-5">
                        <Terminal className="h-5 w-5 text-rose-200" />
                      </div>
                      <h3 className="font-display text-lg font-bold text-white mb-2">Desktop Environment</h3>
                      <p className="text-xs text-white/50 font-light leading-relaxed">
                        Every saved portal renders like a local desktop app. Simple icons, domain metrics, and clean typography.
                      </p>
                    </div>

                    <div className="rounded-3xl border border-white/5 bg-[#231918]/40 p-8 hover:border-white/10 transition-all duration-300">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-white border border-white/10 mb-5">
                        <Compass className="h-5 w-5 text-rose-200" />
                      </div>
                      <h3 className="font-display text-lg font-bold text-white mb-2">Unlimited Categories</h3>
                      <p className="text-xs text-white/50 font-light leading-relaxed">
                        Create custom lists, group apps by client, projects, classes, or hobbies. Move apps instantly.
                      </p>
                    </div>

                    <div className="rounded-3xl border border-white/5 bg-[#231918]/40 p-8 hover:border-white/10 transition-all duration-300">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-white border border-white/10 mb-5">
                        <BookmarkCheck className="h-5 w-5 text-rose-200" />
                      </div>
                      <h3 className="font-display text-lg font-bold text-white mb-2">Zero Latency Scraper</h3>
                      <p className="text-xs text-white/50 font-light leading-relaxed">
                        Input any URL, and our server proxy instantly fetches high-res favicons, page metadata, and categorizes automatically.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          ) : (
            
            /* Professional Desktop Dashboard View */
            <motion.div
              key="dashboard-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex-1 flex flex-col lg:flex-row min-h-[calc(100vh-80px)] relative"
            >
              {/* Premium Background Green/Cyan Ambient Glow Pixel Atmosphere inspired */}
              <div className="absolute inset-0 -z-20 bg-gradient-to-tr from-[#231918] via-[#332624] to-[#3d2e2b] overflow-hidden">
                <GreenPixelBg />
              </div>

              {/* Sidebar drawer toggle button for tablet/mobile screens */}
              <div className="lg:hidden flex items-center justify-between px-6 py-3 bg-[#332624]/95">
                <button
                  onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                  className="flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-white"
                >
                  <Menu className="h-4.5 w-4.5 text-rose-200" />
                  <span>{isMobileSidebarOpen ? 'Close Navigation' : 'Open Navigation'}</span>
                </button>
                <div className="text-[10px] text-white/40 tracking-wider">
                  Logged as <strong className="text-white font-bold">{username}</strong>
                </div>
              </div>

              {/* Sidebar Navigation - Sticky floating desktop layout */}
              <div className={`lg:block ${isMobileSidebarOpen ? 'block' : 'hidden'} shrink-0`}>
                <Sidebar
                  username={username || 'Vivaan'}
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={(id) => {
                    setSelectedCategory(id);
                    setIsMobileSidebarOpen(false); // auto-close drawer
                  }}
                  selectedFilter={selectedFilter}
                  onSelectFilter={(filter) => {
                    setSelectedFilter(filter);
                    setIsMobileSidebarOpen(false);
                  }}
                  onAddCategory={handleAddCategory}
                  onDeleteCategory={handleDeleteCategory}
                  onRenameCategory={handleRenameCategory}
                  onMoveCategory={handleMoveCategory}
                  onResetAllData={handleResetAllData}
                  getAppCountForCategory={getAppCountForCategory}
                  getAppCountForFilter={getAppCountForFilter}
                />
              </div>

              {/* Main Content Area */}
              <div className="flex-1 px-6 py-8 md:px-10 md:py-12 overflow-y-auto max-w-7xl mx-auto w-full">
                
                {/* Header Actions row */}
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between pb-4 mb-6">
                  <div>
                    {username && (
                      <div className="mb-2.5 flex items-center gap-2 text-xs font-semibold text-rose-200 bg-rose-950/20 border border-rose-500/10 px-3 py-1 rounded-full w-fit">
                        <Sparkles className="h-3.5 w-3.5 text-rose-200 animate-pulse" />
                        <span>Welcome back, <span className="text-white font-bold">{username}</span></span>
                      </div>
                    )}
                    <h1 className="font-display text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
                      <Layers className="h-6 w-6 text-rose-200" />
                      <span>
                        {selectedCategory === 'All' 
                          ? selectedFilter === 'favorites' 
                            ? 'Favorites Launcher' 
                            : selectedFilter === 'recent' 
                              ? 'Recent Launchpad' 
                              : 'Workspace Library'
                          : categories.find(c => c.id === selectedCategory)?.name || 'Custom Folder'}
                      </span>
                    </h1>
                    <p className="mt-1 text-xs text-white/40 font-light">
                      Sandbox containing {sortedApps.length} active application shortcuts
                    </p>
                  </div>

                  {/* Real-time search engine */}
                  <SearchBar value={searchQuery} onChange={setSearchQuery} />
                </div>

                {/* Sub-Filters sorting pills */}
                <div className="mb-6 flex flex-wrap gap-2 items-center">
                  <span className="text-[10px] text-white/30 uppercase tracking-wider font-extrabold mr-2">Sort Order:</span>
                  
                  <button
                    onClick={() => setSelectedFilter('all')}
                    className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-wide transition-all ${
                      selectedFilter === 'all' || selectedFilter === 'favorites' || selectedFilter === 'recent'
                        ? 'bg-white/10 text-rose-200 font-extrabold'
                        : 'bg-transparent text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Newest Saved
                  </button>

                  <button
                    onClick={() => setSelectedFilter('most-used')}
                    className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-wide transition-all ${
                      selectedFilter === 'most-used'
                        ? 'bg-[#764C4E]/20 text-rose-200 font-extrabold'
                        : 'bg-transparent text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Most Used
                  </button>

                  <button
                    onClick={() => setSelectedFilter('alphabetical')}
                    className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-wide transition-all ${
                      selectedFilter === 'alphabetical'
                        ? 'bg-[#764C4E]/20 text-rose-200 font-extrabold'
                        : 'bg-transparent text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    A - Z Alphabetical
                  </button>

                  <button
                    onClick={() => setSelectedFilter('oldest')}
                    className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-wide transition-all ${
                      selectedFilter === 'oldest'
                        ? 'bg-[#764C4E]/20 text-rose-200 font-extrabold'
                        : 'bg-transparent text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Oldest Entry
                  </button>
                </div>

                {/* Search filters feedback bar */}
                {(searchQuery || selectedCategory !== 'All' || selectedFilter !== 'all') && (
                  <div className="flex items-center justify-between bg-white/5 border border-white/5 rounded-2xl px-4 py-3 mb-6 text-xs text-white/70">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                      <span>Filtered view is active. Matches: <strong>{sortedApps.length} portals</strong></span>
                    </div>
                    <button 
                      onClick={handleResetFilters}
                      className="text-cyan-200 hover:underline font-semibold"
                    >
                      Clear active filters
                    </button>
                  </div>
                )}

                {/* Library Desktop Grid */}
                <AnimatePresence mode="wait">
                  {sortedApps.length > 0 ? (
                    <motion.div
                      key="grid-active"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AppGrid 
                        apps={sortedApps} 
                        onDelete={handleDeleteApp}
                        onToggleFavorite={handleToggleFavorite}
                        onOpenApp={handleOpenApp}
                        onDuplicate={handleDuplicateApp}
                        onEdit={(app) => {
                          setEditingApp(app);
                          setIsAddModalOpen(true);
                        }}
                        categories={categories}
                        onMoveCategory={handleMoveAppCategory}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty-state"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <EmptyState
                        onAddClick={() => {
                          setEditingApp(null);
                          setIsAddModalOpen(true);
                        }}
                        isSearchOrFilterActive={!!searchQuery || selectedCategory !== 'All' || selectedFilter !== 'all'}
                        onResetFilters={handleResetFilters}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Luxury Float Action Trigger Button in Dashboard Mode */}
      {view === 'dashboard' && (
        <div className="fixed bottom-6 right-6 z-30">
          <button
            onClick={() => {
              setEditingApp(null);
              setIsAddModalOpen(true);
            }}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-2xl hover:scale-105 active:scale-95 hover:shadow-rose-400/20 hover:shadow-xl transition-all duration-300 cursor-pointer border border-white/10 group"
            title="Create App Shortcut"
          >
            <Plus className="h-6 w-6 text-black group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>
      )}

      {/* Compact minimalist footer */}
      <footer id="bookmark-footer" className="bg-[#3d2e2b] py-8 text-center px-6">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div className="flex items-center gap-1.5 font-bold">
            <span className="font-display tracking-wider text-white">BOOKMARK WORKSPACE</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with local sandbox security</span>
            <Heart className="h-3 w-3 fill-white text-white" />
            <span>and local persistence.</span>
          </div>
        </div>
      </footer>

      {/* Add / Edit App card sliding modal */}
      <AddWebsiteModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingApp(null);
        }}
        onAdd={handleAddApp}
        onEditSave={handleEditSaveApp}
        editingApp={editingApp}
        categories={categories}
      />

      {/* First launch interactive welcome drawer popup */}
      <WelcomePopup
        isOpen={isWelcomeOpen}
        onSave={handleSaveUsername}
      />
    </div>
  );
}
