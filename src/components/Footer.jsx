import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-main)] py-10 px-4 transition-colors font-inter">
      <div className="max-w-[900px] mx-auto space-y-6">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="w-6 h-6 rounded-lg bg-[var(--brand-primary)] text-white font-bold font-tamil-serif flex items-center justify-center text-xs">
                வ
              </span>
              <h3 className="text-base font-bold font-tamil-serif text-[var(--text-main)]">
                திருக்குறள் 1330
              </h3>
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              A premium, minimal digital literature platform for Thirukkural.
            </p>
          </div>

          <div className="text-xs text-[var(--text-muted)] space-y-0.5">
            <p>38 அறத்துப்பால் • 70 பொருட்பால் • 25 இன்பத்துப்பால்</p>
            <p>133 அதிகாரங்கள் • 1330 குறள்கள்</p>
          </div>

        </div>

        <div className="pt-4 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[var(--text-muted)]">
          <p>© {new Date().getFullYear()} திருக்குறள் 1330 • Premium Digital Reader</p>
          <div className="flex items-center gap-1">
            <span>100% Correct Dataset & Explanations</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
