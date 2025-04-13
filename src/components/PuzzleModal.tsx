'use client';

import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { EventLocation } from '@/types';
import TriviaQuiz from './puzzles/TriviaQuiz';
import TicTacToe from './puzzles/TicTacToe';
import SudokuBoard from './puzzles/SudokuBoard';

// Make sure Modal is accessible for screen readers
// In Next.js App Router, we need to set this in a useEffect
const setAppElement = () => {
  if (typeof window !== 'undefined') {
    try {
      // Try to set app element to html or body since there might not be a #root element
      Modal.setAppElement('body');
    } catch (error) {
      console.error('Error setting app element for Modal:', error);
    }
  }
};

interface PuzzleModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: EventLocation | null;
  onPuzzleSolved: (locationId: string) => void;
  isAlreadySolved?: boolean;
}

export default function PuzzleModal({ 
  isOpen, 
  onClose, 
  location, 
  onPuzzleSolved,
  isAlreadySolved = false
}: PuzzleModalProps) {
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    setAppElement();
  }, []);

  useEffect(() => {
    // Reset solved state when a new location is selected
    if (location) {
      setSolved(isAlreadySolved);
    }
  }, [location, isAlreadySolved]);

  if (!location) return null;

  const handleSolved = () => {
    setSolved(true);
    onPuzzleSolved(location.id);
  };

  const handlePlayAgain = () => {
    setSolved(false);
  };

  const renderPuzzleComponent = () => {
    switch (location.puzzleType) {
      case 'trivia':
        return <TriviaQuiz puzzleData={location.puzzleData as { questions: { question: string; options: string[]; correctAnswer: number; }[]; title?: string; description?: string; }} onSolved={handleSolved} />;
      case 'tictactoe':
        return <TicTacToe puzzleData={location.puzzleData} onSolved={handleSolved} />;
      case 'sudoku':
        return <SudokuBoard onSolved={handleSolved} />;
      // More puzzle types will be added here as they are implemented
      default:
        return (
          <div className="p-4 text-center">
            <p className="text-lg font-medium text-[var(--foreground)]">
              Puzzle type {location.puzzleType} not implemented yet
            </p>
          </div>
        );
    }
  };

  const renderUnlockedContent = () => {
    return (
      <div className="p-6 text-center">
        <h3 className="text-2xl font-bold mb-4 text-[var(--foreground)]">{location.unlockContent.title}</h3>
        <p className="mb-6 text-[var(--neutral-600)]">{location.unlockContent.text}</p>
        
        {location.unlockContent.mediaUrl && (
          <div className="my-4">
            {location.unlockContent.mediaType === 'image' && (
              <img 
                src={location.unlockContent.mediaUrl} 
                alt={location.unlockContent.title}
                className="mx-auto max-w-full rounded-lg shadow-md"
              />
            )}
            {location.unlockContent.mediaType === 'video' && (
              <video 
                src={location.unlockContent.mediaUrl} 
                controls
                className="mx-auto max-w-full rounded-lg shadow-md"
              />
            )}
            {location.unlockContent.mediaType === 'audio' && (
              <audio 
                src={location.unlockContent.mediaUrl} 
                controls
                className="mx-auto w-full"
              />
            )}
          </div>
        )}
        
        <div className="flex gap-4 justify-center mt-6">
          <button
            onClick={handlePlayAgain}
            className="px-6 py-2 bg-[var(--primary)] text-[var(--secondary)] rounded-lg hover:bg-[var(--primary-dark)] transition"
          >
            Play Again
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[var(--neutral-200)] text-[var(--neutral-800)] rounded-lg hover:bg-[var(--neutral-300)] transition"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={`Puzzle for ${location.name}`}
      className="max-w-2xl mx-auto mt-20 bg-[var(--background)]  rounded-xl shadow-2xl outline-none overflow-hidden"
      overlayClassName="fixed inset-0 bg-[var(--neutral-900)]/50 backdrop-blur-xs z-[1000] flex items-start justify-center"
      style={{
        overlay: {
          zIndex: 1000 // Ensure modal overlay is above the map
        },
        content: {
          zIndex: 1001 // Ensure modal content is above the overlay
        }
      }}
    >
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--neutral-400)] hover:text-[var(--neutral-600)]"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div className="p-4 bg-[var(--primary)] text-[var(--secondary)]">
          <h2 className="text-xl font-bold">{location.name}</h2>
        </div>
        
        <div className="p-4">
          {!solved ? renderPuzzleComponent() : renderUnlockedContent()}
        </div>
      </div>
    </Modal>
  );
} 