import { useRef, useEffect } from "react";

interface QuestionNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  answeredQuestions: Record<number, number>;
  onQuestionSelect: (questionNumber: number) => void;
}

export const QuestionNavigation = ({ 
  currentQuestion, 
  totalQuestions,
  answeredQuestions,
  onQuestionSelect 
}: QuestionNavigationProps) => {
  const questions = Array.from({ length: totalQuestions }, (_, i) => i + 1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll to active question
  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const activeButton = activeRef.current;
      const containerRect = container.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      
      const scrollLeft = buttonRect.left - containerRect.left - containerRect.width / 2 + buttonRect.width / 2 + container.scrollLeft;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [currentQuestion]);

  return (
    <div className="bg-card/80 backdrop-blur-sm border-b border-border py-2 sticky top-[41px] z-10">
      <div 
        ref={scrollRef}
        className="max-w-4xl mx-auto px-2 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex gap-1.5 pb-1 min-w-max">
          {questions.map((questionNum) => {
            const isActive = currentQuestion === questionNum;
            const isAnswered = answeredQuestions[questionNum] !== undefined;
            
            return (
              <button
                key={questionNum}
                ref={isActive ? activeRef : null}
                onClick={() => onQuestionSelect(questionNum)}
                className={`
                  min-w-[28px] h-7 text-xs font-medium rounded transition-all duration-200
                  flex items-center justify-center
                  ${isActive 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : isAnswered
                      ? "bg-success/20 text-success border border-success/30"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted border border-border"
                  }
                `}
              >
                {questionNum}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
