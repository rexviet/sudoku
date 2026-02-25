import { isValidPlacement, findEmptyCell } from './utils.js';

function solveBoard(board) {
  const empty = findEmptyCell(board);
  if (!empty) return true;

  const { row, col } = empty;
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
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

export function solve(board) {
  if (!board || board.length !== 9 || board[0].length !== 9) {
    return null;
  }

  const boardCopy = board.map(row => [...row]);

  if (!solveBoard(boardCopy)) {
    return null;
  }

  return boardCopy;
}

function countSolutionsBoard(board, count, limit) {
  if (count[0] > limit) return;

  const empty = findEmptyCell(board);
  if (!empty) {
    count[0]++;
    return;
  }

  const { row, col } = empty;

  for (let num = 1; num <= 9; num++) {
    if (isValidPlacement(board, row, col, num)) {
      board[row][col] = num;
      countSolutionsBoard(board, count, limit);
      board[row][col] = 0;
      if (count[0] > limit) return;
    }
  }
}

export function countSolutions(board, limit = 2) {
  if (!board || board.length !== 9 || board[0].length !== 9) {
    return 0;
  }

  const boardCopy = board.map(row => [...row]);
  const count = [0];
  countSolutionsBoard(boardCopy, count, limit);

  return count[0];
}

export function getHint(board, solution) {
  if (!board || !solution || board.length !== 9) {
    return null;
  }

  const emptyCells = [];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        emptyCells.push({ row, col });
      }
    }
  }

  if (emptyCells.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const { row, col } = emptyCells[randomIndex];

  return {
    row,
    col,
    value: solution[row][col]
  };
}
