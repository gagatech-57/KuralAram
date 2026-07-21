import React, { useMemo } from 'react';
import KuralCard from './KuralCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ChapterBrowser({ 
  dataset, 
  selectedChapterId, 
  onSelectChapter, 
  bookmarks, 
  onToggleBookmark,
  fontSizeMultiplier
}) {
  const activeChapterInfo = useMemo(() => {
    return dataset.chapters.find((ch) => ch.id === selectedChapterId) || dataset.chapters[0];
  }, [dataset.chapters, selectedChapterId]);

  const activeChapterKurals = useMemo(() => {
    return dataset.kurals.filter((k) => k.chapterId === selectedChapterId);
  }, [dataset.kurals, selectedChapterId]);

  const handlePrevChapter = () => {
    if (selectedChapterId > 1) {
      onSelectChapter(selectedChapterId - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextChapter = () => {
    if (selectedChapterId < 133) {
      onSelectChapter(selectedChapterId + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-[900px] mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8 min-w-0">
      
      {/* Sticky Chapter Header while scrolling */}
      <div className="sticky top-[65px] z-20 py-3 px-4 sm:px-6 rounded-2xl glass-header border border-[var(--border-color)] shadow-xs transition-all flex items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-inter text-[var(--text-muted)] font-medium">
            <span className="px-2 py-0.5 rounded-full bg-[var(--brand-accent-light)] text-[var(--brand-accent)] font-bold shrink-0">
              அதிகாரம் {activeChapterInfo.id} / 133
            </span>
            <span className="truncate hidden sm:inline">{activeChapterInfo.paal} ({activeChapterInfo.paalEn})</span>
          </div>
          <h2 className="text-lg sm:text-2xl font-bold font-tamil-serif text-[var(--brand-primary)] mt-0.5 truncate">
            {activeChapterInfo.ta} <span className="text-xs sm:text-sm font-normal text-[var(--text-muted)] font-inter">({activeChapterInfo.en})</span>
          </h2>
        </div>

        {/* Chapter Prev / Next Quick Buttons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={handlePrevChapter}
            disabled={selectedChapterId === 1}
            className="touch-target p-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-main)] disabled:opacity-30 hover:bg-[var(--bg-surface)] transition-all"
            title="Previous Chapter"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNextChapter}
            disabled={selectedChapterId === 133}
            className="touch-target p-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-main)] disabled:opacity-30 hover:bg-[var(--bg-surface)] transition-all"
            title="Next Chapter"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 10 Kurals List for Active Chapter */}
      <div className="space-y-6 sm:space-y-8 w-full min-w-0">
        {activeChapterKurals.map((kural) => (
          <KuralCard
            key={kural.number}
            kural={kural}
            isBookmarked={bookmarks.includes(kural.number)}
            onToggleBookmark={onToggleBookmark}
            fontSizeMultiplier={fontSizeMultiplier}
          />
        ))}
      </div>

      {/* Bottom Navigation between Chapters */}
      <div className="flex items-center justify-between pt-6 border-t border-[var(--border-color)] font-inter text-xs font-semibold gap-2">
        <button
          onClick={handlePrevChapter}
          disabled={selectedChapterId === 1}
          className="touch-target flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-main)] disabled:opacity-30 hover:bg-[var(--bg-surface)] transition-all shadow-xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">முந்தைய அதிகாரம்</span>
          <span className="sm:hidden">முந்தைய</span>
        </button>

        <span className="text-[var(--text-muted)] shrink-0">
          {selectedChapterId} / 133
        </span>

        <button
          onClick={handleNextChapter}
          disabled={selectedChapterId === 133}
          className="touch-target flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-main)] disabled:opacity-30 hover:bg-[var(--bg-surface)] transition-all shadow-xs"
        >
          <span className="hidden sm:inline">அடுத்த அதிகாரம்</span>
          <span className="sm:hidden">அடுத்த</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
