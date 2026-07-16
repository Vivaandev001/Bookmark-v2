import React from 'react';
import { Sparkles, FilterX, HelpCircle } from 'lucide-react';
import BookMarkLogo from './BookMarkLogo';

interface EmptyStateProps {
  onAddClick: () => void;
  isSearchOrFilterActive: boolean;
  onResetFilters?: () => void;
}

export default function EmptyState({
  onAddClick,
  isSearchOrFilterActive,
  onResetFilters,
}: EmptyStateProps) {
  return (
    <div id="bookmark-empty-state" className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5 px-6 py-20 text-center max-w-2xl mx-auto backdrop-blur-md">
      {isSearchOrFilterActive ? (
        <>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-white border border-white/10 mb-6">
            <FilterX className="h-6 w-6 text-cyan-200" />
          </div>
          <h3 className="font-display text-xl font-bold text-white tracking-tight">
            No Saved Apps Match Filters
          </h3>
          <p className="mt-2 text-sm text-white/60 max-w-md font-light leading-relaxed">
            Adjust your search parameters or select a different sidebar category to view your applications.
          </p>
          {onResetFilters && (
            <button
              onClick={onResetFilters}
              className="mt-6 btn-liquid-glass px-5 py-2.5 text-xs font-semibold"
            >
              Reset Filters
            </button>
          )}
        </>
      ) : (
        <>
          <div className="flex justify-center mb-6">
            <BookMarkLogo size={64} variant="squircle" className="animate-pulse" />
          </div>
          <h3 className="font-display text-2xl font-bold text-white tracking-tight">
            Build Your Personal Launcher Library
          </h3>
          <p className="mt-3 text-sm text-white/60 max-w-md font-light leading-relaxed">
            Every website you save will render as an interactive, beautifully framed desktop application icon. Start building your workspace launcher.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onAddClick}
              className="btn-liquid-glass px-6 py-3.5 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Sparkles className="h-4 w-4 text-cyan-200" />
              <span>Magic Add Web App</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
