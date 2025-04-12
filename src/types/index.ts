export interface EventLocation {
  id: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
  timeframe: string;
  puzzleType: 'trivia' | 'sudoku' | 'crossword' | 'memory' | 'puzzle' | 'tictactoe';
  puzzleData: {
    title?: string;
    description?: string;
    questions?: Array<{
      question: string;
      options: string[];
      correctAnswer: number;
    }>;
    [key: string]: unknown;
  };
  unlockContent: {
    title: string;
    text: string;
    mediaUrl?: string;
    mediaType?: 'image' | 'video' | 'audio';
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  isUnlocked: boolean;
  icon: string;
}

export interface Timeframe {
  id: string;
  label: string;
  period: string;
}

export type PuzzleType = 'trivia' | 'sudoku' | 'crossword' | 'memory' | 'puzzle' | 'tictactoe'; 