import React, { useState } from 'react';
import KuralCard from './KuralCard';
import { ChevronLeft, ChevronRight, Shuffle, Feather } from 'lucide-react';

export default function PalmLeafReader({ 
  dataset, 
  bookmarks, 
  onToggleBookmark,
  fontSizeMultiplier 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentKural = dataset.kurals[currentIndex] || dataset.kurals[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < dataset.kurals.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : dataset.kurals.length - 1));
  };

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * dataset.kurals.length);
    setCurrentIndex(randomIndex);
  };

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-[var(--brand-accent-light)] text-[var(--brand-accent)] font-inter">
          டிஜிட்டல் நூல் வாசிப்பு (Reader Mode)
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-tamil-serif text-[var(--text-main)]">
          தொடர் குறள் வாசிப்பு
        </h2>
      </div>

      {/* Slider Controls */}
      <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm space-y-3 font-inter">
        <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-muted)]">
          <span>குறள் 1</span>
          <span className="text-[var(--brand-primary)] font-bold text-sm">
            குறள் {currentKural.number} / 1330
          </span>
          <span>1330</span>
        </div>

        <input
          type="range"
          min="0"
          max={dataset.kurals.length - 1}
          value={currentIndex}
          onChange={(e) => setCurrentIndex(Number(e.target.value))}
          className="w-full accent-[var(--brand-primary)] cursor-pointer"
        />

        <div className="flex items-center justify-between pt-1 text-xs">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--border-color)] text-[var(--text-main)]"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> முந்தைய
          </button>

          <button
            onClick={handleRandom}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--border-color)] text-[var(--brand-primary)] font-bold"
          >
            <Shuffle className="w-3.5 h-3.5" /> ரேண்டம்
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--border-color)] text-[var(--text-main)]"
          >
            அடுத்த <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Card Display */}
      <KuralCard
        kural={currentKural}
        isBookmarked={bookmarks.includes(currentKural.number)}
        onToggleBookmark={onToggleBookmark}
        fontSizeMultiplier={fontSizeMultiplier}
      />

    </div>
  );
}
