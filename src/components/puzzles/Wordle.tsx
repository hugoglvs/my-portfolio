'use client';

import { useState, useEffect, useCallback } from 'react';

interface WordleProps {
  puzzleData: {
    title: string;
    description: string;
    word: string;
  };
  onSolved: () => void;
}

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

export default function Wordle({ puzzleData, onSolved }: WordleProps) {
  const word = puzzleData.word.toUpperCase();
  const [attempts, setAttempts] = useState<string[]>([]);
  const [currentAttempt, setCurrentAttempt] = useState('');
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [showVictory, setShowVictory] = useState(false);

  const handleKeyPress = useCallback((key: string) => {
    if (gameState !== 'playing') return;

    if (key === 'ENTER' && currentAttempt.length === WORD_LENGTH) {
      if (currentAttempt === word) {
        setGameState('won');
        setShowVictory(true);
        setTimeout(() => {
          onSolved();
        }, 1500);
      } else if (attempts.length === MAX_ATTEMPTS - 1) {
        setGameState('lost');
      }
      setAttempts([...attempts, currentAttempt]);
      setCurrentAttempt('');
    } else if (key === 'BACKSPACE') {
      setCurrentAttempt(currentAttempt.slice(0, -1));
    } else if (key.length === 1 && /^[A-Z]$/.test(key) && currentAttempt.length < WORD_LENGTH) {
      setCurrentAttempt(currentAttempt + key);
    }
  }, [currentAttempt, attempts, word, gameState, onSolved]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        e.preventDefault();
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        handleKeyPress('ENTER');
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleKeyPress('BACKSPACE');
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        handleKeyPress(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);

  const getLetterState = (letter: string, position: number, rowIndex: number) => {
    if (showVictory && rowIndex === attempts.length - 1) return 'correct';
    if (letter === word[position]) return 'correct';
    if (word.includes(letter)) {
      const countInWord = word.split('').filter(l => l === letter).length;
      const countMarked = attempts[rowIndex].split('').filter((l, i) => 
        l === letter && (l === word[i] || (l !== word[i] && word.includes(l) && i < position))
      ).length;
      
      if (countMarked < countInWord) return 'present';
    }
    return 'absent';
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-2xl font-bold text-[var(--foreground)]">{puzzleData.title}</h2>
      <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">{puzzleData.description}</p>

      <div className="flex flex-col gap-2">
        {[...Array(MAX_ATTEMPTS)].map((_, i) => {
          const attempt = attempts[i] || (i === attempts.length ? currentAttempt : '');
          const isCurrent = i === attempts.length;

          return (
            <div key={i} className="flex gap-2">
              {[...Array(WORD_LENGTH)].map((_, j) => {
                const letter = attempt[j] || '';
                const state = attempts[i] ? getLetterState(letter, j, i) : '';
                const isCurrentCell = isCurrent && j === currentAttempt.length;

                return (
                  <div
                    key={j}
                    className={`
                      w-12 h-12 flex items-center justify-center text-2xl font-bold rounded
                      ${state === 'correct' ? 'bg-green-500' : state === 'present' ? 'bg-yellow-500' : 'bg-gray-200 dark:bg-gray-700'}
                      ${state ? 'text-white' : 'text-gray-800 dark:text-gray-200'}
                      ${isCurrentCell ? 'border-2 border-blue-500' : ''}
                      transition-colors duration-300
                    `}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="text-sm text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">
        Utilisez votre clavier pour saisir les lettres. Appuyez sur Entrée pour valider.
      </div>

      {gameState === 'won' && !showVictory && (
        <div className="text-green-500 font-bold text-xl">
          Félicitations ! Vous avez trouvé le mot !
        </div>
      )}

      {gameState === 'lost' && (
        <div className="text-red-500 font-bold text-xl">
          Dommage ! Le mot était : {word}
        </div>
      )}
    </div>
  );
} 