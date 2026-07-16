import React from 'react';
import { Plus, Layers, Globe, Shield } from 'lucide-react';
import BookMarkLogo from './BookMarkLogo';

interface NavbarProps {
  onAddClick: () => void;
  savedCount: number;
  onNavigateHome: () => void;
  currentView: 'landing' | 'dashboard';
  onNavigateDashboard: () => void;
  username?: string;
}

export default function Navbar({
  onAddClick,
  savedCount,
  onNavigateHome,
  currentView,
  onNavigateDashboard,
  username,
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
            <span className="text-[9px] font-bold text-rose-200 tracking-wider uppercase leading-none mt-1">
              v2 Workspace
            </span>
          </div>
        </button>

        {/* Dynamic Center/Right Action triggers with Liquid Glass Design */}
        <div className="flex items-center gap-4">
          
          {currentView === 'landing' ? (
            <button
              id="nav-explore-btn"
              onClick={onNavigateDashboard}
              className="btn-liquid-glass px-5 py-2 text-xs font-semibold"
            >
              <Layers className="h-3.5 w-3.5 mr-1.5 text-rose-200" />
              <span>Launch Workspace</span>
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70">
                <Globe className="h-3.5 w-3.5 text-rose-200" />
                <span>{savedCount} {savedCount === 1 ? 'Workspace' : 'Workspaces'} Active</span>
              </div>
              
              <button
                id="nav-add-btn"
                onClick={onAddClick}
                className="btn-liquid-glass px-5 py-2 text-xs font-semibold"
              >
                <Plus className="h-4 w-4 mr-1.5 text-rose-200 animate-pulse" />
                <span>Add Web App</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
