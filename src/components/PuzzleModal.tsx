'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { EventLocation } from '@/types';
import TriviaQuiz from './puzzles/TriviaQuiz';
import TicTacToe from './puzzles/TicTacToe';
import SudokuBoard from './puzzles/SudokuBoard';
import Image from 'next/image';

interface PuzzleModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: EventLocation | null;
  onPuzzleSolved: (locationId: string) => void;
  isAlreadySolved?: boolean;
}

export default function PuzzleModal({ isOpen, onClose, location, onPuzzleSolved, isAlreadySolved = false }: PuzzleModalProps) {
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    if (location) {
      setSolved(isAlreadySolved);
    }
  }, [location, isAlreadySolved]);

  if (!location) return null;

  const handlePuzzleSolved = () => {
    setSolved(true);
    onPuzzleSolved(location.id);
  };

  const handleClose = () => {
    onClose();
  };

  const renderPuzzleComponent = () => {
    switch (location.puzzleType) {
      case 'trivia':
        return <TriviaQuiz puzzleData={location.puzzleData as { questions: { question: string; options: string[]; correctAnswer: number; }[]; title?: string; description?: string; }} onSolved={handlePuzzleSolved} />;
      case 'tictactoe':
        return <TicTacToe puzzleData={location.puzzleData} onSolved={handlePuzzleSolved} />;
      case 'sudoku':
        return <SudokuBoard onSolved={handlePuzzleSolved} />;
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
        <p className="mb-6 text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">{location.unlockContent.text}</p>
        
        {location.unlockContent.mediaUrl && (
          <div className="my-4">
            {location.unlockContent.mediaType === 'image' && (
              <div className="relative w-full h-64">
                <Image 
                  src={location.unlockContent.mediaUrl} 
                  alt={location.unlockContent.title}
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
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[var(--card)] rounded-xl shadow-2xl border border-[var(--neutral-200)] dark:border-[var(--neutral-800)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-[var(--neutral-200)] dark:border-[var(--neutral-800)]">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {location.name}
                </h2>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-lg hover:bg-[var(--neutral-100)] dark:hover:bg-[var(--neutral-800)] transition-colors"
                >
                  <X className="w-5 h-5 text-[var(--neutral-600)] dark:text-[var(--neutral-400)]" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {!solved ? renderPuzzleComponent() : renderUnlockedContent()}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[var(--neutral-200)] dark:border-[var(--neutral-800)]">
              <button
                onClick={handleClose}
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 