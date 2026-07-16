import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Star, Compass, Terminal, Shield } from 'lucide-react';
import BookMarkLogo from './BookMarkLogo';

interface HeroProps {
  onAddClick: () => void;
  onExploreClick: () => void;
}

export default function Hero({ onAddClick, onExploreClick }: HeroProps) {
  // Mock previews of some apps
  const previews = [
    { name: 'Notion', domain: 'notion.so', category: 'Productivity' },
    { name: 'GitHub', domain: 'github.com', category: 'Development' },
    { name: 'Figma', domain: 'figma.com', category: 'Design' },
  ];

  return (
    <section 
      id="bookmark-hero" 
      className="relative overflow-hidden px-6 py-24 md:py-40 bg-[#3d2e2b] flex flex-col items-center justify-center text-center min-h-[92vh]"
    >
      {/* Cinematic lightning / Top center soft white/blue spotlight source */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[3px] bg-gradient-to-r from-transparent via-rose-100/80 to-transparent blur-xs z-10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[650px] w-[850px] rounded-full bg-gradient-to-b from-rose-500/18 via-rose-600/4 to-transparent blur-[140px] pointer-events-none opacity-90" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[450px] w-[550px] rounded-full bg-gradient-to-b from-white/12 via-amber-500/3 to-transparent blur-[100px] pointer-events-none opacity-90" />
      <div className="absolute bottom-10 left-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-rose-500/2 blur-[100px] pointer-events-none" />

      {/* Cinematic floating stars/particles */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 h-1.5 w-1.5 rounded-full bg-white/40 animate-pulse pointer-events-none" style={{ animationDelay: '1s', animationDuration: '3s' }} />
      <div className="absolute top-1/3 right-1/4 h-1 w-1 rounded-full bg-white/30 animate-pulse pointer-events-none" style={{ animationDelay: '3s', animationDuration: '4s' }} />
      <div className="absolute top-1/2 left-[12%] h-1 w-1 rounded-full bg-white/25 animate-pulse pointer-events-none" style={{ animationDelay: '2s', animationDuration: '5s' }} />
      <div className="absolute top-[18%] right-[8%] h-2 w-2 rounded-full bg-rose-300/20 animate-pulse pointer-events-none" style={{ animationDelay: '4s', animationDuration: '3.5s' }} />
      <div className="absolute top-[65%] right-[12%] h-1 w-1 rounded-full bg-white/30 animate-pulse pointer-events-none" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }} />
      <div className="absolute top-[75%] left-[18%] h-1.5 w-1.5 rounded-full bg-rose-300/15 animate-pulse pointer-events-none" style={{ animationDelay: '1.5s', animationDuration: '3.2s' }} />

      <div className="mx-auto max-w-4xl flex flex-col items-center">
        
        {/* Cinematic brand emblem header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: 'spring', damping: 20 }}
          className="mb-8"
        >
          <BookMarkLogo size={96} variant="hero" />
        </motion.div>

        {/* Glowing Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/90 mb-10 shadow-lg backdrop-blur-md"
        >
          <Sparkles className="h-3.5 w-3.5 text-rose-200 animate-pulse" />
          <span className="tracking-wider uppercase text-[10px] font-bold">BookMark Workspace v2</span>
        </motion.div>

        {/* Cinematic Hero Title dominating the view with huge negative space */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-display text-4xl font-extrabold tracking-tighter text-white sm:text-6xl md:text-8xl leading-[0.95] max-w-3xl"
        >
          Your Web Apps.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
            One Organized Space.
          </span>
        </motion.h1>

        {/* High-end support description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mx-auto mt-8 max-w-2xl text-base text-white/60 md:text-lg font-light leading-relaxed tracking-wide"
        >
          Store, organize and instantly launch every website you use. Turn browser chaos into a beautiful personal workspace. Stored entirely inside your local browser storage.
        </motion.p>

        {/* Call to Actions using Vercel styled liquid glass */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row w-full sm:w-auto"
        >
          <button
            id="hero-launch-btn"
            onClick={onExploreClick}
            className="btn-liquid-glass-primary group flex w-full sm:w-64 items-center justify-center gap-2.5 py-4 px-8 text-sm cursor-pointer"
          >
            <span>Launch Workspace</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-rose-200" />
          </button>
          
          <button
            id="hero-add-btn"
            onClick={onAddClick}
            className="btn-liquid-glass w-full sm:w-auto px-8 py-4 text-sm font-semibold flex items-center justify-center gap-2"
          >
            <Sparkles className="h-4 w-4 text-rose-200" />
            <span>Magic Add App</span>
          </button>
        </motion.div>

        {/* Floating Desktop Interface Mockup Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="mt-20 w-full max-w-3xl rounded-3xl border border-white/10 bg-[#231918]/40 p-4 md:p-8 backdrop-blur-xl shadow-2xl relative group hover:border-white/20 transition-colors duration-300 animate-float-slow"
        >
          {/* Subtle reflection overlay */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-50 pointer-events-none" />

          {/* Top Window Actions Bar */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-white/10" />
              <span className="h-3 w-3 rounded-full bg-white/10" />
              <span className="h-3 w-3 rounded-full bg-white/10" />
            </div>
            <div className="flex items-center gap-2 text-[10px] text-white/40 tracking-widest uppercase font-bold">
              <ShieldCheck className="h-3.5 w-3.5 text-rose-200" />
              <span>Offline sandboxed environment</span>
            </div>
          </div>

          {/* Mockup Items */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {previews.map((app, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 rounded-2xl border border-white/5 bg-[#231918]/80 p-4 hover:border-white/25 transition-all duration-300 cursor-pointer"
                onClick={onExploreClick}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3d2e2b] border border-white/10">
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${app.domain}&sz=64`}
                    alt={app.name}
                    className="h-6 w-6 rounded"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="text-left overflow-hidden">
                  <h4 className="font-bold text-xs text-white truncate">{app.name}</h4>
                  <span className="text-[9px] text-white/50 block truncate">{app.domain}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
