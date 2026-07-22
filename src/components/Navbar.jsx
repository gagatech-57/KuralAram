import React, { useState } from 'react';
import { 
  BookOpen, Search, Bookmark, Award, Feather, 
  Menu, Maximize, SlidersHorizontal, X, Palette
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  sidebarOpen, 
  setSidebarOpen, 
  theme, 
  setTheme, 
  fontSizeMultiplier, 
  setFontSizeMultiplier, 
  isZenMode, 
  setIsZenMode,
  bookmarkCount
}) {
  const [showSettings, setShowSettings] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const themesList = [
    { id: 'theme-parchment', name: '📜 பொன்னேடு (Parchment)' },
    { id: 'theme-jasmine', name: '🌼 மல்லிகை மேகம் (Jasmine White)' },
    { id: 'theme-sandalwood', name: '🪵 சந்தனப் பொழில் (Sandalwood Light)' },
    { id: 'theme-lotus', name: '🪷 தாமரைத் தடம் (Lotus Pink)' },
    { id: 'theme-emerald', name: '🍃 மரகதச் சாரல் (Emerald Mint)' },
    { id: 'theme-ocean', name: '🌊 நீலக் கடல் (Ocean Azure)' },
    { id: 'theme-lavender', name: '🌅 மஞ்சு வான் (Lavender Dawn)' },
    { id: 'theme-saffron', name: '☀️ மஞ்சள் வேங்கை (Saffron Sunshine)' },
    { id: 'theme-silk', name: '🕊️ அமைதி வெண்மை (Silk Light)' },
  ];

  return (
    <header className="sticky top-0 z-40 glass-header transition-all duration-300 animate-header-down">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Side: Sidebar Toggle & Brand Logo/Title */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="touch-target p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] active:scale-90 transition-all duration-200"
              title={sidebarOpen ? "Collapse Sidebar" : "Open Sidebar"}
            >
              <Menu className="w-5 h-5 text-[var(--brand-primary)]" />
            </button>

            <div 
              onClick={() => setActiveTab('explore')}
              className="flex items-center gap-2 cursor-pointer group hover-logo-rotate"
            >
              <span className="w-8 h-8 rounded-xl bg-[var(--brand-primary)] text-white font-bold font-tamil-serif flex items-center justify-center text-sm shadow-xs group-hover:scale-110 group-active:scale-95 transition-all duration-300">
                திரு
              </span>
              <div>
                <h1 className="text-base sm:text-lg font-bold font-tamil-serif text-[var(--text-main)] tracking-tight flex items-center gap-1.5">
                  திருக்குறள்
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--bg-surface)] text-[var(--brand-primary)] font-tamil-serif border border-[var(--bg-card-border)] shadow-2xs">
                    1330
                  </span>
                </h1>
              </div>
            </div>
          </div>

          {/* Center: Animated Navigation Pills (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-[var(--bg-surface)] p-1 rounded-xl border border-[var(--bg-card-border)]/60 shadow-inner">
            <button
              onClick={() => setActiveTab('explore')}
              className={`btn-pill active:scale-95 transition-all duration-200 ${activeTab === 'explore' ? 'btn-pill-active shadow-sm' : ''}`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>அதிகாரங்கள்</span>
            </button>

            <button
              onClick={() => setActiveTab('palmleaf')}
              className={`btn-pill active:scale-95 transition-all duration-200 ${activeTab === 'palmleaf' ? 'btn-pill-active shadow-sm' : ''}`}
            >
              <Feather className="w-3.5 h-3.5" />
              <span>ஓலைச்சுவடி</span>
            </button>

            <button
              onClick={() => setActiveTab('search')}
              className={`btn-pill active:scale-95 transition-all duration-200 ${activeTab === 'search' ? 'btn-pill-active shadow-sm' : ''}`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>தேடல்</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`btn-pill active:scale-95 transition-all duration-200 ${activeTab === 'quiz' ? 'btn-pill-active shadow-sm' : ''}`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>புதிர்</span>
            </button>

            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`btn-pill active:scale-95 transition-all duration-200 ${activeTab === 'bookmarks' ? 'btn-pill-active shadow-sm' : ''}`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>சுவடிகள்</span>
              {bookmarkCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[10px] rounded-full bg-[var(--brand-accent)] text-white font-bold animate-badge-pulse">
                  {bookmarkCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Side: Animated Actions (Theme & Settings) */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            
            {/* Theme Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowThemeMenu(!showThemeMenu);
                  if (showSettings) setShowSettings(false);
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[var(--text-main)] active:scale-95 transition-all duration-200 border border-[var(--bg-card-border)] flex items-center gap-1.5 text-xs font-bold font-tamil-serif shadow-2xs ${showThemeMenu ? 'bg-[var(--brand-primary)] text-white' : 'bg-[var(--bg-card)] hover:bg-[var(--bg-surface)]'}`}
                title="Change Theme"
              >
                <Palette className={`w-3.5 h-3.5 ${showThemeMenu ? 'text-white' : 'text-[var(--brand-accent)]'}`} />
                <span className="hidden sm:inline">கருப்பொருள்</span>
              </button>

              {showThemeMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowThemeMenu(false)} 
                  />
                  <div className="absolute right-0 top-full mt-2 w-60 max-w-[calc(100vw-1.5rem)] max-h-[75vh] overflow-y-auto bg-[var(--bg-card)] border-2 border-[var(--bg-card-border)] rounded-xl shadow-2xl p-2 z-50 animate-fade-in font-tamil-serif scrollbar-thin">
                    <p className="text-[11px] font-bold text-[var(--text-muted)] px-2 py-1 border-b border-[var(--bg-card-border)] mb-1 sticky top-0 bg-[var(--bg-card)] z-10">
                      மரபு நிறங்கள் (9 Light Themes)
                    </p>
                    {themesList.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setTheme(t.id);
                          setShowThemeMenu(false);
                        }}
                        className={`w-full text-left px-3 py-2 my-0.5 text-xs rounded-lg flex items-center justify-between active:scale-98 transition-all ${theme === t.id ? 'bg-[var(--brand-primary)] text-white font-bold' : 'hover:bg-[var(--bg-surface)]'}`}
                      >
                        <span>{t.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Settings Popover Button */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowSettings(!showSettings);
                  if (showThemeMenu) setShowThemeMenu(false);
                }}
                className="p-2 rounded-xl text-[var(--text-muted)] border border-[var(--bg-card-border)] bg-[var(--bg-card)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] active:scale-90 transition-all duration-200"
                title="Font size & Options"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>

              {showSettings && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowSettings(false)} 
                  />
                  <div className="absolute right-0 top-full mt-2 w-64 max-w-[calc(100vw-1.5rem)] bg-[var(--bg-card)] border-2 border-[var(--bg-card-border)] rounded-2xl shadow-2xl p-4 space-y-4 z-50 animate-fade-in font-tamil-serif">
                    <div className="flex items-center justify-between border-b border-[var(--bg-card-border)] pb-2">
                      <span className="text-xs font-bold text-[var(--text-main)]">
                        வாசிப்பு அமைப்புகள்
                      </span>
                      <button 
                        onClick={() => setShowSettings(false)}
                        className="text-[var(--text-muted)] hover:text-[var(--text-main)] active:scale-90 transition-transform p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Font Size Slider */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                        <span>எழுத்து அளவு</span>
                        <span className="font-bold text-[var(--brand-primary)]">{Math.round(fontSizeMultiplier * 100)}%</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setFontSizeMultiplier((prev) => Math.max(0.85, prev - 0.1))}
                          className="px-2.5 py-1 text-xs rounded-lg border border-[var(--bg-card-border)] bg-[var(--bg-surface)] hover:bg-[var(--bg-card-border)] active:scale-90 font-bold font-tamil-serif transition-all"
                          title="Font Size Decrease"
                        >
                          அ-
                        </button>

                        <input
                          type="range"
                          min="0.85"
                          max="1.4"
                          step="0.05"
                          value={fontSizeMultiplier}
                          onChange={(e) => setFontSizeMultiplier(parseFloat(e.target.value))}
                          className="w-full accent-[var(--brand-primary)] cursor-pointer"
                        />

                        <button
                          onClick={() => setFontSizeMultiplier((prev) => Math.min(1.4, prev + 0.1))}
                          className="px-2.5 py-1 text-xs rounded-lg border border-[var(--bg-card-border)] bg-[var(--bg-surface)] hover:bg-[var(--bg-card-border)] active:scale-90 font-bold font-tamil-serif transition-all"
                          title="Font Size Increase"
                        >
                          அ+
                        </button>
                      </div>
                    </div>

                    {/* Fullscreen Toggle */}
                    <div className="pt-2 border-t border-[var(--bg-card-border)] flex items-center justify-between text-xs">
                      <span className="font-medium text-[var(--text-muted)]">முழுத்திரை</span>
                      <button
                        onClick={toggleFullscreen}
                        className="p-1.5 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-card-border)] text-[var(--text-main)] active:scale-90 transition-all"
                      >
                        <Maximize className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

          </div>

        </div>

        {/* Mobile Navigation Pills */}
        <div className="flex md:hidden items-center justify-start sm:justify-around py-2 border-t border-[var(--bg-card-border)] text-xs gap-1 font-tamil-serif overflow-x-auto no-scrollbar whitespace-nowrap px-1">
          <button
            onClick={() => setActiveTab('explore')}
            className={`px-3 py-1.5 rounded-xl shrink-0 active:scale-95 transition-all ${activeTab === 'explore' ? 'bg-[var(--brand-primary)] text-white font-bold' : 'text-[var(--text-muted)]'}`}
          >
            அதிகாரங்கள்
          </button>
          <button
            onClick={() => setActiveTab('palmleaf')}
            className={`px-3 py-1.5 rounded-xl shrink-0 active:scale-95 transition-all ${activeTab === 'palmleaf' ? 'bg-[var(--brand-primary)] text-white font-bold' : 'text-[var(--text-muted)]'}`}
          >
            ஓலைச்சுவடி
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`px-3 py-1.5 rounded-xl shrink-0 active:scale-95 transition-all ${activeTab === 'search' ? 'bg-[var(--brand-primary)] text-white font-bold' : 'text-[var(--text-muted)]'}`}
          >
            தேடல்
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 rounded-xl shrink-0 active:scale-95 transition-all ${activeTab === 'quiz' ? 'bg-[var(--brand-primary)] text-white font-bold' : 'text-[var(--text-muted)]'}`}
          >
            புதிர்
          </button>
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`px-3 py-1.5 rounded-xl shrink-0 active:scale-95 transition-all ${activeTab === 'bookmarks' ? 'bg-[var(--brand-primary)] text-white font-bold' : 'text-[var(--text-muted)]'}`}
          >
            சுவடிகள் ({bookmarkCount})
          </button>
        </div>

      </div>
    </header>
  );
}
