'use client';

import { useState, useEffect } from 'react';

interface TriviaQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface TriviaQuizProps {
  puzzleData: {
    title?: string;
    description?: string;
    questions: Array<{
      question: string;
      options: string[];
      correctAnswer: number;
    }>;
  };
  onSolved: () => void;
}

export default function TriviaQuiz({ puzzleData, onSolved }: TriviaQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
    Array(puzzleData.questions.length).fill(false)
  );

  const handleOptionSelect = (optionIndex: number) => {
    if (showAnswer) return; // Prevent selecting after answer is shown
    setSelectedOption(optionIndex);
    setShowAnswer(true);
    
    // Update answered questions
    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestion] = true;
    setAnsweredQuestions(newAnsweredQuestions);
    
    // Auto-advance after 2 seconds
    setTimeout(() => {
      if (currentQuestion < puzzleData.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setShowAnswer(false);
      } else {
        onSolved();
      }
    }, 2000);
  };

  // Calculate progress percentage
  const progress = (answeredQuestions.filter(Boolean).length / puzzleData.questions.length) * 100;

  // Current question
  const currentQ = puzzleData.questions[currentQuestion];

  return (
    <div className="p-4">
      {puzzleData.title && (
        <h3 className="text-xl font-bold mb-2 text-[var(--foreground)]">{puzzleData.title}</h3>
      )}
      
      {puzzleData.description && (
        <p className="mb-4 text-[var(--neutral-600)]">{puzzleData.description}</p>
      )}
      
      {/* Progress bar */}
      <div className="w-full h-2 bg-[var(--neutral-200)] rounded-full mb-6">
        <div 
          className="h-full bg-[var(--primary)] rounded-full transition-all duration-300" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="mb-6">
        <p className="text-lg font-medium mb-4 text-[var(--foreground)]">{currentQ.question}</p>
        
        <div className="space-y-2">
          {currentQ.options.map((option, index) => {
            const isCorrect = index === currentQ.correctAnswer;
            const isSelected = selectedOption === index;
            const showCorrect = showAnswer && isCorrect;
            const showIncorrect = showAnswer && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`w-full p-3 text-left rounded-lg border-2 transition ${
                  showCorrect
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : showIncorrect
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : isSelected
                    ? 'border-[var(--primary)] bg-[var(--accent)]'
                    : 'border-[var(--neutral-300)] hover:border-[var(--neutral-400)]'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-[var(--neutral-600)]">
          Question {currentQuestion + 1} of {puzzleData.questions.length}
        </div>
      </div>
    </div>
  );
} 