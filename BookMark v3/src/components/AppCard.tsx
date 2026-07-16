import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ExternalLink, Trash2, ArrowUpRight, Star, MoreVertical, 
  Copy, Edit3, Calendar, Eye, MoveHorizontal, Check
} from 'lucide-react';
import { AppCardData, CustomCategory } from '../types';

interface AppCardProps {
  key?: string;
  app: AppCardData;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onOpenApp: (app: AppCardData) => void;
  onDuplicate: (app: AppCardData) => void;
  onEdit: (app: AppCardData) => void;
  categories: CustomCategory[];
  onMoveCategory: (appId: string, targetCatId: string) => void;
}

export default function AppCard({
  app,
  onDelete,
  onToggleFavorite,
  onOpenApp,
  onDuplicate,
  onEdit,
  categories,
  onMoveCategory,
}: AppCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showMoveSubmenu, setShowMoveSubmenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
        setShowMoveSubmenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format last opened time
  const formatLastOpened = (timestamp?: number) => {
    if (!timestamp) return 'Never launched';
    const diffMs = Date.now() - timestamp;
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return new Date(timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  // Find Category object matching category name or ID
  const categoryObj = categories.find(c => c.id === app.category || c.name === app.category);
  const categoryName = categoryObj ? categoryObj.name : app.category;
  const categoryColor = categoryObj ? categoryObj.color : '#E1D0C9';

  let displayDomain = '';
  try {
    const urlObj = new URL(app.url);
    displayDomain = urlObj.hostname.replace(/^www\./i, '');
  } catch {
    displayDomain = app.url;
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col justify-between rounded-3xl border border-white/5 bg-[#231918]/40 p-5 hover:bg-[#2e2120]/75 hover:border-white/15 transition-all duration-300 shadow-2xl overflow-hidden min-h-[220px]"
    >
      {/* Liquid glass subtle reflection glow */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400/20 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div>
        {/* Card Header Row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          
          {/* Favicon frame */}
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#3d2e2b] border border-white/5 shadow-inner shrink-0 group-hover:border-white/20 transition-all duration-300">
            <img
              src={app.logo || `https://www.google.com/s2/favicons?domain=${displayDomain}&sz=128`}
              alt={app.name}
              className="h-7 w-7 rounded-md object-contain"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://www.google.com/s2/favicons?domain=${displayDomain}&sz=128`;
              }}
            />
          </div>

          {/* Quick Actions Panel */}
          <div className="flex items-center gap-1.5 z-10">
            
            {/* Toggle Favorite Star Button */}
            <button
              onClick={() => onToggleFavorite(app.id)}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                app.isFavorite 
                  ? 'border-yellow-400/20 bg-yellow-400/10 text-yellow-300' 
                  : 'border-transparent text-white/40 hover:text-white/80 hover:bg-white/5'
              }`}
              title={app.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            >
              <Star className={`h-4.5 w-4.5 ${app.isFavorite ? 'fill-yellow-300' : ''}`} />
            </button>

            {/* Three Dot Options Popover */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1.5 rounded-lg border border-transparent text-white/40 hover:text-white/80 hover:bg-white/5 cursor-pointer"
                title="Options"
              >
                <MoreVertical className="h-4.5 w-4.5" />
              </button>

              {/* Popover Card */}
              <AnimatePresence>
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 5 }}
                    className="absolute right-0 mt-1 w-48 rounded-xl border border-white/10 bg-[#231918] p-1.5 shadow-2xl z-30 backdrop-blur-md"
                  >
                    <button
                      onClick={() => {
                        onEdit(app);
                        setShowMenu(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-white/80 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      <span>Edit details</span>
                    </button>

                    <button
                      onClick={() => {
                        onDuplicate(app);
                        setShowMenu(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-white/80 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      <span>Duplicate card</span>
                    </button>

                    {/* Move Category toggle */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowMoveSubmenu(!showMoveSubmenu)}
                        className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-white/80 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <MoveHorizontal className="h-3.5 w-3.5" />
                          <span>Move Category</span>
                        </span>
                        <span className="text-[10px] opacity-40">&gt;</span>
                      </button>

                      {showMoveSubmenu && (
                        <div className="absolute right-full mr-1 top-0 w-44 rounded-xl border border-white/10 bg-[#2e2120] p-1 shadow-2xl z-30">
                          {categories.map(cat => (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => {
                                onMoveCategory(app.id, cat.id);
                                setShowMenu(false);
                                setShowMoveSubmenu(false);
                              }}
                              className="flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-left text-[11px] font-medium text-white/80 hover:bg-white/5 hover:text-white transition-colors"
                            >
                              <span>{cat.name}</span>
                              {app.category === cat.id && <Check className="h-3 w-3 text-rose-200" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="my-1 border-t border-white/5" />

                    <button
                      onClick={() => {
                        onDelete(app.id);
                        setShowMenu(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Delete card</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Title, Category tag & link */}
        <div className="mb-2">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-display text-base font-extrabold text-white tracking-tight line-clamp-1 group-hover:text-rose-200 transition-colors">
              {app.name}
            </h3>
            
            {/* Soft border tag matching color */}
            <span 
              className="rounded-full px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase border"
              style={{ borderColor: `${categoryColor}25`, backgroundColor: `${categoryColor}08`, color: categoryColor }}
            >
              {categoryName}
            </span>
          </div>

          <a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onOpenApp(app)}
            className="inline-flex items-center gap-1 mt-0.5 text-xs text-white/40 hover:text-white/80 hover:underline transition-colors break-all font-mono"
          >
            <span>{displayDomain}</span>
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>

        {/* Brief description */}
        <p className="text-xs text-white/60 leading-relaxed line-clamp-2 mb-5 font-light">
          {app.description || `Workspace card for ${app.name}.`}
        </p>
      </div>

      {/* Stats/Information Row */}
      <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[10px] text-white/40 font-medium">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-white/30" />
            <span>{formatLastOpened(app.lastOpened)}</span>
          </span>
          {app.clickCount ? (
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3 text-white/30" />
              <span>{app.clickCount} visits</span>
            </span>
          ) : null}
        </div>

        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onOpenApp(app)}
          className="flex items-center gap-1 text-white hover:text-rose-200 transition-colors font-bold"
        >
          <span>Launch</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </motion.div>
  );
}
