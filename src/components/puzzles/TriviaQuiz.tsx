'use client';

import { useState } from 'react';

interface TriviaQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface TriviaQuizProps {
  puzzleData: {
    questions: TriviaQuestion[];
    title?: string;
    description?: string;
    [key: string]: unknown; // Allow for additional properties
  };
  onSolved: () => void;
}

export default function TriviaQuiz({ puzzleData, onSolved }: TriviaQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
    Array(puzzleData.questions.length).fill(false)
  );

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    // Check if answer is correct
    const isCorrect = selectedOption === puzzleData.questions[currentQuestion].correctAnswer;
    
    // Update answered questions
    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestion] = true;
    setAnsweredQuestions(newAnsweredQuestions);
    
    // Update correct answers count
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }
    
    // Move to next question or show results
    if (currentQuestion < puzzleData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setShowResults(true);
      
      // Check if passed the quiz (e.g., 70% correct answers)
      const passThreshold = Math.ceil(puzzleData.questions.length * 0.7);
      if (correctAnswers + (isCorrect ? 1 : 0) >= passThreshold) {
        onSolved();
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setCorrectAnswers(0);
    setShowResults(false);
    setAnsweredQuestions(Array(puzzleData.questions.length).fill(false));
  };

  // Calculate progress percentage
  const progress = (answeredQuestions.filter(Boolean).length / puzzleData.questions.length) * 100;

  // Results screen
  if (showResults) {
    const totalQuestions = puzzleData.questions.length;
    const percentage = (correctAnswers / totalQuestions) * 100;
    const passed = percentage >= 70;

    return (
      <div className="p-6 text-center">
        <h3 className="text-2xl font-bold mb-4 text-[var(--foreground)]">Quiz Results</h3>
        
        <div className="mb-6">
          <div className="text-5xl font-bold mb-2 text-[var(--primary)]">{percentage.toFixed(0)}%</div>
          <p className="text-[var(--neutral-600)]">{correctAnswers} out of {totalQuestions} correct</p>
        </div>
        
        {passed ? (
          <div className="mb-6 p-4 bg-[var(--accent)] text-[var(--primary-dark)] rounded-lg">
            <p className="font-bold">Congratulations!</p>
            <p>You&apos;ve passed the quiz and unlocked new content.</p>
          </div>
        ) : (
          <div className="mb-6 p-4 bg-[var(--accent)] text-[var(--neutral-700)] rounded-lg">
            <p className="font-bold">Almost there!</p>
            <p>You need at least 70% to pass. Try again!</p>
          </div>
        )}
        
        {!passed && (
          <button
            onClick={restartQuiz}
            className="px-6 py-2 bg-[var(--primary)] text-[var(--secondary)] rounded-lg hover:bg-[var(--primary-dark)] transition"
          >
            Try Again
          </button>
        )}
      </div>
    );
  }

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
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              className={`w-full p-3 text-left rounded-lg border-2 transition ${
                selectedOption === index
                  ? 'border-[var(--primary)] bg-[var(--accent)]'
                  : 'border-[var(--neutral-300)] hover:border-[var(--neutral-400)]'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-[var(--neutral-600)]">
          Question {currentQuestion + 1} of {puzzleData.questions.length}
        </div>
        
        <button
          onClick={handleNextQuestion}
          disabled={selectedOption === null}
          className={`px-6 py-2 rounded-lg transition ${
            selectedOption !== null
              ? 'bg-[var(--primary)] text-[var(--secondary)] hover:bg-[var(--primary-dark)]'
              : 'bg-[var(--neutral-300)] text-[var(--neutral-500)] cursor-not-allowed'
          }`}
        >
          {currentQuestion < puzzleData.questions.length - 1 ? 'Next' : 'Finish'}
        </button>
      </div>
    </div>
  );
} 