import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, User } from 'lucide-react';
import BookMarkLogo from './BookMarkLogo';

interface WelcomePopupProps {
  isOpen: boolean;
  onSave: (name: string) => void;
}

export default function WelcomePopup({ isOpen, onSave }: WelcomePopupProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim());
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="welcome-popup" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#3d2e2b]/90 backdrop-blur-xl"
          />

          {/* Cinematic lighting spots behind welcome card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[300px] w-[300px] rounded-full bg-rose-400/5 blur-[80px]" />

          {/* Container Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#231918]/80 p-8 shadow-2xl backdrop-blur-md text-center"
          >
            {/* Visual Header Icon */}
            <div className="mx-auto flex justify-center mb-6">
              <BookMarkLogo size={72} variant="squircle" className="animate-float-slow" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-400/20 bg-rose-400/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-rose-200 mb-4">
                <Sparkles className="h-3 w-3" />
                <span>Initialize Workspace</span>
              </span>
              
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-white">
                Welcome to BookMark
              </h2>
              <p className="mt-2.5 text-sm text-white/60 font-light leading-relaxed px-2">
                Let's customize your personal workspace launcher. What should we call you?
              </p>
            </motion.div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-left">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <User className="h-4 w-4 text-white/40" />
                </div>
                <input
                  type="text"
                  required
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name or handle..."
                  maxLength={20}
                  className="w-full rounded-full border border-white/10 bg-white/5 py-4 pl-11 pr-4 text-sm font-medium text-white placeholder:text-white/30 focus:border-white/30 focus:bg-white/10 focus:outline-none transition-all duration-200"
                />
              </div>

              <button
                type="submit"
                disabled={!name.trim()}
                className="w-full btn-liquid-glass py-4 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] font-semibold text-sm transition-all"
              >
                <span>Launch Workspace</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-6 text-[10px] text-white/40">
              No cloud servers. Zero analytics. Your data stays on this device.
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
