'use client';

import { useState, useEffect } from 'react';

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
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const startNewGame = () => {
    const randomSong = puzzleData.songs[Math.floor(Math.random() * puzzleData.songs.length)];
    setCurrentSong(randomSong);
    setUserAnswer('');
    setShowAnswer(false);
    setIsCorrect(null);
  };

  const checkAnswer = () => {
    if (!currentSong) return;
    
    const correctAnswer = currentSong.lyrics[currentSong.missingWord].toLowerCase();
    const isAnswerCorrect = userAnswer.toLowerCase() === correctAnswer;
    setIsCorrect(isAnswerCorrect);
    
    if (isAnswerCorrect) {
      setScore(score + 1);
      if (score + 1 >= 2) { // Gagner après 2 bonnes réponses
        onSolved();
      }
    }
    setShowAnswer(true);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  if (!currentSong) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">{puzzleData.title}</h1>
        <p className="text-xl text-center mb-8 text-gray-300">{puzzleData.description}</p>
        
        <div className="bg-white/10 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-2">{currentSong.title}</h2>
          <p className="text-xl text-gray-300 mb-6">{currentSong.artist}</p>
          
          <div className="space-y-4">
            {currentSong.lyrics.map((line, index) => (
              <p key={index} className="text-lg">
                {index === currentSong.missingWord ? (
                  showAnswer ? (
                    <span className={`${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                      {line}
                    </span>
                  ) : (
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="bg-white/20 border border-white/30 rounded px-2 py-1 w-64"
                      placeholder="Entrez le mot manquant"
                    />
                  )
                ) : (
                  line
                )}
              </p>
            ))}
          </div>

          {showAnswer && (
            <div className={`mt-4 p-4 rounded ${isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
              <p className="text-center">
                {isCorrect ? 'Bravo ! Bonne réponse !' : 'Dommage, ce n&apos;est pas la bonne réponse.'}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          {!showAnswer ? (
            <button
              onClick={checkAnswer}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              Vérifier
            </button>
          ) : (
            <button
              onClick={startNewGame}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              Nouvelle chanson
            </button>
          )}
          
          <div className="text-xl">
            Score: <span className="font-bold">{score}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetTheLyrics; 