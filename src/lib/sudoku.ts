type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

interface SudokuBoard {
  puzzle: number[][];
  solution: number[][];
}

const EMPTY_CELL = 0;

export function generateSudoku(difficulty: Difficulty): SudokuBoard {
  // Create an empty board
  const board = Array(9).fill(0).map(() => Array(9).fill(EMPTY_CELL));
  
  // Fill the board with a valid solution
  fillBoard(board);
  
  // Create a copy of the solution
  const solution = board.map(row => [...row]);
  
  // Remove numbers based on difficulty
  const cluesToRemove = getCluesToRemove(difficulty);
  removeNumbers(board, cluesToRemove);
  
  return { puzzle: board, solution };
}

function getCluesToRemove(difficulty: Difficulty): number {
  switch (difficulty) {
    case 'easy': return Math.floor(Math.random() * (49 - 36 + 1)) + 36;
    case 'medium': return Math.floor(Math.random() * (35 - 32 + 1)) + 32;
    case 'hard': return Math.floor(Math.random() * (31 - 28 + 1)) + 28;
    case 'expert': return Math.floor(Math.random() * (27 - 20 + 1)) + 20;
  }
}

function fillBoard(board: number[][]): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === EMPTY_CELL) {
        const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        
        for (const num of numbers) {
          if (isValidPlacement(board, row, col, num)) {
            board[row][col] = num;
            
            if (fillBoard(board)) {
              return true;
            }
            
            board[row][col] = EMPTY_CELL;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function removeNumbers(board: number[][], cluesToRemove: number): void {
  const positions = Array.from({ length: 81 }, (_, i) => i);
  shuffle(positions);
  
  for (let i = 0; i < cluesToRemove; i++) {
    const pos = positions[i];
    const row = Math.floor(pos / 9);
    const col = pos % 9;
    board[row][col] = EMPTY_CELL;
  }
}

function isValidPlacement(board: number[][], row: number, col: number, num: number): boolean {
  // Check row
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) return false;
  }
  
  // Check column
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) return false;
  }
  
  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxRow + i][boxCol + j] === num) return false;
    }
  }
  
  return true;
}

function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function checkBoard(board: number[][]): boolean {
  // Check rows
  for (let row = 0; row < 9; row++) {
    const seen = new Set();
    for (let col = 0; col < 9; col++) {
      const num = board[row][col];
      if (num === EMPTY_CELL) return false;
      if (seen.has(num)) return false;
      seen.add(num);
    }
  }
  
  // Check columns
  for (let col = 0; col < 9; col++) {
    const seen = new Set();
    for (let row = 0; row < 9; row++) {
      const num = board[row][col];
      if (seen.has(num)) return false;
      seen.add(num);
    }
  }
  
  // Check 3x3 boxes
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const seen = new Set();
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const num = board[boxRow * 3 + row][boxCol * 3 + col];
          if (seen.has(num)) return false;
          seen.add(num);
        }
      }
    }
  }
  
  return true;
}

export function getConflicts(board: number[][], row: number, col: number): number[][] {
  const conflicts: number[][] = [];
  const num = board[row][col];
  
  if (num === EMPTY_CELL) return conflicts;
  
  // Check row
  for (let i = 0; i < 9; i++) {
    if (i !== col && board[row][i] === num) {
      conflicts.push([row, i]);
    }
  }
  
  // Check column
  for (let i = 0; i < 9; i++) {
    if (i !== row && board[i][col] === num) {
      conflicts.push([i, col]);
    }
  }
  
  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const r = boxRow + i;
      const c = boxCol + j;
      if (r !== row && c !== col && board[r][c] === num) {
        conflicts.push([r, c]);
      }
    }
  }
  
  return conflicts;
} 