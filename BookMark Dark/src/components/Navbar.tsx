import React from 'react';
import { Plus, Layers, Globe, Edit3 } from 'lucide-react';
import BookMarkLogo from './BookMarkLogo';
import { renderUserAvatar } from './ProfileAvatar';

interface NavbarProps {
  onAddClick: () => void;
  savedCount: number;
  onNavigateHome: () => void;
  currentView: 'landing' | 'dashboard';
  onNavigateDashboard: () => void;
  username?: string;
  avatarId?: string;
  avatarColor?: string;
  onEditProfileClick?: () => void;
}

export default function Navbar({
  onAddClick,
  savedCount,
  onNavigateHome,
  currentView,
  onNavigateDashboard,
  username,
  avatarId = 'classic-spiky',
  avatarColor = '#FFFFFF',
  onEditProfileClick,
}: NavbarProps) {
  return (
    <nav 
      id="bookmark-navbar"
      className="sticky top-0 z-40 w-full bg-transparent px-6 py-4 backdrop-blur-2xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        
        {/* Brand Logo */}
        <button
          id="nav-logo-btn"
          onClick={onNavigateHome}
          className="flex items-center gap-3 transition-transform duration-200 hover:scale-[1.01] focus:outline-none group cursor-pointer text-left"
        >
          <BookMarkLogo size={38} variant="squircle" className="group-hover:rotate-6 transition-all duration-300" />
          <div className="flex flex-col">
            <span className="font-display text-lg font-black tracking-tighter uppercase text-white leading-none">
              BOOKMARK
            </span>
            <span className="text-[9px] font-bold text-accent-text tracking-wider uppercase leading-none mt-1">
              Personal Workspace
            </span>
          </div>
        </button>

        {/* Dynamic Center/Right Action triggers with Liquid Glass Design */}
        <div className="flex items-center gap-3 md:gap-4">
          
          {currentView === 'landing' ? (
            <button
              id="nav-explore-btn"
              onClick={onNavigateDashboard}
              className="btn-liquid-glass px-5 py-2 text-xs font-semibold"
            >
              <Layers className="h-3.5 w-3.5 mr-1.5 text-accent-text" />
              <span>Launch Workspace</span>
            </button>
          ) : (
            <div className="flex items-center gap-3 md:gap-4">
              <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70">
                <Globe className="h-3.5 w-3.5 text-accent-text" />
                <span>{savedCount} {savedCount === 1 ? 'Web' : 'Webs'} Active</span>
              </div>
              
              <button
                id="nav-add-btn"
                onClick={onAddClick}
                className="btn-liquid-glass px-5 py-2 text-xs font-semibold"
              >
                <Plus className="h-4 w-4 mr-1.5 text-accent-text animate-pulse" />
                <span>Add Web App</span>
              </button>
            </div>
          )}

          {/* Clean minimalist Profile button */}
          {username && onEditProfileClick && (
            <button
              onClick={onEditProfileClick}
              className="relative group flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-1 transition-all duration-300 hover:border-cyan-400 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] cursor-pointer"
              title="Edit Profile"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                {renderUserAvatar(avatarId, avatarColor, 32)}
              </div>
              
              {/* Floating edit pencil badge */}
              <div className="absolute -bottom-0.5 -right-0.5 bg-cyan-500 text-black rounded-full p-0.5 border border-black scale-75 group-hover:scale-100 transition-transform">
                <Edit3 className="h-2 w-2 stroke-[3]" />
              </div>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
