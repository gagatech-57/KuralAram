import React, { useState } from 'react';
import { 
  BookOpen, Search, Bookmark, Award, Feather, 
  Menu, Sun, Moon, Maximize, Minimize, Eye, 
  Type, SlidersHorizontal, ChevronRight, X
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  sidebarOpen, 
  setSidebarOpen, 
  darkMode, 
  setDarkMode, 
  fontSizeMultiplier, 
  setFontSizeMultiplier, 
  isZenMode, 
  setIsZenMode,
  bookmarkCount
}) {
  const [showSettings, setShowSettings] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 glass-header border-b border-[var(--border-color)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Side: Sidebar Toggle & Brand Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] transition-colors"
              title={sidebarOpen ? "Collapse Chapters Sidebar" : "Open Chapters Sidebar"}
            >
              <Menu className="w-5 h-5" />
            </button>

            <div 
              onClick={() => setActiveTab('explore')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <span className="w-8 h-8 rounded-xl bg-[var(--brand-primary)] text-white font-bold font-tamil-serif flex items-center justify-center text-sm shadow-sm group-hover:scale-105 transition-transform">
                கு
              </span>
              <div>
                <h1 className="text-base sm:text-lg font-bold font-tamil-serif text-[var(--text-main)] tracking-tight flex items-center gap-1.5">
                  திருக்குறள்
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--brand-accent-light)] text-[var(--brand-accent)] font-inter">
                    1330
                  </span>
                </h1>
              </div>
            </div>
          </div>

          {/* Center: Modern Pill Buttons (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-[var(--bg-surface)] p-1 rounded-full border border-[var(--border-color)]">
            <button
              onClick={() => setActiveTab('explore')}
              className={`btn-pill ${activeTab === 'explore' ? 'btn-pill-active' : ''}`}
            >
              <span>அதிகாரங்கள்</span>
            </button>

            <button
              onClick={() => setActiveTab('palmleaf')}
              className={`btn-pill ${activeTab === 'palmleaf' ? 'btn-pill-active' : ''}`}
            >
              <span>வாசிப்பு</span>
            </button>

            <button
              onClick={() => setActiveTab('search')}
              className={`btn-pill ${activeTab === 'search' ? 'btn-pill-active' : ''}`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>தேடல்</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`btn-pill ${activeTab === 'quiz' ? 'btn-pill-active' : ''}`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>புதிர்</span>
            </button>

            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`btn-pill ${activeTab === 'bookmarks' ? 'btn-pill-active' : ''}`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>சுவடிகள்</span>
              {bookmarkCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 text-[10px] rounded-full bg-[var(--brand-accent)] text-white font-bold">
                  {bookmarkCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Side: Quick Settings & Customization */}
          <div className="flex items-center gap-1.5">
            
            {/* Reading Mode (Zen Mode) Button */}
            <button
              onClick={() => setIsZenMode(!isZenMode)}
              className={`p-2 rounded-xl transition-all ${isZenMode ? 'bg-[var(--brand-primary)] text-white' : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-main)]'}`}
              title="Zen Focus Reading Mode"
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* Dark Mode Toggle Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-main)] transition-colors"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Typography & Settings Popover Toggle */}
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-xl text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-main)] transition-colors"
                title="Font size & settings"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>

              {/* Settings Dropdown */}
              {showSettings && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-2xl p-4 space-y-4 z-50 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
                    <span className="text-xs font-bold font-inter text-[var(--text-main)]">
                      வாசிப்பு அமைப்புகள் (Reading Settings)
                    </span>
                    <button 
                      onClick={() => setShowSettings(false)}
                      className="text-[var(--text-muted)] hover:text-[var(--text-main)]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Font Size Slider */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-inter">
                      <span className="flex items-center gap-1"><Type className="w-3.5 h-3.5" /> எழுத்து அளவு</span>
                      <span className="font-bold text-[var(--brand-primary)]">{Math.round(fontSizeMultiplier * 100)}%</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setFontSizeMultiplier((prev) => Math.max(0.85, prev - 0.1))}
                        className="px-2 py-1 text-xs rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--border-color)] font-bold"
                      >
                        A-
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
                        className="px-2 py-1 text-xs rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--border-color)] font-bold"
                      >
                        A+
                      </button>
                    </div>
                  </div>

                  {/* Fullscreen Toggle */}
                  <div className="pt-2 border-t border-[var(--border-color)] flex items-center justify-between">
                    <span className="text-xs font-medium text-[var(--text-muted)]">முழுத்திரை (Fullscreen)</span>
                    <button
                      onClick={toggleFullscreen}
                      className="p-1.5 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--border-color)] text-[var(--text-main)]"
                    >
                      <Maximize className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Mobile Navigation Pills */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-[var(--border-color)] text-xs gap-1">
          <button
            onClick={() => setActiveTab('explore')}
            className={`px-3 py-1.5 rounded-full ${activeTab === 'explore' ? 'bg-[var(--brand-primary)] text-white font-medium' : 'text-[var(--text-muted)]'}`}
          >
            அதிகாரங்கள்
          </button>
          <button
            onClick={() => setActiveTab('palmleaf')}
            className={`px-3 py-1.5 rounded-full ${activeTab === 'palmleaf' ? 'bg-[var(--brand-primary)] text-white font-medium' : 'text-[var(--text-muted)]'}`}
          >
            வாசிப்பு
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`px-3 py-1.5 rounded-full ${activeTab === 'search' ? 'bg-[var(--brand-primary)] text-white font-medium' : 'text-[var(--text-muted)]'}`}
          >
            தேடல்
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 rounded-full ${activeTab === 'quiz' ? 'bg-[var(--brand-primary)] text-white font-medium' : 'text-[var(--text-muted)]'}`}
          >
            புதிர்
          </button>
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`px-3 py-1.5 rounded-full ${activeTab === 'bookmarks' ? 'bg-[var(--brand-primary)] text-white font-medium' : 'text-[var(--text-muted)]'}`}
          >
            சுவடிகள் ({bookmarkCount})
          </button>
        </div>

      </div>
    </header>
  );
}
