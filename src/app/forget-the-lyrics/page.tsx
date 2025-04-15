'use client';

import { useState, useEffect } from 'react';

interface Song {
  title: string;
  artist: string;
  lyrics: string[];
  missingWord: number;
}

const ForgetTheLyrics = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const songs: Song[] = [
    {
      title: "Bohemian Rhapsody",
      artist: "Queen",
      lyrics: [
        "Is this the real life?",
        "Is this just fantasy?",
        "Caught in a landslide",
        "No escape from reality",
        "Open your eyes",
        "Look up to the skies and see",
        "I&apos;m just a poor boy, I need no sympathy",
        "Because I&apos;m easy come, easy go",
        "Little high, little low",
        "Any way the wind blows doesn&apos;t really matter to me, to me"
      ],
      missingWord: 2
    },
    {
      title: "Imagine",
      artist: "John Lennon",
      lyrics: [
        "Imagine there&apos;s no heaven",
        "It&apos;s easy if you try",
        "No hell below us",
        "Above us only sky",
        "Imagine all the people",
        "Living for today",
        "Imagine there&apos;s no countries",
        "It isn&apos;t hard to do",
        "Nothing to kill or die for",
        "And no religion too"
      ],
      missingWord: 5
    },
    {
      title: "Sweet Child O&apos; Mine",
      artist: "Guns N&apos; Roses",
      lyrics: [
        "She&apos;s got a smile that it seems to me",
        "Reminds me of childhood memories",
        "Where everything was as fresh as the bright blue sky",
        "Now and then when I see her face",
        "She takes me away to that special place",
        "And if I stared too long, I&apos;d probably break down and cry",
        "Whoa, oh, oh",
        "Sweet child o&apos; mine",
        "Whoa, oh, oh, oh",
        "Sweet love of mine"
      ],
      missingWord: 7
    }
  ];

  const startNewGame = () => {
    const randomSong = songs[Math.floor(Math.random() * songs.length)];
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
        <h1 className="text-4xl font-bold text-center mb-8">N&apos;oubliez pas les paroles</h1>
        
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