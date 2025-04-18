'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Song {
  title: string;
  artist: string;
  lyrics: string[];
  missingWord: number;
}

interface ForgetTheLyricsProps {
  puzzleData: {
    title: string;
    description: string;
    songs: Song[];
  };
  onSolved: () => void;
}

const ForgetTheLyrics = ({ puzzleData, onSolved }: ForgetTheLyricsProps) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const startNewGame = () => {
    const randomSong = puzzleData.songs[Math.floor(Math.random() * puzzleData.songs.length)];
    setCurrentSong(randomSong);
    setUserAnswer('');
    setShowAnswer(false);
    setIsCorrect(null);
  };

  const checkAnswer = () => {
    if (!currentSong) return;
    
    setIsChecking(true);
    const correctAnswer = currentSong.lyrics[currentSong.missingWord].toLowerCase();
    const isAnswerCorrect = userAnswer.toLowerCase() === correctAnswer;
    setIsCorrect(isAnswerCorrect);
    setShowAnswer(true);
    
    if (isAnswerCorrect) {
      setTimeout(() => {
        onSolved();
      }, 800);
    }
    
    setTimeout(() => {
      setIsChecking(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  useEffect(() => {
    startNewGame();
  }, []);

  if (!currentSong) return null;

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-2xl font-bold text-[var(--foreground)]">{puzzleData.title}</h2>
      <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">{puzzleData.description}</p>
      
      <div className="w-full max-w-2xl bg-[var(--card)] rounded-xl p-6 border border-[var(--neutral-200)] dark:border-[var(--neutral-800)]">
        <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">{currentSong.title}</h3>
        <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)] mb-6">{currentSong.artist}</p>
        
        <div className="space-y-4">
          {currentSong.lyrics.map((line, index) => (
            <p key={index} className="text-lg text-[var(--foreground)]">
              {index === currentSong.missingWord ? (
                <motion.input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  animate={isChecking ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  className={`w-full bg-[var(--background)] border border-[var(--neutral-200)] dark:border-[var(--neutral-800)] rounded-lg px-4 py-2 ${
                    showAnswer && !isCorrect ? 'text-red-500' : showAnswer && isCorrect ? 'text-green-500' : 'text-[var(--foreground)]'
                  } focus:outline-none focus:ring-2 focus:ring-[var(--primary)]`}
                  placeholder="Entrez le mot manquant"
                />
              ) : (
                line
              )}
            </p>
          ))}
        </div>

        {showAnswer && !isCorrect && (
          <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-center text-red-500">
              Dommage, ce n&apos;est pas la bonne réponse.
            </p>
          </div>
        )}
      </div>

      <div className="text-sm text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">
        Appuyez sur Entrée pour vérifier votre réponse
      </div>
    </div>
  );
};

export default ForgetTheLyrics; 