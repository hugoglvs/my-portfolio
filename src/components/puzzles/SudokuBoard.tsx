import { useState, useEffect, useCallback } from 'react';
import { generateSudoku, checkBoard, getConflicts } from '@/lib/sudoku';

type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

interface SudokuBoardProps {
  onSolved?: () => void;
}

export default function SudokuBoard({ onSolved }: SudokuBoardProps) {
  const [board, setBoard] = useState<number[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [conflicts, setConflicts] = useState<number[][]>([]);
  const [initialCells, setInitialCells] = useState<Set<string>>(new Set());

  const checkAndHandleSolved = useCallback((currentBoard: number[][]) => {
    if (checkBoard(currentBoard)) {
      if (onSolved) {
        onSolved();
      }
      return true;
    }
    return false;
  }, [onSolved]);

  const generateNewGame = useCallback(() => {
    const { puzzle, solution } = generateSudoku(difficulty);
    setBoard(puzzle);
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
  }, [difficulty]);

  useEffect(() => {
    generateNewGame();
  }, [generateNewGame]);

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
      
      // Check for conflicts
      const newConflicts = getConflicts(newBoard, row, col);
      setConflicts(newConflicts);

      // Check if the puzzle is solved
      checkAndHandleSolved(newBoard);
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      const newBoard = [...board];
      newBoard[row][col] = 0;
      setBoard(newBoard);
      setConflicts([]);
    }
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

    // Check if the puzzle is solved after using a hint
    checkAndHandleSolved(newBoard);
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
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex gap-4">
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as Difficulty)}
          className="px-4 py-2 border border-[var(--neutral-300)] rounded bg-[var(--background)] text-[var(--foreground)]"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="expert">Expert</option>
        </select>
        
        <button
          onClick={generateNewGame}
          className="px-4 py-2 bg-[var(--primary)] text-[var(--secondary)] rounded hover:bg-[var(--primary-dark)]"
        >
          New Game
        </button>
        
        <button
          onClick={() => {
            if (checkAndHandleSolved(board)) {
              alert('Congratulations! You solved the puzzle!');
            } else {
              alert('Incorrect! Keep trying!');
            }
          }}
          className="px-4 py-2 bg-[var(--primary-light)] text-[var(--secondary)] rounded hover:bg-[var(--primary)]"
        >
          Check
        </button>
        
        <button
          onClick={handleHint}
          className="px-4 py-2 bg-[var(--primary-dark)] text-[var(--secondary)] rounded hover:bg-[var(--primary)]"
        >
          Hint
        </button>
      </div>

      <div
        className="grid grid-cols-9 gap-0 border-2 border-[var(--neutral-800)] outline-none"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        onFocus={(e) => {
          // Ensure the board is focused when clicked
          e.currentTarget.focus();
        }}
      >
        {board.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`
                w-12 h-12 flex items-center justify-center border
                ${i % 3 === 0 ? 'border-t-2' : 'border-t'}
                ${j % 3 === 0 ? 'border-l-2' : 'border-l'}
                ${isSelected(i, j) ? 'bg-[var(--accent)]' : ''}
                ${isInSelectedRegion(i, j) && !isSelected(i, j) ? 'bg-[var(--neutral-100)]' : ''}
                ${isConflict(i, j) ? 'bg-[var(--accent)]' : ''}
                ${initialCells.has(`${i},${j}`) ? 'font-bold text-[var(--foreground)]' : 'text-[var(--neutral-600)]'}
                cursor-pointer
              `}
              onClick={() => {
                handleCellClick(i, j);
                // Ensure the board maintains focus after clicking a cell
                const boardElement = document.querySelector('.grid');
                if (boardElement) {
                  (boardElement as HTMLElement).focus();
                }
              }}
            >
              {cell !== 0 ? cell : ''}
            </div>
          ))
        )}
      </div>
    </div>
  );
} 