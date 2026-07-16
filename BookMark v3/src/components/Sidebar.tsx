import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, Star, Clock, FolderPlus, Trash2, Edit2, 
  ChevronUp, ChevronDown, Check, X, LogOut, ShieldCheck, 
  Compass, Palette, FileText, Code, Music, Share2, BookOpen, Target, Heart
} from 'lucide-react';
import { CustomCategory, SortFilter } from '../types';
import BookMarkLogo from './BookMarkLogo';

interface SidebarProps {
  username: string;
  categories: CustomCategory[];
  selectedCategory: string; // 'All' or custom category ID
  onSelectCategory: (id: string) => void;
  selectedFilter: SortFilter;
  onSelectFilter: (filter: SortFilter) => void;
  onAddCategory: (name: string, icon: string, color: string) => void;
  onDeleteCategory: (id: string) => void;
  onRenameCategory: (id: string, newName: string) => void;
  onMoveCategory: (id: string, direction: 'up' | 'down') => void;
  onResetAllData: () => void;
  getAppCountForCategory: (catId: string) => number;
  getAppCountForFilter: (filter: SortFilter) => number;
}

const AVAILABLE_ICONS = [
  { name: 'Folder', icon: Compass },
  { name: 'Code', icon: Code },
  { name: 'Palette', icon: Palette },
  { name: 'Share2', icon: Share2 },
  { name: 'Music', icon: Music },
  { name: 'BookOpen', icon: BookOpen },
  { name: 'Target', icon: Target },
  { name: 'Heart', icon: Heart },
  { name: 'FileText', icon: FileText }
];

const AVAILABLE_COLORS = [
  '#E1D0C9', // Powder Petal
  '#764C4E', // Chocolate Plum
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // orange
  '#8b5cf6', // purple
  '#ec4899', // pink
];

export default function Sidebar({
  username,
  categories,
  selectedCategory,
  onSelectCategory,
  selectedFilter,
  onSelectFilter,
  onAddCategory,
  onDeleteCategory,
  onRenameCategory,
  onMoveCategory,
  onResetAllData,
  getAppCountForCategory,
  getAppCountForFilter,
}: SidebarProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('Folder');
  const [newCatColor, setNewCatColor] = useState('#E1D0C9');

  // Edit states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCatName.trim()) {
      onAddCategory(newCatName.trim(), newCatIcon, newCatColor);
      setNewCatName('');
      setIsAdding(false);
    }
  };

  const startRename = (cat: CustomCategory) => {
    setEditingId(cat.id);
    setEditName(cat.name);
  };

  const saveRename = (id: string) => {
    if (editName.trim()) {
      onRenameCategory(id, editName.trim());
      setEditingId(null);
    }
  };

  // Safe rendering helper for dynamic icons
  const renderIcon = (iconName: string, className = "h-4 w-4") => {
    const found = AVAILABLE_ICONS.find(i => i.name === iconName);
    const IconComponent = found ? found.icon : Compass;
    return <IconComponent className={className} />;
  };

  return (
    <aside 
      id="bookmark-sidebar"
      className="w-full lg:w-64 bg-transparent p-6 flex flex-col justify-between gap-8 backdrop-blur-2xl shrink-0 h-full"
    >
      <div className="space-y-8 overflow-y-auto pr-1">
        
        {/* Brand Header */}
        <div className="px-2 pb-2 flex items-center gap-3">
          <BookMarkLogo size={28} variant="squircle" />
          <div className="flex flex-col">
            <span className="font-display font-black text-sm tracking-tighter text-white uppercase leading-none">BOOKMARK</span>
            <span className="text-[9px] text-white/40 tracking-wider font-semibold uppercase leading-none mt-1">Workspace v2</span>
          </div>
        </div>
        
        {/* Quick Lists */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-widest opacity-40 font-extrabold px-2">Workspace Quick Lists</span>
          
          {/* All Apps */}
          <button
            onClick={() => {
              onSelectFilter('all');
              onSelectCategory('All');
            }}
            className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-all ${
              selectedFilter === 'all' && selectedCategory === 'All'
                ? 'bg-[#764C4E]/20 text-white border border-white/10 shadow-lg'
                : 'hover:bg-white/5 text-white/75 hover:text-white border border-transparent'
            }`}
          >
            <div className="flex items-center gap-3">
              <Layers className="h-4 w-4 text-rose-300" />
              <span>All Web Apps</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-white/60">
              {getAppCountForFilter('all')}
            </span>
          </button>

          {/* Favorites */}
          <button
            onClick={() => {
              onSelectFilter('favorites');
              onSelectCategory('All');
            }}
            className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-all ${
              selectedFilter === 'favorites'
                ? 'bg-[#764C4E]/20 text-white border border-white/10 shadow-lg'
                : 'hover:bg-white/5 text-white/75 hover:text-white border border-transparent'
            }`}
          >
            <div className="flex items-center gap-3">
              <Star className="h-4 w-4 text-yellow-300" />
              <span>Favorites</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-white/60">
              {getAppCountForFilter('favorites')}
            </span>
          </button>

          {/* Recent */}
          <button
            onClick={() => {
              onSelectFilter('recent');
              onSelectCategory('All');
            }}
            className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-all ${
              selectedFilter === 'recent'
                ? 'bg-[#764C4E]/20 text-white border border-white/10 shadow-lg'
                : 'hover:bg-white/5 text-white/75 hover:text-white border border-transparent'
            }`}
          >
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-blue-300" />
              <span>Recently Opened</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-white/60">
              {getAppCountForFilter('recent')}
            </span>
          </button>
        </div>

        {/* Categories Section */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-2">
            <span className="text-[10px] uppercase tracking-widest opacity-40 font-extrabold">Custom Categories</span>
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="text-xs font-bold text-white/60 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              title="Add Category"
            >
              <FolderPlus className="h-4 w-4" />
            </button>
          </div>

          {/* Add Category Compact Slide-down Form */}
          <AnimatePresence>
            {isAdding && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleCreateCategory}
                className="bg-[#231918] border border-white/5 p-3 rounded-xl space-y-3 overflow-hidden mb-2"
              >
                <div>
                  <input
                    type="text"
                    required
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="Category Name"
                    maxLength={15}
                    className="w-full bg-[#1e1514] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-white/25"
                  />
                </div>

                {/* Icon Selection */}
                <div className="space-y-1">
                  <span className="text-[9px] text-white/40 uppercase font-bold block">Select Icon</span>
                  <div className="flex flex-wrap gap-1">
                    {AVAILABLE_ICONS.map(i => (
                      <button
                        key={i.name}
                        type="button"
                        onClick={() => setNewCatIcon(i.name)}
                        className={`p-1.5 rounded-md border text-xs transition-colors ${
                          newCatIcon === i.name 
                            ? 'bg-white/10 border-white/35 text-white' 
                            : 'bg-transparent border-transparent text-white/50 hover:bg-white/5'
                        }`}
                      >
                        <i.icon className="h-3.5 w-3.5" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div className="space-y-1">
                  <span className="text-[9px] text-white/40 uppercase font-bold block">Select Tone</span>
                  <div className="flex gap-1.5">
                    {AVAILABLE_COLORS.map(c => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setNewCatColor(c)}
                        style={{ backgroundColor: c }}
                        className={`h-4.5 w-4.5 rounded-full border transition-transform ${
                          newCatColor === c ? 'scale-125 border-white/70' : 'border-transparent'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="px-2 py-1 text-[10px] text-white/60 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#764C4E] hover:opacity-90 px-3 py-1 rounded-lg text-[10px] font-bold text-white border border-white/10"
                  >
                    Create
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Categories list */}
          <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id && selectedFilter === 'all';
              const isEditing = editingId === cat.id;

              return (
                <div
                  key={cat.id}
                  className={`group relative flex items-center justify-between rounded-xl px-2.5 py-2 transition-all ${
                    isActive
                      ? 'bg-[#764C4E]/15 border border-white/10 text-white'
                      : 'hover:bg-[#231918]/40 border border-transparent text-white/70 hover:text-white'
                  }`}
                >
                  {isEditing ? (
                    <div className="flex items-center gap-1.5 w-full">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="bg-[#1e1514] text-xs text-white px-2 py-1 rounded border border-white/20 w-full focus:outline-none"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveRename(cat.id);
                          if (e.key === 'Escape') setEditingId(null);
                        }}
                      />
                      <button
                        onClick={() => saveRename(cat.id)}
                        className="p-1 text-green-400 hover:text-green-300"
                      >
                        <Check className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-1 text-red-400 hover:text-red-300"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          onSelectFilter('all');
                          onSelectCategory(cat.id);
                        }}
                        className="flex items-center gap-2.5 flex-1 text-left text-xs font-medium truncate"
                      >
                        <div 
                          className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/5 shrink-0"
                          style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                        >
                          {renderIcon(cat.icon, "h-3 w-3")}
                        </div>
                        <span className="truncate">{cat.name}</span>
                      </button>

                      {/* Display app count */}
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-white/5 text-white/40 group-hover:opacity-0 transition-opacity">
                        {getAppCountForCategory(cat.id)}
                      </span>

                      {/* Hover Controls (Rename, Delete, Order Actions) */}
                      <div className="absolute right-2 opacity-0 group-hover:opacity-100 flex items-center bg-[#332624]/95 pl-1.5 gap-1 transition-opacity">
                        <button
                          onClick={() => onMoveCategory(cat.id, 'up')}
                          className="p-1 text-white/40 hover:text-white"
                          title="Move up"
                        >
                          <ChevronUp className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => onMoveCategory(cat.id, 'down')}
                          className="p-1 text-white/40 hover:text-white"
                          title="Move down"
                        >
                          <ChevronDown className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => startRename(cat)}
                          className="p-1 text-white/40 hover:text-white"
                          title="Rename"
                        >
                          <Edit2 className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => onDeleteCategory(cat.id)}
                          className="p-1 text-white/40 hover:text-white"
                          title="Delete"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* User Information & Reset options at Sidebar bottom */}
      <div className="pt-4 space-y-3">
        <div className="flex items-center gap-3 px-1">
          <div className="w-9 h-9 rounded-full bg-rose-400/15 border border-rose-400/30 flex items-center justify-center font-display font-extrabold text-rose-200">
            {username.slice(0, 2).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-white truncate">Welcome back,</h4>
            <span className="text-[10px] text-white/50 block truncate font-medium">{username}</span>
          </div>
        </div>

        <button
          onClick={onResetAllData}
          className="flex items-center gap-2 text-[10px] text-white/40 hover:text-red-400 transition-colors w-full px-2 py-1.5 rounded-lg hover:bg-red-500/5"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Reset workspace cache</span>
        </button>

        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 text-[9px] text-white/40 font-semibold">
          <ShieldCheck className="h-3 w-3 text-rose-300" />
          <span>Local Device Sandboxed</span>
        </div>
      </div>
    </aside>
  );
}
