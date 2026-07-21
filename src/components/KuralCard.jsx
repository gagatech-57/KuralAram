import React, { useState } from 'react';
import { Volume2, Bookmark, Copy, Check, Heart, Sparkles, Share2 } from 'lucide-react';

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

  // Dynamic font size calculation (Compact & Elegant reading size)
  const tamilFontSizeClass = fontSizeMultiplier > 1.2 
    ? 'text-xl sm:text-2xl lg:text-3xl' 
    : fontSizeMultiplier < 0.95 
    ? 'text-base sm:text-lg' 
    : 'text-lg sm:text-xl lg:text-2xl';

  return (
    <article className="card-modern p-6 sm:p-8 space-y-6 my-6 transition-all duration-300">
      
      {/* Top Bar: Kural Number Badge & Quick Actions */}
      <div className="flex items-center justify-between">
        
        {/* Kural Badge & Chapter Info */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--brand-primary-light)] text-[var(--brand-primary)] font-inter">
            குறள் {kural.number}
          </span>
          <span className="text-xs font-medium text-[var(--text-muted)] font-inter">
            {kural.paalTa} • {kural.chapterTa}
          </span>
        </div>

        {/* Action Controls: Audio, Copy, Bookmark */}
        <div className="flex items-center gap-1">
          
          {/* Audio TTS Button */}
          <button
            onClick={() => handleSpeak('ta')}
            className={`p-2 rounded-xl text-xs font-medium transition-all ${
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
            className="px-2 py-1 rounded-xl text-xs font-bold font-inter text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-main)] transition-colors"
            title="English Audio Speech"
          >
            EN 🔊
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="p-2 rounded-xl text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-main)] transition-colors"
            title="நகலெடு (Copy Text)"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>

          {/* Bookmark Heart Button */}
          <button
            onClick={handleBookmarkClick}
            className={`p-2 rounded-xl transition-transform ${
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
      <div className="py-4 flex flex-col items-center text-left">
        <div className="inline-block text-left font-tamil-serif font-bold text-[var(--brand-primary)] tracking-tight">
          <h2 className={`${tamilFontSizeClass} leading-relaxed`}>
            {kural.line1}
          </h2>
          <h2 className={`${tamilFontSizeClass} leading-relaxed`}>
            {kural.line2}
          </h2>

          {/* Transliteration */}
          {(kural.transliteration1 || kural.transliteration2) && (
            <div className="pt-3 text-xs sm:text-sm italic font-inter text-[var(--text-muted)] opacity-80 text-left">
              <p>"{kural.transliteration1}</p>
              <p>{kural.transliteration2}"</p>
            </div>
          )}
        </div>
      </div>

      {/* Tamil Explanation Tabs & Content */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-1 border-b border-[var(--border-color)] pb-2 overflow-x-auto text-xs font-inter">
          <button
            onClick={() => setActiveTab('muva')}
            className={`px-3 py-1 rounded-lg transition-colors font-medium ${
              activeTab === 'muva' 
                ? 'bg-[var(--brand-primary)] text-white font-bold' 
                : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)]'
            }`}
          >
            மு. வரதராசனார் உரை
          </button>

          <button
            onClick={() => setActiveTab('sp')}
            className={`px-3 py-1 rounded-lg transition-colors font-medium ${
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
              className={`px-3 py-1 rounded-lg transition-colors font-medium ${
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
        <div className="p-4 rounded-xl bg-[var(--bg-surface)] text-sm sm:text-base font-tamil-sans text-[var(--text-main)] leading-relaxed">
          {activeTab === 'muva' && kural.explanationMuVa}
          {activeTab === 'sp' && kural.explanationSalomon}
          {activeTab === 'mk' && kural.explanationKalaignar}
        </div>
      </div>

      {/* English Meaning Separate Card */}
      <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] space-y-1.5 font-inter">
        <span className="text-[11px] font-bold text-[var(--brand-accent)] uppercase tracking-wider block">
          English Translation & Explanation
        </span>
        <p className="text-sm font-semibold text-[var(--text-main)] italic">
          "{kural.translation}"
        </p>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
          {kural.explanationEn}
        </p>
      </div>

    </article>
  );
}
