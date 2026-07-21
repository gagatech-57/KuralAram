import React, { useState } from 'react';
import { Volume2, Copy, Check, Heart } from 'lucide-react';

export default function KuralCard({ 
  kural, 
  isBookmarked, 
  onToggleBookmark,
  fontSizeMultiplier = 1 
}) {
  const [activeTab, setActiveTab] = useState('muva'); // 'muva', 'sp', 'mk'
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animateBookmark, setAnimateBookmark] = useState(false);

  const handleSpeak = (language = 'ta') => {
    if (!('speechSynthesis' in window)) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const textToSpeak = language === 'ta'
      ? `${kural.line1}. ${kural.line2}.`
      : `${kural.translation}. ${kural.explanationEn}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = language === 'ta' ? 'ta-IN' : 'en-US';
    utterance.rate = 0.85;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = () => {
    const text = `திருக்குறள் ${kural.number}:\n${kural.line1}\n${kural.line2}\n\nஉரை (மு.வ): ${kural.explanationMuVa}\n\nEnglish: ${kural.translation}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBookmarkClick = () => {
    setAnimateBookmark(true);
    onToggleBookmark(kural.number);
    setTimeout(() => setAnimateBookmark(false), 400);
  };

  return (
    <article className="card-modern p-4 sm:p-6 lg:p-8 space-y-5 my-4 sm:my-6 transition-all duration-300 w-full min-w-0">
      
      {/* Top Bar: Kural Number Badge & Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        
        {/* Kural Badge & Chapter Info */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[var(--brand-primary-light)] text-[var(--brand-primary)] font-inter shrink-0">
            குறள் {kural.number}
          </span>
          <span className="text-xs font-medium text-[var(--text-muted)] font-inter truncate max-w-[200px] sm:max-w-xs">
            {kural.paalTa} • {kural.chapterTa}
          </span>
        </div>

        {/* Action Controls: Touch Friendly min 44px targets */}
        <div className="flex items-center gap-1 shrink-0">
          
          {/* Audio TTS Button */}
          <button
            onClick={() => handleSpeak('ta')}
            className={`touch-target p-2 rounded-xl text-xs font-medium transition-all ${
              isPlaying 
                ? 'bg-[var(--brand-primary)] text-white shadow-sm' 
                : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-main)]'
            }`}
            title="தமிழ் குரல் வாசிப்பு (Tamil Speech)"
          >
            <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
          </button>

          {/* English Audio */}
          <button
            onClick={() => handleSpeak('en')}
            className="touch-target px-2.5 py-1 rounded-xl text-xs font-bold font-inter text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-main)] transition-colors"
            title="English Audio Speech"
          >
            EN 🔊
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="touch-target p-2 rounded-xl text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-main)] transition-colors"
            title="நகலெடு (Copy Text)"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>

          {/* Bookmark Heart Button */}
          <button
            onClick={handleBookmarkClick}
            className={`touch-target p-2 rounded-xl transition-transform ${
              animateBookmark ? 'animate-pulse-glow' : ''
            } ${
              isBookmarked 
                ? 'text-rose-600 bg-rose-50 dark:bg-rose-950/40' 
                : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-rose-600'
            }`}
            title={isBookmarked ? "Remove Bookmark" : "Bookmark Kural"}
          >
            <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-current text-rose-600' : ''}`} />
          </button>

        </div>
      </div>

      {/* Main Tamil Kural Section (Line 1 & Line 2 Left-Aligned Together) */}
      <div className="py-2 sm:py-4 flex flex-col items-center text-left w-full min-w-0">
        <div className="inline-block text-left font-tamil-serif font-bold text-[var(--brand-primary)] tracking-tight max-w-full">
          <h2 
            className="fluid-kural-text leading-relaxed break-words"
            style={{ fontSize: `calc(clamp(1.1rem, 3.5vw, 1.85rem) * ${fontSizeMultiplier})` }}
          >
            {kural.line1}
          </h2>
          <h2 
            className="fluid-kural-text leading-relaxed break-words"
            style={{ fontSize: `calc(clamp(1.1rem, 3.5vw, 1.85rem) * ${fontSizeMultiplier})` }}
          >
            {kural.line2}
          </h2>

          {/* Transliteration */}
          {(kural.transliteration1 || kural.transliteration2) && (
            <div className="pt-2 text-xs sm:text-sm italic font-inter text-[var(--text-muted)] opacity-85 text-left break-words">
              <p>"{kural.transliteration1}</p>
              <p>{kural.transliteration2}"</p>
            </div>
          )}
        </div>
      </div>

      {/* Tamil Explanation Tabs & Content */}
      <div className="space-y-3 pt-2">
        <div className="flex flex-wrap items-center gap-1 border-b border-[var(--border-color)] pb-2 text-xs font-inter">
          <button
            onClick={() => setActiveTab('muva')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium min-h-[36px] ${
              activeTab === 'muva' 
                ? 'bg-[var(--brand-primary)] text-white font-bold' 
                : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)]'
            }`}
          >
            மு. வரதராசனார் உரை
          </button>

          <button
            onClick={() => setActiveTab('sp')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium min-h-[36px] ${
              activeTab === 'sp' 
                ? 'bg-[var(--brand-primary)] text-white font-bold' 
                : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)]'
            }`}
          >
            சாலமன் பாப்பையா உரை
          </button>

          {kural.explanationKalaignar && (
            <button
              onClick={() => setActiveTab('mk')}
              className={`px-3 py-1.5 rounded-lg transition-colors font-medium min-h-[36px] ${
                activeTab === 'mk' 
                  ? 'bg-[var(--brand-primary)] text-white font-bold' 
                  : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)]'
              }`}
            >
              மு. கருணாநிதி உரை
            </button>
          )}
        </div>

        {/* Clean Paragraph Tamil Explanation */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-[var(--bg-surface)] text-xs sm:text-sm lg:text-base font-tamil-sans text-[var(--text-main)] leading-relaxed">
          {activeTab === 'muva' && kural.explanationMuVa}
          {activeTab === 'sp' && kural.explanationSalomon}
          {activeTab === 'mk' && kural.explanationKalaignar}
        </div>
      </div>

      {/* English Meaning Separate Card */}
      <div className="p-3.5 sm:p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] space-y-1.5 font-inter">
        <span className="text-[10px] sm:text-[11px] font-bold text-[var(--brand-accent)] uppercase tracking-wider block">
          English Translation & Explanation
        </span>
        <p className="text-xs sm:text-sm font-semibold text-[var(--text-main)] italic leading-snug">
          "{kural.translation}"
        </p>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
          {kural.explanationEn}
        </p>
      </div>

    </article>
  );
}
