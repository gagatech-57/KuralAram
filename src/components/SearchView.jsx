import React, { useState, useMemo } from 'react';
import KuralCard from './KuralCard';
import { Search, Filter, X } from 'lucide-react';

export default function SearchView({ 
  dataset, 
  bookmarks, 
  onToggleBookmark,
  fontSizeMultiplier 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPaal, setSelectedPaal] = useState('ALL');
  const [limit, setLimit] = useState(20);

  const popularTopics = [
    'அன்பு', 'கல்வி', 'அறம்', 'நட்பு', 'வாய்மை', 'ஈகை', 
    'விருந்தோம்பல்', 'காலம்', 'பொருள்', 'ஒழுக்கம்', 'கோபம்', 'தவம்'
  ];

  const searchResults = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    return dataset.kurals.filter((k) => {
      if (selectedPaal !== 'ALL' && k.paalTa !== selectedPaal) {
        return false;
      }

      if (!query) return true;

      if (k.number.toString() === query) return true;

      if (k.line1.toLowerCase().includes(query) || k.line2.toLowerCase().includes(query)) return true;

      if (k.explanationMuVa.toLowerCase().includes(query) || k.explanationSalomon.toLowerCase().includes(query)) return true;

      if (
        k.translation.toLowerCase().includes(query) ||
        k.explanationEn.toLowerCase().includes(query) ||
        k.transliteration1.toLowerCase().includes(query) ||
        k.transliteration2.toLowerCase().includes(query) ||
        k.chapterTa.toLowerCase().includes(query) ||
        k.chapterEn.toLowerCase().includes(query)
      ) {
        return true;
      }

      return false;
    });
  }, [dataset.kurals, searchTerm, selectedPaal]);

  const displayedResults = useMemo(() => {
    return searchResults.slice(0, limit);
  }, [searchResults, limit]);

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Search Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-[var(--brand-accent-light)] text-[var(--brand-accent)] font-inter">
          1330 குறள் தேடுபொறி
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-tamil-serif text-[var(--text-main)]">
          குறள் தேடல்
        </h2>
      </div>

      {/* Main Search Input & Filters Card */}
      <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm space-y-4 font-inter">
        
        {/* Input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--brand-primary)]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setLimit(20);
            }}
            placeholder="குறள் எண் (1-1330) அல்லது சொல் தேடுக... (Search words in Tamil or English)"
            className="w-full pl-12 pr-10 py-3.5 text-sm sm:text-base rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-main)] focus:outline-none focus:border-[var(--brand-primary)] font-tamil-sans transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-main)]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Popular tags */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
          <span className="text-[var(--text-muted)] font-semibold">தலைப்புகள்:</span>
          {popularTopics.map((topic) => (
            <button
              key={topic}
              onClick={() => {
                setSearchTerm(topic);
                setLimit(20);
              }}
              className="px-2.5 py-1 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-main)] hover:bg-[var(--brand-primary)] hover:text-white transition-colors font-tamil-sans"
            >
              #{topic}
            </button>
          ))}
        </div>

        {/* Paal Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[var(--border-color)] text-xs">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1 sm:pb-0 whitespace-nowrap">
            <span className="text-[var(--text-muted)] font-semibold mr-1 flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5" /> பால்:
            </span>
            <button
              onClick={() => setSelectedPaal('ALL')}
              className={`px-3 py-1 rounded-full transition-colors shrink-0 ${selectedPaal === 'ALL' ? 'bg-[var(--brand-primary)] text-white font-bold' : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)]'}`}
            >
              அனைத்தும்
            </button>
            <button
              onClick={() => setSelectedPaal('அறத்துப்பால்')}
              className={`px-3 py-1 rounded-full transition-colors shrink-0 ${selectedPaal === 'அறத்துப்பால்' ? 'bg-[var(--brand-primary)] text-white font-bold' : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)]'}`}
            >
              அறத்துப்பால்
            </button>
            <button
              onClick={() => setSelectedPaal('பொருட்பால்')}
              className={`px-3 py-1 rounded-full transition-colors shrink-0 ${selectedPaal === 'பொருட்பால்' ? 'bg-[var(--brand-primary)] text-white font-bold' : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)]'}`}
            >
              பொருட்பால்
            </button>
            <button
              onClick={() => setSelectedPaal('இன்பத்துப்பால்')}
              className={`px-3 py-1 rounded-full transition-colors shrink-0 ${selectedPaal === 'இன்பத்துப்பால்' ? 'bg-[var(--brand-primary)] text-white font-bold' : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)]'}`}
            >
              இன்பத்துப்பால்
            </button>
          </div>

          <span className="font-bold text-[var(--brand-primary)] shrink-0 text-right sm:text-left">
            முடிவுகள்: {searchResults.length}
          </span>
        </div>

      </div>

      {/* Results */}
      <div className="space-y-6">
        {displayedResults.map((kural) => (
          <KuralCard
            key={kural.number}
            kural={kural}
            isBookmarked={bookmarks.includes(kural.number)}
            onToggleBookmark={onToggleBookmark}
            fontSizeMultiplier={fontSizeMultiplier}
          />
        ))}

        {searchResults.length === 0 && (
          <div className="text-center py-16 p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-2">
            <p className="text-lg font-bold font-tamil-serif text-[var(--brand-primary)]">
              தேடலுக்குரிய குறள்கள் எதுவும் கிடைக்கவில்லை
            </p>
            <p className="text-xs text-[var(--text-muted)] font-inter">
              No matching couplets found. Try searching for other terms like 'love', 'truth', or 'அன்பு'.
            </p>
          </div>
        )}

        {displayedResults.length < searchResults.length && (
          <div className="text-center pt-4">
            <button
              onClick={() => setLimit((prev) => prev + 20)}
              className="px-5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] font-bold text-xs text-[var(--text-main)] shadow-xs transition-colors"
            >
              மேலும் குறள்களைக் காட்டு ({searchResults.length - displayedResults.length} மீதம்)
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
