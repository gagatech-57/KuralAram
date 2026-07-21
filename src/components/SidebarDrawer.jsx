import React, { useState, useMemo } from 'react';
import { Search, ChevronRight, X, BookOpen } from 'lucide-react';

export default function SidebarDrawer({ 
  chapters, 
  selectedChapterId, 
  onSelectChapter, 
  isOpen, 
  onClose 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPaal, setSelectedPaal] = useState('ALL');

  const filteredChapters = useMemo(() => {
    return chapters.filter((ch) => {
      const matchPaal = selectedPaal === 'ALL' || ch.paal === selectedPaal;
      const query = searchTerm.toLowerCase().trim();
      const matchSearch =
        !query ||
        ch.ta.toLowerCase().includes(query) ||
        ch.en.toLowerCase().includes(query) ||
        ch.id.toString() === query;
      return matchPaal && matchSearch;
    });
  }, [chapters, selectedPaal, searchTerm]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop Overlay for mobile & tablet screens */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden transition-opacity" 
      />

      {/* Drawer Sidebar */}
      <aside className="fixed lg:sticky top-[65px] left-0 z-50 lg:z-30 w-[85vw] max-w-[320px] sm:w-80 h-[calc(100dvh-65px)] bg-[var(--bg-card)] border-r border-[var(--border-color)] flex flex-col transition-all duration-300 shadow-2xl lg:shadow-none">
        
        {/* Drawer Header & Search */}
        <div className="p-3.5 sm:p-4 border-b border-[var(--border-color)] space-y-3 shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-inter text-[var(--text-muted)] tracking-wider uppercase flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[var(--brand-primary)]" /> அதிகாரங்கள் (133)
            </span>
            <button 
              onClick={onClose}
              className="touch-target p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] lg:hidden"
              title="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-light)]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="அதிகாரம் தேடுக..."
              className="w-full pl-9 pr-8 py-2.5 text-xs rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-main)] focus:outline-none focus:border-[var(--brand-primary)] font-tamil-sans transition-all min-h-[40px]"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-light)] hover:text-[var(--text-main)] p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Paal Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px] font-medium font-inter no-scrollbar">
            <button
              onClick={() => setSelectedPaal('ALL')}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap min-h-[32px] transition-colors ${selectedPaal === 'ALL' ? 'bg-[var(--brand-primary)] text-white font-bold' : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)]'}`}
            >
              அனைத்தும்
            </button>
            <button
              onClick={() => setSelectedPaal('அறத்துப்பால்')}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap min-h-[32px] transition-colors ${selectedPaal === 'அறத்துப்பால்' ? 'bg-[var(--brand-primary)] text-white font-bold' : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)]'}`}
            >
              அறம்
            </button>
            <button
              onClick={() => setSelectedPaal('பொருட்பால்')}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap min-h-[32px] transition-colors ${selectedPaal === 'பொருட்பால்' ? 'bg-[var(--brand-primary)] text-white font-bold' : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)]'}`}
            >
              பொருள்
            </button>
            <button
              onClick={() => setSelectedPaal('இன்பத்துப்பால்')}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap min-h-[32px] transition-colors ${selectedPaal === 'இன்பத்துப்பால்' ? 'bg-[var(--brand-primary)] text-white font-bold' : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)]'}`}
            >
              இன்பம்
            </button>
          </div>
        </div>

        {/* Scrollable Chapter Cards List */}
        <div className="flex-1 overflow-y-auto p-2.5 sm:p-3 space-y-2">
          {filteredChapters.map((ch) => {
            const isSelected = ch.id === selectedChapterId;

            return (
              <div
                key={ch.id}
                onClick={() => {
                  onSelectChapter(ch.id);
                  if (window.innerWidth < 1024) {
                    onClose();
                  }
                }}
                className={`p-3 rounded-2xl border transition-all cursor-pointer group flex items-center justify-between min-h-[50px] ${
                  isSelected 
                    ? 'bg-[var(--brand-primary-light)] border-[var(--brand-primary)] text-[var(--brand-primary)] shadow-sm' 
                    : 'bg-[var(--bg-card)] border-transparent hover:border-[var(--border-color)] hover:bg-[var(--bg-surface)] text-[var(--text-main)]'
                }`}
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5 shrink-0 ${
                    isSelected ? 'bg-[var(--brand-primary)] text-white' : 'bg-[var(--bg-surface)] text-[var(--text-muted)]'
                  }`}>
                    {ch.id}
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-bold font-tamil-serif text-xs leading-snug truncate">
                      {ch.ta}
                    </h4>
                    <p className={`text-[11px] font-inter truncate ${isSelected ? 'text-[var(--brand-primary)]/80 font-medium' : 'text-[var(--text-muted)]'}`}>
                      {ch.en}
                    </p>
                  </div>
                </div>

                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                  isSelected ? 'text-[var(--brand-primary)]' : 'text-[var(--text-light)]'
                }`} />
              </div>
            );
          })}

          {filteredChapters.length === 0 && (
            <div className="py-8 text-center text-xs text-[var(--text-muted)] font-tamil-sans">
              அதிகாரம் கிடைக்கவில்லை
            </div>
          )}
        </div>

      </aside>
    </>
  );
}
