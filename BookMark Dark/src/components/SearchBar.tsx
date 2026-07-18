import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search workspaces, categories or domains...',
}: SearchBarProps) {
  return (
    <div id="search-bar-container" className="relative w-full max-w-lg">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <Search className="h-4.5 w-4.5 text-white/30" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-white/5 bg-white/5 py-3 pl-11 pr-11 text-sm font-medium text-white placeholder:text-white/30 focus:border-white/20 focus:bg-white/10 focus:outline-none transition-all duration-200 shadow-inner"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-white/30 hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-4.5 w-4.5" />
        </button>
      )}
    </div>
  );
}
