import React, { useMemo } from 'react';
import KuralCard from './KuralCard';
import { ChevronLeft, ChevronRight, BookOpen, Layers } from 'lucide-react';

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
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Sticky Chapter Header while scrolling */}
      <div className="sticky top-16 z-30 py-4 px-6 rounded-2xl glass-header border border-[var(--border-color)] shadow-sm transition-all flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-inter text-[var(--text-muted)] font-medium">
            <span className="px-2 py-0.5 rounded-full bg-[var(--brand-accent-light)] text-[var(--brand-accent)] font-bold">
              அதிகாரம் {activeChapterInfo.id} / 133
            </span>
            <span>{activeChapterInfo.paal} ({activeChapterInfo.paalEn})</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-tamil-serif text-[var(--brand-primary)] mt-1">
            {activeChapterInfo.ta} <span className="text-sm font-normal text-[var(--text-muted)] font-inter">({activeChapterInfo.en})</span>
          </h2>
        </div>

        {/* Chapter Prev / Next Quick Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrevChapter}
            disabled={selectedChapterId === 1}
            className="p-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-main)] disabled:opacity-40 hover:bg-[var(--bg-surface)] transition-all"
            title="Previous Chapter"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNextChapter}
            disabled={selectedChapterId === 133}
            className="p-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-main)] disabled:opacity-40 hover:bg-[var(--bg-surface)] transition-all"
            title="Next Chapter"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 10 Kurals List for Active Chapter */}
      <div className="space-y-8">
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

      {/* Bottom Floating/Fixed Navigation between Chapters */}
      <div className="flex items-center justify-between pt-6 border-t border-[var(--border-color)] font-inter text-xs font-semibold">
        <button
          onClick={handlePrevChapter}
          disabled={selectedChapterId === 1}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-main)] disabled:opacity-40 hover:bg-[var(--bg-surface)] transition-all shadow-xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>முந்தைய அதிகாரம்</span>
        </button>

        <span className="text-[var(--text-muted)]">
          {selectedChapterId} / 133
        </span>

        <button
          onClick={handleNextChapter}
          disabled={selectedChapterId === 133}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-main)] disabled:opacity-40 hover:bg-[var(--bg-surface)] transition-all shadow-xs"
        >
          <span>அடுத்த அதிகாரம்</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
