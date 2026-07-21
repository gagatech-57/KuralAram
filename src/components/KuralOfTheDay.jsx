import React, { useMemo } from 'react';
import KuralCard from './KuralCard';
import { Sparkles, Calendar, Quote, RefreshCw } from 'lucide-react';

export default function KuralOfTheDay({ dataset, bookmarks, onToggleBookmark }) {
  // Seed today's date to pick a unique deterministic Kural per day
  const todayKural = useMemo(() => {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
    );
    const kuralIndex = (dayOfYear * 17) % dataset.kurals.length;
    return dataset.kurals[kuralIndex] || dataset.kurals[0];
  }, [dataset.kurals]);

  const formattedDate = new Date().toLocaleDateString('ta-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--bg-card-border)] bg-[var(--bg-card)] text-[var(--accent-gold)] text-xs font-bold font-tamil-serif shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>தினமொரு திருக்குறள் • Daily Wisdom</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold font-tamil-serif text-[var(--text-primary)]">
          இன்றைய வழிகாட்டி
        </h2>

        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[var(--text-secondary)] font-tamil-serif">
          <Calendar className="w-4 h-4 text-[var(--text-accent)]" />
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* Featured Card */}
      <div className="p-1 rounded-3xl bg-gradient-to-r from-[var(--accent-gold)] via-[var(--text-accent)] to-[var(--accent-bronze)] shadow-2xl">
        <div className="bg-[var(--bg-card)] rounded-[22px] p-4 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--bg-card-border)]/40 pb-4">
            <span className="text-xs font-bold font-tamil-serif text-[var(--text-accent)] uppercase tracking-widest flex items-center gap-1.5">
              <Quote className="w-4 h-4" /> இன்றைய சிந்தனை (Wisdom for Today)
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[var(--accent-gold)] text-white font-tamil-serif">
              குறள் {todayKural.number}
            </span>
          </div>

          {/* Kural Display */}
          <KuralCard
            kural={todayKural}
            isBookmarked={bookmarks.includes(todayKural.number)}
            onToggleBookmark={onToggleBookmark}
          />
        </div>
      </div>

    </div>
  );
}
