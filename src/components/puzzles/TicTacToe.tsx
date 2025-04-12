'use client';
import { useEffect, useState } from 'react';

interface TicTacToeProps {
  puzzleData: {
    title?: string;
    description?: string;
    [key: string]: unknown;
  };
  onSolved: () => void;
}

const TicTacToe = ({ puzzleData, onSolved }: TicTacToeProps) => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  const checkWinner = (b: string[]) => {
    for (const [a, bIdx, c] of lines) {
      if (b[a] && b[a] === b[bIdx] && b[a] === b[c]) return b[a];
    }
    if (!b.includes('')) return 'Draw';
    return null;
  };

  const minimax = (newBoard: string[], isMaximizing: boolean): number => {
    const result = checkWinner(newBoard);
    if (result === 'O') return 1;
    if (result === 'X') return -1;
    if (result === 'Draw') return 0;

    const scores: number[] = [];

    newBoard.forEach((cell, i) => {
      if (cell === '') {
        newBoard[i] = isMaximizing ? 'O' : 'X';
        const score = minimax(newBoard, !isMaximizing);
        scores.push(score);
        newBoard[i] = '';
      }
    });

    return isMaximizing ? Math.max(...scores) : Math.min(...scores);
  };

  const bestMove = (currentBoard: string[]) => {
    let bestScore = -Infinity;
    let move = -1;

    currentBoard.forEach((cell, i) => {
      if (cell === '') {
        currentBoard[i] = 'O';
        const score = minimax(currentBoard, false);
        currentBoard[i] = '';
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    });

    return move;
  };

  const handleClick = (i: number) => {
    if (!isUserTurn || board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = 'X';
    setBoard(newBoard);
    setIsUserTurn(false);
  };

  useEffect(() => {
    const result = checkWinner(board);
    if (result) {
      setWinner(result);
      // If the computer wins (O) or it's a draw, trigger the puzzle solved event
      if (result === 'O' || result === 'Draw') {
        onSolved();
      }
      return;
    }

    if (!isUserTurn) {
      const move = bestMove(board);
      if (move !== -1) {
        const newBoard = [...board];
        newBoard[move] = 'O';
        setTimeout(() => {
          setBoard(newBoard);
          setIsUserTurn(true);
        }, 300); // delay for realism
      }
    }
  }, [board, isUserTurn, onSolved]);

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setIsUserTurn(true);
    setWinner(null);
  };

  return (
    <div className="p-4">
      {puzzleData.title && (
        <h3 className="text-xl font-bold mb-2 text-[var(--foreground)]">{puzzleData.title}</h3>
      )}
      
      {puzzleData.description && (
        <p className="mb-4 text-[var(--neutral-600)]">{puzzleData.description}</p>
      )}

      <div className="flex flex-col items-center justify-center gap-4">
        <div className="grid grid-cols-3 gap-2 bg-[var(--neutral-200)] p-4 rounded-lg shadow-inner">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              disabled={Boolean(cell) || winner !== null}
              className={`w-20 h-20 text-3xl font-bold flex items-center justify-center rounded-lg transition-all duration-200 ${
                cell === 'X' 
                  ? 'bg-[var(--accent)] text-[var(--primary)] hover:bg-[var(--primary-light)]' 
                  : cell === 'O'
                  ? 'bg-[var(--accent)] text-[var(--primary-dark)] hover:bg-[var(--primary-light)]'
                  : 'bg-[var(--secondary)] hover:bg-[var(--neutral-100)]'
              } ${!cell && !winner ? 'hover:shadow-md' : ''}`}
            >
              {cell}
            </button>
          ))}
        </div>
        
        <div className="text-lg font-medium text-[var(--foreground)]">
          {winner
            ? winner === 'Draw'
              ? "It's a draw!"
              : `Winner: ${winner}`
            : isUserTurn
            ? 'Your turn (X)'
            : 'Computer is thinking...'}
        </div>
        
        <button
          onClick={resetGame}
          className="px-6 py-2 bg-[var(--primary)] text-[var(--secondary)] rounded-lg hover:bg-[var(--primary-dark)] transition-colors duration-200"
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;