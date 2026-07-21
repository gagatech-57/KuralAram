import React from 'react';
import KuralCard from './KuralCard';
import { Heart, BookOpen } from 'lucide-react';

export default function BookmarksView({ 
  dataset, 
  bookmarks, 
  onToggleBookmark, 
  setActiveTab,
  fontSizeMultiplier 
}) {
  const bookmarkedKurals = dataset.kurals.filter((k) => bookmarks.includes(k.number));

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-[var(--brand-accent-light)] text-[var(--brand-accent)] font-inter inline-flex items-center gap-1">
          <Heart className="w-3.5 h-3.5 text-rose-600 fill-current" /> விருப்பமான குறள்கள் (Saved Bookmarks)
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-tamil-serif text-[var(--text-main)]">
          என் சுவடிகள் ({bookmarkedKurals.length})
        </h2>
      </div>

      {/* Bookmarks List */}
      <div className="space-y-6">
        {bookmarkedKurals.map((kural) => (
          <KuralCard
            key={kural.number}
            kural={kural}
            isBookmarked={true}
            onToggleBookmark={onToggleBookmark}
            fontSizeMultiplier={fontSizeMultiplier}
          />
        ))}

        {bookmarkedKurals.length === 0 && (
          <div className="text-center py-16 p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-4 font-inter">
            <Heart className="w-10 h-10 mx-auto text-[var(--text-muted)] opacity-40" />
            <h3 className="text-lg font-bold text-[var(--text-main)] font-tamil-serif">
              இன்னும் சுவடிகள் எதுவும் சேமிக்கப்படவில்லை
            </h3>
            <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
              You haven't bookmarked any Thirukkural couplets yet. Click the heart icon on any Kural card to save it here!
            </p>
            <button
              onClick={() => setActiveTab('explore')}
              className="px-4 py-2 rounded-xl bg-[var(--brand-primary)] text-white text-xs font-bold shadow-xs hover:opacity-90 inline-flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>அதிகாரங்களை ஆராய்க</span>
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
