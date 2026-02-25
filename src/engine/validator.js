import { isValidPlacementWithZero, isValidPlacement } from './utils.js';

export function isValidMove(board, row, col, num) {
  if (!board || board.length !== 9 || board[0].length !== 9) {
    return false;
  }

  if (row < 0 || row > 8 || col < 0 || col > 8) {
    return false;
  }

  if (num < 0 || num > 9) {
    return false;
  }

  return isValidPlacementWithZero(board, row, col, num);
}

export function isBoardComplete(board) {
  if (!board || board.length !== 9 || board[0].length !== 9) {
    return false;
  }

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        return false;
      }
    }
  }

  return isBoardValid(board);
}

function isBoardValid(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const num = board[row][col];
      if (num !== 0) {
        board[row][col] = 0;
        if (!isValidPlacement(board, row, col, num)) {
          board[row][col] = num;
          return false;
        }
        board[row][col] = num;
      }
    }
  }
  return true;
}

export function getConflicts(board, row, col) {
  const conflicts = [];
  
  if (!board || board.length !== 9 || board[0].length !== 9) {
    return conflicts;
  }

  if (row < 0 || row > 8 || col < 0 || col > 8) {
    return conflicts;
  }

  const num = board[row][col];
  if (num === 0) {
    return conflicts;
  }

  for (let i = 0; i < 9; i++) {
    if (i !== col && board[row][i] === num) {
      conflicts.push({ row, col: i });
    }
    if (i !== row && board[i][col] === num) {
      conflicts.push({ row: i, col });
    }
  }

  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const r = boxRow + i;
      const c = boxCol + j;
      if ((r !== row || c !== col) && board[r][c] === num) {
        conflicts.push({ row: r, col: c });
      }
    }
  }

  return conflicts;
}
