'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

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
const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
];

export default function Wordle({ puzzleData, onSolved }: WordleProps) {
  const word = puzzleData.word.toUpperCase();
  const [attempts, setAttempts] = useState<string[]>([]);
  const [currentAttempt, setCurrentAttempt] = useState('');
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [showVictory, setShowVictory] = useState(false);
  const [keyboardState, setKeyboardState] = useState<Record<string, 'correct' | 'present' | 'absent'>>({});
  const inputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    // Mettre à jour l'état du clavier après chaque tentative
    const newKeyboardState: Record<string, 'correct' | 'present' | 'absent'> = {};
    attempts.forEach(attempt => {
      attempt.split('').forEach((letter, i) => {
        if (letter === word[i]) {
          newKeyboardState[letter] = 'correct';
        } else if (word.includes(letter) && newKeyboardState[letter] !== 'correct') {
          newKeyboardState[letter] = 'present';
        } else if (!newKeyboardState[letter]) {
          newKeyboardState[letter] = 'absent';
        }
      });
    });
    setKeyboardState(newKeyboardState);
  }, [attempts, word]);

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

  const renderKeyboard = () => (
    <div className="flex flex-col gap-2 w-full max-w-md">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1">
          {row.map((key) => {
            const isSpecialKey = key === 'ENTER' || key === '⌫';
            const keyState = keyboardState[key];
            return (
              <button
                key={key}
                onClick={() => handleKeyPress(key === '⌫' ? 'BACKSPACE' : key)}
                className={`
                  flex-1 h-12 min-w-[30px] flex items-center justify-center rounded
                  text-sm font-bold uppercase
                  ${isSpecialKey ? 'flex-[1.5]' : ''}
                  ${keyState === 'correct' ? 'bg-green-500 text-white' :
                    keyState === 'present' ? 'bg-yellow-500 text-white' :
                    keyState === 'absent' ? 'bg-gray-500 text-white' :
                    'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}
                  hover:opacity-90 transition-opacity
                `}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-2xl font-bold text-[var(--foreground)]">{puzzleData.title}</h2>
      <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">{puzzleData.description}</p>

      {/* Champ de saisie invisible pour ouvrir le clavier natif */}
      <input
        ref={inputRef}
        type="text"
        value={currentAttempt}
        onChange={(e) => {
          const value = e.target.value.toUpperCase();
          if (value.length <= WORD_LENGTH && /^[A-Z]*$/.test(value)) {
            setCurrentAttempt(value);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && currentAttempt.length === WORD_LENGTH) {
            e.preventDefault();
            handleKeyPress('ENTER');
          } else if (e.key === 'Backspace') {
            e.preventDefault();
            handleKeyPress('BACKSPACE');
          }
        }}
        className="absolute opacity-0 w-0 h-0"
        autoFocus
        maxLength={WORD_LENGTH}
        pattern="[A-Z]*"
        inputMode="text"
      />

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

      {renderKeyboard()}

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