import { useRef, useEffect } from "react";

interface QuestionNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  answeredQuestions: Record<number, number>;
  correctAnswers: Record<number, boolean>; // Maps question number to whether the answer was correct
  onQuestionSelect: (questionNumber: number) => void;
}

export const QuestionNavigation = ({ 
  currentQuestion, 
  totalQuestions,
  answeredQuestions,
  correctAnswers,
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

  const getButtonStyles = (questionNum: number) => {
    const isActive = currentQuestion === questionNum;
    const isAnswered = answeredQuestions[questionNum] !== undefined;
    const isCorrect = correctAnswers[questionNum];
    
    if (isActive) {
      return "bg-primary text-primary-foreground shadow-sm";
    }
    
    if (isAnswered) {
      if (isCorrect === true) {
        return "bg-green-500 text-white border-green-500";
      } else if (isCorrect === false) {
        return "bg-red-500 text-white border-red-500";
      }
    }
    
    return "bg-muted/50 text-muted-foreground hover:bg-muted border border-border";
  };

  return (
    <div className="bg-card/80 backdrop-blur-sm border-b border-border py-3 md:py-4 sticky top-[52px] md:top-[60px] z-10">
      <div 
        ref={scrollRef}
        className="max-w-5xl mx-auto px-3 md:px-4 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex gap-2 md:gap-2.5 pb-1 min-w-max">
          {questions.map((questionNum) => {
            const isActive = currentQuestion === questionNum;
            
            return (
              <button
                key={questionNum}
                ref={isActive ? activeRef : null}
                onClick={() => onQuestionSelect(questionNum)}
                className={`
                  min-w-[36px] h-9 md:min-w-[42px] md:h-10 text-sm md:text-base font-medium rounded-lg transition-all duration-200
                  flex items-center justify-center
                  ${getButtonStyles(questionNum)}
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
