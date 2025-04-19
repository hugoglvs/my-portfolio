'use client';

import { useState } from 'react';
import Image from 'next/image';

interface QuestionAnswerProps {
  puzzleData: {
    title?: string;
    description?: string;
    question: string;
    answers: string[];
    mediaUrl?: string;
    mediaType?: 'image' | 'video' | 'audio';
  };
  onSolved: () => void;
}

export default function QuestionAnswer({ puzzleData, onSolved }: QuestionAnswerProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedUserAnswer = userAnswer.toLowerCase().trim();
    const correct = puzzleData.answers.some(
      answer => answer.toLowerCase().trim() === normalizedUserAnswer
    );
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setTimeout(() => {
        onSolved();
      }, 2000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4">
      {puzzleData.title && (
        <h3 className="text-xl font-bold mb-2 text-[var(--foreground)]">{puzzleData.title}</h3>
      )}
      
      {puzzleData.description && (
        <p className="mb-4 text-[var(--neutral-600)]">{puzzleData.description}</p>
      )}
      
      <div className="mb-6">
        {puzzleData.mediaUrl && (
          <div className="mb-4">
            {puzzleData.mediaType === 'image' && (
              <div className="relative w-full h-48 sm:h-64">
                <Image 
                  src={puzzleData.mediaUrl} 
                  alt="Question image"
                  fill
                  className="object-cover rounded-lg shadow-md"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/400x300?text=Image+not+available';
                  }}
                />
              </div>
            )}
            {puzzleData.mediaType === 'video' && (
              <video 
                src={puzzleData.mediaUrl} 
                controls
                className="w-full rounded-lg shadow-md"
              />
            )}
            {puzzleData.mediaType === 'audio' && (
              <div className="w-full p-4 bg-[var(--neutral-100)] dark:bg-[var(--neutral-800)] rounded-lg shadow-md">
                <audio 
                  src={puzzleData.mediaUrl} 
                  controls
                  className="w-full"
                />
              </div>
            )}
          </div>
        )}
        
        <p className="text-lg font-medium mb-4 text-[var(--foreground)]">{puzzleData.question}</p>
        
        <div className="space-y-4">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => {
              setUserAnswer(e.target.value);
              if (showFeedback) {
                setShowFeedback(false);
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type your answer here..."
            className="w-full p-3 rounded-lg border-2 border-[var(--neutral-300)] focus:border-[var(--primary)] focus:outline-none"
            disabled={showFeedback && isCorrect}
          />
          
          {showFeedback && (
            <div className={`p-3 rounded-lg ${
              isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {isCorrect ? 'Correct! Well done!' : 'Not quite right. Try again!'}
            </div>
          )}
          
          <button
            onClick={handleSubmit}
            className={`w-full p-3 ${
              showFeedback && isCorrect 
                ? 'bg-green-500 text-white' 
                : 'bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]'
            } rounded-lg transition`}
            disabled={showFeedback && isCorrect}
          >
            {showFeedback && isCorrect ? 'Moving on...' : 'Submit Answer'}
          </button>
        </div>
      </div>
    </div>
  );
} 