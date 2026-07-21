import React, { useState, useEffect } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

export default function ThirukkuralQuiz({ dataset }) {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const generateQuestion = () => {
    if (!dataset.kurals || dataset.kurals.length === 0) return;

    const randomIndex = Math.floor(Math.random() * dataset.kurals.length);
    const targetKural = dataset.kurals[randomIndex];

    const wrongOptions = [];
    while (wrongOptions.length < 3) {
      const wrongIndex = Math.floor(Math.random() * dataset.kurals.length);
      const candidate = dataset.kurals[wrongIndex];
      if (candidate.number !== targetKural.number && !wrongOptions.some(o => o.number === candidate.number)) {
        wrongOptions.push(candidate);
      }
    }

    const quizType = Math.random() > 0.5 ? 'line2' : 'chapter';

    let allChoices = [];
    if (quizType === 'line2') {
      allChoices = [
        { text: targetKural.line2, isCorrect: true, number: targetKural.number },
        ...wrongOptions.map(w => ({ text: w.line2, isCorrect: false, number: w.number }))
      ];
    } else {
      allChoices = [
        { text: targetKural.chapterTa, isCorrect: true, number: targetKural.number },
        ...wrongOptions.map(w => ({ text: w.chapterTa, isCorrect: false, number: w.number }))
      ];
    }

    allChoices.sort(() => Math.random() - 0.5);

    setCurrentQuestion({
      type: quizType,
      kural: targetKural,
    });
    setOptions(allChoices);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleSelectOption = (option) => {
    if (selectedOption !== null) return;

    setSelectedOption(option);
    const correct = option.isCorrect;
    setIsCorrect(correct);
    setQuestionsAnswered((prev) => prev + 1);

    if (correct) {
      setScore((prev) => prev + 10);
    }
  };

  return (
    <div className="max-w-[800px] mx-auto px-4 py-8 space-y-6">
      
      {/* Quiz Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-[var(--brand-accent-light)] text-[var(--brand-accent)] font-inter">
          திருக்குறள் புதிர் (Heritage Quiz)
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-tamil-serif text-[var(--text-main)]">
          வினாடி வினா
        </h2>
      </div>

      {/* Score Header */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xs font-inter">
        <div>
          <span className="text-xs text-[var(--text-muted)] font-medium">மதிப்பெண் (Score)</span>
          <p className="text-xl font-extrabold text-[var(--brand-primary)]">{score} புள்ளிகள்</p>
        </div>

        <div className="text-right">
          <span className="text-xs text-[var(--text-muted)] font-medium">வினாக்கள் (Answered)</span>
          <p className="text-base font-bold text-[var(--text-main)]">{questionsAnswered} பதில்கள்</p>
        </div>
      </div>

      {/* Main Question Card */}
      {currentQuestion && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm space-y-6">
          
          <div className="space-y-3">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[var(--brand-primary-light)] text-[var(--brand-primary)] font-inter">
              வினா {questionsAnswered + 1}
            </span>

            {currentQuestion.type === 'line2' ? (
              <div className="p-4 rounded-xl bg-[var(--bg-surface)] text-center space-y-2">
                <p className="text-xs text-[var(--text-muted)] font-tamil-sans font-bold">
                  பின்வரும் குறளின் விடுபட்ட இரண்டாம் அடியைக் கண்டறிக:
                </p>
                <h3 className="text-xl sm:text-2xl font-bold font-tamil-serif text-[var(--brand-primary)]">
                  "{currentQuestion.kural.line1} ..."
                </h3>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-[var(--bg-surface)] text-center space-y-2">
                <p className="text-xs text-[var(--text-muted)] font-tamil-sans font-bold">
                  பின்வரும் குறள் எந்த அதிகாரத்தைச் சேர்ந்தது?
                </p>
                <h3 className="text-lg sm:text-xl font-bold font-tamil-serif text-[var(--brand-primary)]">
                  "{currentQuestion.kural.line1}"
                </h3>
                <h3 className="text-lg sm:text-xl font-bold font-tamil-serif text-[var(--brand-primary)]">
                  "{currentQuestion.kural.line2}"
                </h3>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3 font-tamil-sans">
            {options.map((option, idx) => {
              let btnStyle = "bg-[var(--bg-surface)] text-[var(--text-main)] border-transparent hover:bg-[var(--border-color)]";

              if (selectedOption !== null) {
                if (option.isCorrect) {
                  btnStyle = "bg-emerald-600 text-white shadow-sm";
                } else if (selectedOption === option && !option.isCorrect) {
                  btnStyle = "bg-rose-600 text-white shadow-sm";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left p-4 rounded-xl border text-sm sm:text-base font-bold transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>{option.text}</span>
                  {selectedOption !== null && option.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  )}
                  {selectedOption !== null && selectedOption === option && !option.isCorrect && (
                    <XCircle className="w-5 h-5 text-white" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {selectedOption !== null && (
            <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-3 animate-fade-in">
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <span className="text-emerald-700 font-extrabold font-tamil-sans text-sm flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> சரியான விடை! (+10 புள்ளிகள்)
                  </span>
                ) : (
                  <span className="text-rose-700 font-extrabold font-tamil-sans text-sm flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> தவறான விடை!
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm font-tamil-sans text-[var(--text-main)]">
                <span className="font-bold">பொருள்:</span> {currentQuestion.kural.explanationMuVa}
              </p>

              <div className="pt-2 text-right">
                <button
                  onClick={generateQuestion}
                  className="px-4 py-2 rounded-xl bg-[var(--brand-primary)] text-white text-xs font-bold font-inter shadow-xs hover:opacity-90 flex items-center gap-1.5 ml-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>அடுத்த வினா (Next Question)</span>
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
