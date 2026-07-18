import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, User, Palette, Sparkles } from 'lucide-react';
import { AVATAR_OPTIONS, AVATAR_COLORS, renderUserAvatar } from './ProfileAvatar';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUsername: string;
  currentAvatarId: string;
  currentAvatarColor: string;
  onSave: (username: string, avatarId: string, avatarColor: string) => void;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  currentUsername,
  currentAvatarId,
  currentAvatarColor,
  onSave,
}: EditProfileModalProps) {
  const [username, setUsername] = useState(currentUsername);
  const [selectedAvatarId, setSelectedAvatarId] = useState(currentAvatarId);
  const [selectedColor, setSelectedColor] = useState(currentAvatarColor);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSave(username.trim(), selectedAvatarId, selectedColor);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#161618] to-[#0D0D0E] p-6 text-white shadow-2xl z-10"
          >
            {/* Top Close trigger */}
            <button
              onClick={onClose}
              className="absolute right-5 top-5 rounded-full p-1.5 text-white/40 hover:bg-white/5 hover:text-white transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-extrabold flex items-center gap-1.5 mb-1">
                <Sparkles className="h-3.5 w-3.5" />
                Customize Workspace Profile
              </span>
              <h2 className="font-display text-2xl font-bold tracking-tight">Edit Identity</h2>
              <p className="text-xs text-white/50 mt-1">Configure your personal presentation, select a minimalist custom-drawn avatar, and pick your accent color.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Live Preview Panel */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="relative shrink-0">
                  {renderUserAvatar(selectedAvatarId, selectedColor, 64)}
                  <div className="absolute -bottom-1 -right-1 bg-cyan-500 text-black rounded-full p-1 border border-black">
                    <User className="h-3 w-3 stroke-[2.5]" />
                  </div>
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold block mb-0.5">Live Profile Avatar</span>
                  <div className="text-base font-bold text-white truncate">{username || 'Vivaan'}</div>
                  <div className="text-[10px] text-cyan-400 font-mono mt-0.5">
                    {AVATAR_OPTIONS.find(a => a.id === selectedAvatarId)?.name || 'Default Avatar'}
                  </div>
                </div>
              </div>

              {/* Username Input */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider text-white/50 font-extrabold flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-white/40" />
                  Username
                </label>
                <input
                  type="text"
                  required
                  maxLength={20}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your name..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white font-medium placeholder-white/25 focus:border-cyan-500/40 focus:bg-white/[0.05] focus:outline-none transition-all"
                />
              </div>

              {/* Minimalist prebuilt icons selection list */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider text-white/50 font-extrabold flex items-center gap-1.5">
                  <Palette className="h-3.5 w-3.5 text-white/40" />
                  Select Minimalist Avatar (10 Hand-drawn styles)
                </label>
                <div className="grid grid-cols-5 gap-3 max-h-[140px] overflow-y-auto pr-1">
                  {AVATAR_OPTIONS.map((opt) => {
                    const isSelected = selectedAvatarId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedAvatarId(opt.id)}
                        className={`relative rounded-xl p-2 transition-all flex items-center justify-center cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-500/10 border-2 border-cyan-500'
                            : 'bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] hover:border-white/10'
                        }`}
                        title={opt.name}
                      >
                        {/* Render avatar inside selection grid with fixed theme background */}
                        <div className="w-10 h-10">
                          {opt.render(selectedColor, AVATAR_COLORS.find(c => c.value === selectedColor)?.isDark ? '#FFFFFF' : '#121212')}
                        </div>
                        {isSelected && (
                          <div className="absolute -top-1 -right-1 bg-cyan-500 text-black rounded-full p-0.5 border border-black">
                            <Check className="h-2 w-2 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Avatar Color choices */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-white/50 font-extrabold block">
                  Select Badge Accent Color
                </span>
                <div className="flex flex-wrap gap-2">
                  {AVATAR_COLORS.map((color) => {
                    const isSelected = selectedColor === color.value;
                    return (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setSelectedColor(color.value)}
                        className={`h-7 w-7 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                          isSelected 
                            ? 'scale-110 border-white ring-2 ring-cyan-400/50' 
                            : 'border-white/10 hover:scale-105 hover:border-white/30'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      >
                        {isSelected && (
                          <Check className={`h-3 w-3 stroke-[3] ${color.isDark ? 'text-white' : 'text-neutral-900'}`} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-white/50 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 bg-cyan-500 hover:bg-cyan-400 active:bg-cyan-600 px-5 py-2 rounded-xl text-xs font-bold text-black shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  Save Identity
                </button>
              </div>

            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
