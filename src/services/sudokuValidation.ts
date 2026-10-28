import type { CellData } from "../types/sudoku";

export function isBoardWon({ board }: { board: CellData[][] }) {
  return board.every((row, rowIndex) =>
    row.every((cell, columnIndex) =>
      cell.value !== null && !hasConflict({ board, row: rowIndex, column: columnIndex })
    )
  );
}

type ConflictCheckProps = {
  board : CellData[][];
  row: number;
  column: number;
  currentCellValue : number
}

export function hasConflict({board, row, column} : {board : CellData[][]; row: number; column: number}) {
  const currentCellValue = board[row][column].value;
  if (currentCellValue === null) return false;
  const conflictCheckProps = { board, row, column, currentCellValue };
  return hasRowConflict(conflictCheckProps) || hasColumnConflict(conflictCheckProps) || hasBoxConflict(conflictCheckProps);
}

function hasRowConflict({board, row, column, currentCellValue} : ConflictCheckProps) {
  return board[row].some((cell, columnIndex) => 
    currentCellValue === cell.value && columnIndex !== column
  );
}

function hasColumnConflict({board, row, column, currentCellValue} : ConflictCheckProps) {
  return board.some((boardRow, rowIndex) => 
    currentCellValue === boardRow[column].value && rowIndex !== row
  );
}

function hasBoxConflict({board, row, column, currentCellValue} : ConflictCheckProps) {
  const boxStartRow = Math.floor(row / 3) * 3;
  const boxStartColumn = Math.floor(column / 3) * 3;
  for (let i=0; i<3; i++) {
    const checkedRow = boxStartRow + i;
    for (let j=0; j<3; j++) {
        const checkedColumn = boxStartColumn + j;
        if (board[checkedRow][checkedColumn].value === currentCellValue 
            && (checkedRow !== row || checkedColumn !== column)) {
          return true;
        }
    }
  }
  return false;
}

export function isBoxCompleted({ board, boxIndex }: { board: CellData[][]; boxIndex: number }) {
  const boxStartRow = Math.floor(boxIndex / 3) * 3;
  const boxStartColumn = (boxIndex % 3) * 3; 
  for (let i = 0; i < 3; i++) {
    const checkedRow = boxStartRow + i;
    for (let j = 0; j < 3; j++) {
      const checkedColumn = boxStartColumn + j;
      if (board[checkedRow][checkedColumn].value === null || hasConflict({ board, row: checkedRow, column: checkedColumn })) return false;
    }
  }
  return true;
}
