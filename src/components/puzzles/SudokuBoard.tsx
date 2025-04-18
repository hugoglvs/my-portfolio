import { useState, useEffect, useCallback } from 'react';
import { generateSudoku, checkBoard, getConflicts } from '@/lib/sudoku';
import { motion, AnimatePresence } from 'framer-motion';

type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

interface SudokuBoardProps {
  puzzleData?: {
    title?: string;
    description?: string;
    difficulty?: Difficulty;
    [key: string]: unknown;
  };
  onSolved?: () => void;
}

const difficultyColors = {
  easy: 'bg-green-500',
  medium: 'bg-yellow-500',
  hard: 'bg-orange-500',
  expert: 'bg-red-500'
};

const difficultyLabels = {
  easy: 'Facile',
  medium: 'Moyen',
  hard: 'Difficile',
  expert: 'Expert'
};

export default function SudokuBoard({ puzzleData, onSolved }: SudokuBoardProps) {
  const [board, setBoard] = useState<number[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [conflicts, setConflicts] = useState<number[][]>([]);
  const [initialCells, setInitialCells] = useState<Set<string>>(new Set());
  const [initialBoard, setInitialBoard] = useState<number[][]>([]);
  const [showMessage, setShowMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const showAlert = (type: 'success' | 'error', text: string) => {
    setShowMessage({ type, text });
    setTimeout(() => setShowMessage(null), 3000);
  };

  const checkAndHandleSolved = useCallback((currentBoard: number[][]) => {
    if (checkBoard(currentBoard)) {
      if (onSolved) {
        onSolved();
      }
      showAlert('success', 'Félicitations ! Vous avez résolu la grille !');
      return true;
    }
    showAlert('error', 'Solution incorrecte ! Continuez à essayer !');
    return false;
  }, [onSolved]);

  const generateNewGame = useCallback(() => {
    const { puzzle, solution } = generateSudoku(puzzleData?.difficulty || 'medium');
    // Create a deep copy of the puzzle for the initial board
    const initialPuzzle = puzzle.map(row => [...row]);
    setBoard(puzzle);
    setInitialBoard(initialPuzzle);
    setSolution(solution);
    setSelectedCell(null);
    setConflicts([]);
    
    // Store initial cells
    const initial = new Set<string>();
    puzzle.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell !== 0) {
          initial.add(`${i},${j}`);
        }
      });
    });
    setInitialCells(initial);
  }, [puzzleData?.difficulty]);

  useEffect(() => {
    generateNewGame();
  }, [generateNewGame]);

  const handleClear = useCallback(() => {
    // Create a deep copy of the initial board
    const newBoard = initialBoard.map(row => [...row]);
    setBoard(newBoard);
    setConflicts([]);
    setSelectedCell(null);
  }, [initialBoard]);

  const handleCellClick = (row: number, col: number) => {
    if (initialCells.has(`${row},${col}`)) return;
    setSelectedCell([row, col]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Prevent default behavior for all key events
    e.preventDefault();

    if (!selectedCell) {
      // If no cell is selected, select the first empty cell or the first cell
      const firstEmptyCell = findFirstEmptyCell();
      if (firstEmptyCell) {
        setSelectedCell(firstEmptyCell);
      } else {
        setSelectedCell([0, 0]);
      }
      return;
    }
    
    const [row, col] = selectedCell;

    // Handle arrow key navigation
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      let newRow = row;
      let newCol = col;

      switch (e.key) {
        case 'ArrowUp':
          newRow = Math.max(0, row - 1);
          break;
        case 'ArrowDown':
          newRow = Math.min(8, row + 1);
          break;
        case 'ArrowLeft':
          newCol = Math.max(0, col - 1);
          break;
        case 'ArrowRight':
          newCol = Math.min(8, col + 1);
          break;
      }

      setSelectedCell([newRow, newCol]);
      return;
    }

    if (initialCells.has(`${row},${col}`)) return;

    if (e.key >= '1' && e.key <= '9') {
      const newBoard = [...board];
      newBoard[row][col] = parseInt(e.key);
      setBoard(newBoard);
      
      // Check for conflicts in real-time
      const newConflicts = getConflicts(newBoard, row, col);
      setConflicts(newConflicts);

      // Check if the board is full and if it's solved
      if (isBoardFull(newBoard)) {
        if (checkAndHandleSolved(newBoard)) {
          alert('Félicitations ! Vous avez résolu la grille !');
        } else {
          alert('Solution incorrecte ! Continuez à essayer !');
        }
      }
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      const newBoard = [...board];
      newBoard[row][col] = 0;
      setBoard(newBoard);
      
      // Recheck conflicts after clearing a cell
      const newConflicts = getConflicts(newBoard, row, col);
      setConflicts(newConflicts);
    }
  };

  const isBoardFull = (currentBoard: number[][]) => {
    return currentBoard.every(row => row.every(cell => cell !== 0));
  };

  const findFirstEmptyCell = (): [number, number] | null => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0 && !initialCells.has(`${i},${j}`)) {
          return [i, j];
        }
      }
    }
    return null;
  };

  const handleHint = () => {
    if (!selectedCell) return;
    
    const [row, col] = selectedCell;
    if (initialCells.has(`${row},${col}`)) return;
    
    const newBoard = [...board];
    newBoard[row][col] = solution[row][col];
    setBoard(newBoard);

    // Recheck conflicts after using a hint
    const newConflicts = getConflicts(newBoard, row, col);
    setConflicts(newConflicts);

    // Check if the puzzle is solved after using a hint
    if (isBoardFull(newBoard)) {
      checkAndHandleSolved(newBoard);
    }
  };

  const isSelected = (row: number, col: number) => {
    if (!selectedCell) return false;
    return selectedCell[0] === row && selectedCell[1] === col;
  };

  const isInSelectedRegion = (row: number, col: number) => {
    if (!selectedCell) return false;
    const [selectedRow, selectedCol] = selectedCell;
    return (
      row === selectedRow ||
      col === selectedCol ||
      (Math.floor(row / 3) === Math.floor(selectedRow / 3) &&
       Math.floor(col / 3) === Math.floor(selectedCol / 3))
    );
  };

  const isConflict = (row: number, col: number) => {
    return conflicts.some(([r, c]) => r === row && c === col);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-[var(--card)] rounded-lg shadow-lg">
      <div className="flex flex-col items-center gap-2">
        {puzzleData?.title && (
          <h3 className="text-2xl font-bold text-[var(--foreground)]">{puzzleData.title}</h3>
        )}
        
        {puzzleData?.difficulty && (
          <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${difficultyColors[puzzleData.difficulty]}`}>
            {difficultyLabels[puzzleData.difficulty]}
          </div>
        )}
        
        {puzzleData?.description && (
          <p className="text-[var(--neutral-600)] text-center max-w-md">{puzzleData.description}</p>
        )}
      </div>

      <div
        className="grid grid-cols-9 gap-0 border-2 border-[var(--neutral-800)] rounded-lg overflow-hidden outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all duration-200"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        onFocus={(e) => {
          e.currentTarget.focus();
        }}
      >
        {board.map((row, i) =>
          row.map((cell, j) => (
            <motion.div
              key={`${i}-${j}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className={`
                w-12 h-12 flex items-center justify-center border
                ${i % 3 === 0 ? 'border-t-2' : 'border-t'}
                ${j % 3 === 0 ? 'border-l-2' : 'border-l'}
                ${isSelected(i, j) ? 'bg-[var(--accent)]' : ''}
                ${isInSelectedRegion(i, j) && !isSelected(i, j) ? 'bg-[var(--neutral-200)] dark:bg-[var(--neutral-800)]' : ''}
                ${isConflict(i, j) ? 'text-red-500' : ''}
                ${initialCells.has(`${i},${j}`) ? 'font-bold text-[var(--foreground)]' : 'text-[var(--neutral-600)]'}
                cursor-pointer transition-colors duration-200
                hover:bg-[var(--neutral-200)] dark:hover:bg-[var(--neutral-800)]
              `}
              onClick={() => {
                handleCellClick(i, j);
                const boardElement = document.querySelector('.grid');
                if (boardElement instanceof HTMLElement) {
                  boardElement.focus();
                }
              }}
            >
              {cell !== 0 && cell}
            </motion.div>
          ))
        )}
      </div>

      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClear}
          className="px-4 py-2 bg-gradient-to-r from-[var(--primary-light)] to-[var(--primary)] text-[var(--secondary)] rounded-lg hover:from-[var(--primary)] hover:to-[var(--primary-dark)] transition-all duration-300 flex items-center gap-2 shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Effacer
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleHint}
          className="px-4 py-2 bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary)] text-[var(--secondary)] rounded-lg hover:from-[var(--primary)] hover:to-[var(--primary-light)] transition-all duration-300 flex items-center gap-2 shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Indice
        </motion.button>
      </div>

      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white ${
              showMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {showMessage.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 