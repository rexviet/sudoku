import { solve, countSolutions } from './solver.js';
import { isValidPlacement, findEmptyCell } from './utils.js';

const DIFFICULTY_CONFIG = {
  Easy: { min: 38, max: 45 },
  Medium: { min: 30, max: 37 },
  Hard: { min: 26, max: 29 },
  Expert: { min: 22, max: 25 },
  Master: { min: 19, max: 21 },
  Extreme: { min: 17, max: 18 }
};

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function solveBoard(board) {
  const empty = findEmptyCell(board);
  if (!empty) return true;

  const { row, col } = empty;
  const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  
  for (const num of numbers) {
    if (isValidPlacement(board, row, col, num)) {
      board[row][col] = num;
      if (solveBoard(board)) {
        return true;
      }
      board[row][col] = 0;
    }
  }

  return false;
}

function fillDiagonalBoxes(board) {
  for (let box = 0; box < 3; box++) {
    const row = box * 3;
    const col = box * 3;
    const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    let idx = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board[row + i][col + j] = numbers[idx++];
      }
    }
  }
}

export function generateSolution() {
  const board = Array(9).fill(null).map(() => Array(9).fill(0));
  
  fillDiagonalBoxes(board);
  solveBoard(board);
  
  return board;
}

function getClueCount(difficulty) {
  const config = DIFFICULTY_CONFIG[difficulty];
  if (!config) {
    return 36;
  }
  return Math.floor(Math.random() * (config.max - config.min + 1)) + config.min;
}

function getAllEmptyCells(board) {
  const cells = [];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] !== 0) {
        cells.push({ row, col });
      }
    }
  }
  return shuffle(cells);
}

export function generatePuzzle(difficulty = 'Medium') {
  const solution = generateSolution();
  const puzzle = solution.map(row => [...row]);
  
  const targetClues = getClueCount(difficulty);
  const cellsToRemove = 81 - targetClues;
  
  const emptyCells = getAllEmptyCells(puzzle);
  
  for (let i = 0; i < cellsToRemove; i++) {
    const { row, col } = emptyCells[i];
    const removedValue = puzzle[row][col];
    puzzle[row][col] = 0;
    
    const solutionCopy = puzzle.map(r => [...r]);
    const numSolutions = countSolutions(solutionCopy, 2);
    
    if (numSolutions !== 1) {
      puzzle[row][col] = removedValue;
    }
  }

  return {
    puzzle,
    solution,
    difficulty,
    clues: targetClues
  };
}
