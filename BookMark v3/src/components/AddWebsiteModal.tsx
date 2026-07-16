import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Loader2, Globe, FileText, Bookmark, CheckCircle2, Star } from 'lucide-react';
import { AppCardData, CustomCategory } from '../types';

interface AddWebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (app: Omit<AppCardData, 'id' | 'createdAt'>) => void;
  onEditSave: (updated: AppCardData) => void;
  editingApp?: AppCardData | null;
  categories: CustomCategory[];
}

export default function AddWebsiteModal({
  isOpen,
  onClose,
  onAdd,
  onEditSave,
  editingApp,
  categories,
}: AddWebsiteModalProps) {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState('');
  const [category, setCategory] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionStatus, setExtractionStatus] = useState<'idle' | 'success' | 'failed'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Pre-fill fields if we're in edit mode, otherwise clear them
  useEffect(() => {
    if (isOpen) {
      if (editingApp) {
        setUrl(editingApp.url);
        setName(editingApp.name);
        setDescription(editingApp.description || '');
        setLogo(editingApp.logo || '');
        setCategory(editingApp.category);
        setIsFavorite(!!editingApp.isFavorite);
        setExtractionStatus('idle');
        setErrorMessage('');
      } else {
        setUrl('');
        setName('');
        setDescription('');
        setLogo('');
        setCategory(categories[0]?.id || 'Productivity');
        setIsFavorite(false);
        setIsExtracting(false);
        setExtractionStatus('idle');
        setErrorMessage('');
      }
    }
  }, [isOpen, editingApp, categories]);

  // Normalize URLs helper
  const cleanUrl = (input: string) => {
    let target = input.trim();
    if (!target) return '';
    if (!/^https?:\/\//i.test(target)) {
      target = 'https://' + target;
    }
    return target;
  };

  // Scraping metadata using the Express scraper proxy
  const handleExtractMetadata = async () => {
    const targetUrl = cleanUrl(url);
    if (!targetUrl) {
      setErrorMessage('Please enter a website URL first.');
      return;
    }

    setIsExtracting(true);
    setExtractionStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch(`/api/extract?url=${encodeURIComponent(targetUrl)}`);
      if (!response.ok) {
        throw new Error('Scraper failure');
      }

      const data = await response.json();
      setName(data.name || '');
      setDescription(data.description || '');
      setLogo(data.logo || '');
      setExtractionStatus('success');

      // Attempt matching category smartly based on domain or names
      const lowerUrl = targetUrl.toLowerCase();
      const lowerName = (data.name || '').toLowerCase();

      // Look for custom matches
      const matchDev = categories.find(c => c.name.toLowerCase().match(/dev|code|tech/));
      const matchDesign = categories.find(c => c.name.toLowerCase().match(/design|figma|palette/));
      const matchProductivity = categories.find(c => c.name.toLowerCase().match(/work|prod|task/));
      const matchSocial = categories.find(c => c.name.toLowerCase().match(/social|chat|twitter/));
      const matchMusic = categories.find(c => c.name.toLowerCase().match(/music|ent|play/));

      if ((lowerUrl.includes('github') || lowerUrl.includes('npm') || lowerUrl.includes('stackoverflow')) && matchDev) {
        setCategory(matchDev.id);
      } else if ((lowerUrl.includes('figma') || lowerUrl.includes('dribbble') || lowerName.includes('design')) && matchDesign) {
        setCategory(matchDesign.id);
      } else if ((lowerUrl.includes('notion') || lowerUrl.includes('linear') || lowerUrl.includes('trello')) && matchProductivity) {
        setCategory(matchProductivity.id);
      } else if ((lowerUrl.includes('twitter') || lowerUrl.includes('facebook') || lowerUrl.includes('linkedin')) && matchSocial) {
        setCategory(matchSocial.id);
      } else if ((lowerUrl.includes('spotify') || lowerUrl.includes('youtube') || lowerUrl.includes('netflix')) && matchMusic) {
        setCategory(matchMusic.id);
      }

    } catch (error: any) {
      console.warn('Backend extract failed, trying clientside fallback', error);
      try {
        const urlObj = new URL(targetUrl);
        const domain = urlObj.hostname.replace(/^www\./i, '');
        const fallbackName = domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1);
        
        setName(fallbackName);
        setDescription(`Saved workspace launchpad for ${domain}.`);
        setLogo(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);
        setExtractionStatus('success');
      } catch {
        setExtractionStatus('failed');
        setErrorMessage('Automatic scraping failed. Please enter details manually.');
      }
    } finally {
      setIsExtracting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUrl = cleanUrl(url);
    if (!finalUrl) {
      setErrorMessage('Valid website URL is required.');
      return;
    }
    if (!name.trim()) {
      setErrorMessage('Application Name is required.');
      return;
    }

    let finalLogo = logo.trim();
    if (!finalLogo) {
      try {
        const urlObj = new URL(finalUrl);
        finalLogo = `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=128`;
      } catch {
        finalLogo = 'https://www.google.com/s2/favicons?domain=google.com&sz=128';
      }
    }

    if (editingApp) {
      onEditSave({
        ...editingApp,
        url: finalUrl,
        name: name.trim(),
        description: description.trim(),
        logo: finalLogo,
        category,
        isFavorite,
      });
    } else {
      onAdd({
        url: finalUrl,
        name: name.trim(),
        description: description.trim(),
        logo: finalLogo,
        category,
        isFavorite,
      });
    }

    onClose();
  };

  const handleUrlBlur = () => {
    if (url.trim() && !name) {
      handleExtractMetadata();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="add-website-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#3d2e2b]/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#231918]/90 p-6 md:p-8 shadow-2xl z-10 overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white border border-white/10">
                  <Bookmark className="h-5 w-5 text-rose-200" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-white tracking-tight">
                    {editingApp ? 'Modify Web App' : 'Add Website App'}
                  </h2>
                  <p className="text-xs text-white/40 font-light">
                    {editingApp ? 'Update your customized card details' : 'Store and organize website links like desktop apps'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/5 text-white/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mt-4 rounded-xl border border-red-500/10 bg-red-500/5 p-3 text-xs text-red-200">
                {errorMessage}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              
              {/* URL */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-white/60 mb-1.5 flex items-center justify-between">
                  <span>Website URL</span>
                  <span className="text-[9px] text-white/30 lowercase">e.g. linear.app</span>
                </label>
                <div className="relative flex gap-2">
                  <div className="relative flex-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                      <Globe className="h-4 w-4 text-white/30" />
                    </div>
                    <input
                      type="text"
                      required
                      value={url}
                      onBlur={handleUrlBlur}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full rounded-full border border-white/5 bg-white/5 py-3 pl-10 pr-4 text-sm font-medium text-white placeholder:text-white/20 focus:border-white/20 focus:outline-none transition-all duration-200 shadow-inner"
                    />
                  </div>
                  {!editingApp && (
                    <button
                      type="button"
                      onClick={handleExtractMetadata}
                      disabled={isExtracting || !url.trim()}
                      className="rounded-full bg-white/5 border border-white/10 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/10 disabled:opacity-50 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      {isExtracting ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin text-white" />
                      ) : (
                        <Sparkles className="h-3.5 w-3.5 text-rose-200" />
                      )}
                      <span>Autofill</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Loader */}
              {isExtracting && (
                <div className="flex items-center justify-center gap-2 py-2 text-xs text-white/50">
                  <Loader2 className="h-4 w-4 animate-spin text-rose-200" />
                  <span>Scraping favicon & page title...</span>
                </div>
              )}

              <div className="space-y-4 pt-1">
                {extractionStatus === 'success' && (
                  <div className="flex items-center gap-2 text-xs text-emerald-200 bg-emerald-500/5 rounded-xl border border-emerald-500/10 p-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Scraped successfully! Feel free to modify below.</span>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-white/60 mb-1.5 flex items-center gap-1">
                    <FileText className="h-3.5 w-3.5 text-white/30" />
                    <span>Application Label</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Linear Workspace"
                    className="w-full rounded-xl border border-white/5 bg-white/5 py-3 px-4 text-sm font-medium text-white placeholder:text-white/20 focus:border-white/20 focus:outline-none transition-all duration-200"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-white/60 mb-1.5">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Short description of this app launcher..."
                    className="w-full rounded-xl border border-white/5 bg-white/5 py-3 px-4 text-sm font-medium text-white placeholder:text-white/20 focus:border-white/20 focus:outline-none transition-all duration-200 resize-none"
                  />
                </div>

                {/* Row Grid for Logo & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category Selection */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-white/60 mb-1.5">
                      Target Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-xl border border-white/5 bg-[#231918] py-3 px-4 text-sm font-medium text-white focus:border-white/20 focus:outline-none transition-all duration-200 cursor-pointer"
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id} className="bg-[#231918] text-white">
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Icon URL */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-white/60 mb-1.5">
                      Favicon/Logo URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={logo}
                        onChange={(e) => setLogo(e.target.value)}
                        placeholder="Automatic"
                        className="flex-1 rounded-xl border border-white/5 bg-white/5 py-3 px-4 text-sm font-medium text-white placeholder:text-white/20 focus:border-white/20 focus:outline-none transition-all duration-200"
                      />
                      {logo && (
                        <div className="h-12 w-12 shrink-0 border border-white/5 bg-white/5 rounded-xl flex items-center justify-center p-1">
                          <img
                            src={logo}
                            alt="Favicon"
                            className="h-7 w-7 object-contain rounded"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://www.google.com/s2/favicons?domain=google.com&sz=128`;
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Favorite Toggle Checkbox */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      isFavorite 
                        ? 'border-yellow-400/20 bg-yellow-400/5 text-yellow-300' 
                        : 'border-white/5 bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Star className={`h-4 w-4 ${isFavorite ? 'fill-yellow-300' : ''}`} />
                    <span>{isFavorite ? 'Favorite Workspace Active' : 'Mark as Favorite'}</span>
                  </button>
                </div>
              </div>

              {/* Submit / Cancel Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 text-xs font-bold text-white/60 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-liquid-glass px-6 py-3 text-xs font-bold"
                >
                  {editingApp ? 'Save Redesign Changes' : 'Save App Card'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
