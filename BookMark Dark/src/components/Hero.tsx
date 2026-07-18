import React, { Suspense } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import BookMarkLogo from './BookMarkLogo';

// Lazy load React Bits components
const DarkVeil = React.lazy(() => import('./ReactBits/DarkVeil'));
const SplitText = React.lazy(() => import('./ReactBits/SplitText'));
const LogoLoop = React.lazy(() => import('./ReactBits/LogoLoop'));
const StarBorder = React.lazy(() => import('./ReactBits/StarBorder'));
const CardSwap = React.lazy(() => import('./ReactBits/CardSwap'));
const Card = React.lazy(() => import('./ReactBits/CardSwap').then(m => ({ default: m.Card })));

interface HeroProps {
  onAddClick: () => void;
  onExploreClick: () => void;
}

export default function Hero({ onAddClick, onExploreClick }: HeroProps) {
  // Logos loop items - icons only
  const logoItems = [
    { src: 'https://www.google.com/s2/favicons?domain=slack.com&sz=128', alt: 'Slack' },
    { src: 'https://www.google.com/s2/favicons?domain=github.com&sz=128', alt: 'GitHub' },
    { src: 'https://www.google.com/s2/favicons?domain=figma.com&sz=128', alt: 'Figma' },
    { src: 'https://www.google.com/s2/favicons?domain=notion.so&sz=128', alt: 'Notion' },
    { src: 'https://www.google.com/s2/favicons?domain=linear.app&sz=128', alt: 'Linear' },
    { src: 'https://www.google.com/s2/favicons?domain=spotify.com&sz=128', alt: 'Spotify' },
    { src: 'https://www.google.com/s2/favicons?domain=vercel.com&sz=128', alt: 'Vercel' },
    { src: 'https://www.google.com/s2/favicons?domain=discord.com&sz=128', alt: 'Discord' }
  ];

  return (
    <section 
      id="bookmark-hero" 
      className="relative overflow-hidden px-6 py-24 md:py-36 bg-bg-darkest flex flex-col items-center justify-center text-center min-h-[92vh]"
    >
      {/* 1. WebGL DarkVeil background (forced dark theme) */}
      <div className="absolute inset-0 -z-20 opacity-45 pointer-events-none">
        <Suspense fallback={null}>
          <DarkVeil speed={0.45} hueShift={12} noiseIntensity={0.06} scanlineIntensity={0.05} scanlineFrequency={450} warpAmount={0.03} />
        </Suspense>
      </div>

      {/* Cinematic lightning / Top center soft white/blue spotlight source */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[3px] bg-gradient-to-r from-transparent via-accent-text/80 to-transparent blur-xs z-10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[650px] w-[850px] rounded-full bg-gradient-to-b from-accent-primary/20 via-accent-primary-hover/5 to-transparent blur-[140px] pointer-events-none opacity-90" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[450px] w-[550px] rounded-full bg-gradient-to-b from-white/12 via-accent-primary-hover/3 to-transparent blur-[100px] pointer-events-none opacity-90" />
      <div className="absolute bottom-10 left-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-accent-primary/2 blur-[100px] pointer-events-none" />

      {/* Cinematic floating stars/particles */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 h-1.5 w-1.5 rounded-full bg-white/40 animate-pulse pointer-events-none" style={{ animationDelay: '1s', animationDuration: '3s' }} />
      <div className="absolute top-1/3 right-1/4 h-1 w-1 rounded-full bg-white/30 animate-pulse pointer-events-none" style={{ animationDelay: '3s', animationDuration: '4s' }} />
      <div className="absolute top-1/2 left-[12%] h-1 w-1 rounded-full bg-white/25 animate-pulse pointer-events-none" style={{ animationDelay: '2s', animationDuration: '5s' }} />
      <div className="absolute top-[18%] right-[8%] h-2 w-2 rounded-full bg-accent-text/20 animate-pulse pointer-events-none" style={{ animationDelay: '4s', animationDuration: '3.5s' }} />
      <div className="absolute top-[65%] right-[12%] h-1 w-1 rounded-full bg-white/30 animate-pulse pointer-events-none" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }} />
      <div className="absolute top-[75%] left-[18%] h-1.5 w-1.5 rounded-full bg-accent-text/15 animate-pulse pointer-events-none" style={{ animationDelay: '1.5s', animationDuration: '3.2s' }} />

      <div className="mx-auto max-w-4xl flex flex-col items-center z-10">
        
        {/* Cinematic brand emblem header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: 'spring', damping: 20 }}
          className="mb-8"
        >
          <BookMarkLogo size={96} variant="hero" />
        </motion.div>

        {/* Glowing Badge - now borderless and boxless without v2 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 text-white/50 mb-6 select-none"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent-text" />
          <span className="tracking-widest uppercase text-[10px] font-extrabold text-neutral-300">BookMark Workspace</span>
        </motion.div>

        {/* 2. Cinematic Hero Title with high-contrast B&W gradient depth */}
        <div className="flex items-center justify-center select-none py-2">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl md:text-8xl leading-[1.05] max-w-4xl bg-gradient-to-b from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent pb-1 text-center"
          >
            Your Web Apps. One Organized Space.
          </motion.h1>
        </div>

        {/* High-end support description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mx-auto mt-8 max-w-2xl text-base text-white/60 md:text-lg font-light leading-relaxed tracking-wide"
        >
          Store, organize and instantly launch every website you use. Turn browser chaos into a beautiful personal workspace. Stored entirely inside your local browser storage.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row w-full sm:w-auto z-20"
        >
          {/* 3. Fully Curved StarBorder around Launch Workspace button */}
          <Suspense fallback={
            <button
              onClick={onExploreClick}
              className="btn-liquid-glass-primary group flex w-full sm:w-auto items-center justify-center gap-2.5 py-4 px-8 text-sm cursor-pointer"
            >
              <span>Launch Workspace</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-accent-text" />
            </button>
          }>
            <StarBorder
              as="button"
              onClick={onExploreClick}
              borderRadius="9999px"
              className="group p-0 cursor-pointer overflow-hidden shadow-2xl transition-all duration-300 hover:scale-103 w-full sm:w-auto"
              color="#67e8f9"
              speed="4s"
              thickness={1.5}
            >
              <span>Launch Workspace</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-cyan-300" />
            </StarBorder>
          </Suspense>
          
          {/* 4. Magic Add App button (Electric border removed as requested) */}
          <button
            onClick={onAddClick}
            className="bg-black text-white px-8 py-3.5 text-sm font-semibold flex items-center justify-center gap-2 rounded-full border border-neutral-900 hover:text-cyan-300 hover:border-neutral-800 hover:scale-103 transition-all duration-300 shadow-xl w-full sm:w-auto cursor-pointer"
          >
            <Sparkles className="h-4 w-4 text-cyan-300 animate-pulse" />
            <span>Magic Add App</span>
          </button>
        </motion.div>

        {/* 5. CardSwap 3D deck or original Floating Desktop interface Mockup */}
        <div className="mt-16 w-full max-w-3xl flex justify-center items-center h-[340px] relative">
          <Suspense fallback={null}>
            <CardSwap width={450} height={260} cardDistance={45} verticalDistance={45} delay={4000}>
              <Card className="p-6 flex flex-col justify-between border border-neutral-800 bg-neutral-950 text-white w-full h-full rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800">
                    <img src="https://www.google.com/s2/favicons?domain=notion.so&sz=128" className="h-7 w-7 rounded" referrerPolicy="no-referrer" />
                  </div>
                  <span className="text-[9px] font-extrabold text-neutral-500 uppercase tracking-wider bg-neutral-900 px-2.5 py-1 rounded-full border border-neutral-800">Productivity</span>
                </div>
                <div className="text-left mt-4">
                  <h4 className="text-sm font-bold tracking-tight">Notion Workspace</h4>
                  <p className="text-[11px] text-neutral-400 mt-1 leading-normal font-light">A unified wiki where you can write, plan, and organize your files beautifully.</p>
                </div>
              </Card>
              <Card className="p-6 flex flex-col justify-between border border-neutral-800 bg-neutral-950 text-white w-full h-full rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800">
                    <img src="https://www.google.com/s2/favicons?domain=github.com&sz=128" className="h-7 w-7 rounded" referrerPolicy="no-referrer" />
                  </div>
                  <span className="text-[9px] font-extrabold text-neutral-500 uppercase tracking-wider bg-neutral-900 px-2.5 py-1 rounded-full border border-neutral-800">Development</span>
                </div>
                <div className="text-left mt-4">
                  <h4 className="text-sm font-bold tracking-tight">GitHub Repository</h4>
                  <p className="text-[11px] text-neutral-400 mt-1 leading-normal font-light">Host and review software code, manage issue boards, and ship projects with AI assistance.</p>
                </div>
              </Card>
              <Card className="p-6 flex flex-col justify-between border border-neutral-800 bg-neutral-950 text-white w-full h-full rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800">
                    <img src="https://www.google.com/s2/favicons?domain=figma.com&sz=128" className="h-7 w-7 rounded" referrerPolicy="no-referrer" />
                  </div>
                  <span className="text-[9px] font-extrabold text-neutral-500 uppercase tracking-wider bg-neutral-900 px-2.5 py-1 rounded-full border border-neutral-800">Design</span>
                </div>
                <div className="text-left mt-4">
                  <h4 className="text-sm font-bold tracking-tight">Figma Canvas</h4>
                  <p className="text-[11px] text-neutral-400 mt-1 leading-normal font-light">Collaborate on UI vectors, mockups, and layout prototypes inside an interactive board.</p>
                </div>
              </Card>
            </CardSwap>
          </Suspense>
        </div>

        {/* 6. Continuous LogoLoop of active integrations - plain scaling borderless logos */}
        <div className="mt-16 w-full max-w-4xl py-6 border-t border-b border-white/5 select-none overflow-hidden">
          <p className="text-[10px] font-extrabold text-neutral-500 uppercase tracking-widest mb-6">Supported Integrations</p>
          <Suspense fallback={null}>
            <LogoLoop
              logos={logoItems}
              speed={40}
              direction="left"
              logoHeight={36}
              gap={48}
              pauseOnHover={true}
              scaleOnHover={true}
              fadeOut={true}
              fadeOutColor="#020101"
            />
          </Suspense>
        </div>

      </div>
    </section>
  );
}
