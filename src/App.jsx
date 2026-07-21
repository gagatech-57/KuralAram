import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SidebarDrawer from './components/SidebarDrawer';
import ChapterBrowser from './components/ChapterBrowser';
import PalmLeafReader from './components/PalmLeafReader';
import SearchView from './components/SearchView';
import ThirukkuralQuiz from './components/ThirukkuralQuiz';
import BookmarksView from './components/BookmarksView';
import Footer from './components/Footer';
import thirukuralData from './data/thirukural.json';

export default function App() {
  const [activeTab, setActiveTab] = useState('explore'); // 'explore', 'palmleaf', 'search', 'quiz', 'bookmarks'
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 1024);
  const [selectedChapterId, setSelectedChapterId] = useState(1);
  const [theme, setTheme] = useState('theme-parchment'); // 'theme-parchment', 'theme-palmleaf', 'theme-darktemple'
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1.0);
  const [isZenMode, setIsZenMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('thirukural_bookmarks');
      return saved ? JSON.parse(saved) : [1, 2, 39, 109];
    } catch (e) {
      return [1, 2, 39, 109];
    }
  });

  // Bookmarks LocalStorage Sync
  useEffect(() => {
    try {
      localStorage.setItem('thirukural_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarks]);

  // Scroll Progress Calculation
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleBookmark = (kuralNumber) => {
    setBookmarks((prev) => {
      if (prev.includes(kuralNumber)) {
        return prev.filter((num) => num !== kuralNumber);
      } else {
        return [...prev, kuralNumber];
      }
    });
  };

  return (
    <div className={`min-h-screen ${theme} bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-400`}>
      
      {/* Top Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-[var(--brand-primary)] z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Top Navigation Bar */}
      {!isZenMode && (
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          theme={theme}
          setTheme={setTheme}
          fontSizeMultiplier={fontSizeMultiplier}
          setFontSizeMultiplier={setFontSizeMultiplier}
          isZenMode={isZenMode}
          setIsZenMode={setIsZenMode}
          bookmarkCount={bookmarks.length}
        />
      )}

      {/* Zen Focus Mode Floating Close Button */}
      {isZenMode && (
        <button
          onClick={() => setIsZenMode(false)}
          className="fixed top-4 right-4 z-50 px-4 py-2 rounded-full bg-[var(--brand-primary)] text-white text-xs font-bold font-tamil-serif shadow-xl hover:opacity-90 active:scale-95 transition-all"
        >
          ✕ Zen வாசிப்பை விலக்குக
        </button>
      )}

      {/* Main Layout (Left Collapsible Drawer + Central Reading Area) */}
      <div className="flex">
        
        {/* Left Collapsible Chapters Drawer */}
        {!isZenMode && activeTab === 'explore' && (
          <SidebarDrawer
            chapters={thirukuralData.chapters}
            selectedChapterId={selectedChapterId}
            onSelectChapter={setSelectedChapterId}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        )}

        {/* Central Reading Content Area with Smooth Slide Animation */}
        <div className="flex-1 min-w-0">
          <main className="pb-16">
            <div key={activeTab} className="animate-slide-up">
              {activeTab === 'explore' && (
                <ChapterBrowser
                  dataset={thirukuralData}
                  selectedChapterId={selectedChapterId}
                  onSelectChapter={setSelectedChapterId}
                  bookmarks={bookmarks}
                  onToggleBookmark={toggleBookmark}
                  fontSizeMultiplier={fontSizeMultiplier}
                />
              )}

              {activeTab === 'palmleaf' && (
                <PalmLeafReader
                  dataset={thirukuralData}
                  bookmarks={bookmarks}
                  onToggleBookmark={toggleBookmark}
                  fontSizeMultiplier={fontSizeMultiplier}
                />
              )}

              {activeTab === 'search' && (
                <SearchView
                  dataset={thirukuralData}
                  bookmarks={bookmarks}
                  onToggleBookmark={toggleBookmark}
                  fontSizeMultiplier={fontSizeMultiplier}
                />
              )}

              {activeTab === 'quiz' && (
                <ThirukkuralQuiz dataset={thirukuralData} />
              )}

              {activeTab === 'bookmarks' && (
                <BookmarksView
                  dataset={thirukuralData}
                  bookmarks={bookmarks}
                  onToggleBookmark={toggleBookmark}
                  setActiveTab={setActiveTab}
                  fontSizeMultiplier={fontSizeMultiplier}
                />
              )}
            </div>
          </main>

          {!isZenMode && <Footer />}
        </div>

      </div>

    </div>
  );
}
