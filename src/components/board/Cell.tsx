import { useGameContext } from "../../context/GameContext";
import type { CellData } from "../../types/sudoku";
import { hasConflict } from "../../services/sudokuValidation";
import './css/Cell.css';

export function Cell({cell, row, column} : {cell : CellData; row : number; column : number}) {
  const { board, selectedCell, handleCellClick } = useGameContext()

  const isEntered = !cell.isFixed && cell.value !== null
  const isSelected = selectedCell.row === row && selectedCell.column === column
  const isSameRow = selectedCell.row === row 
  const isSameColumn = selectedCell.column === column
  const isSameBox = Math.floor(row / 3) === Math.floor(selectedCell.row / 3) 
    && Math.floor(column/ 3) === Math.floor(selectedCell.column/ 3)
  const selectedCellValue = board[selectedCell.row][selectedCell.column].value
  const isSameValue = selectedCellValue !== null && selectedCellValue === cell.value
  const isConflict = hasConflict({board, row, column})

  const className = [
    "board-cell",
    isSelected && "selected",
    (isSameRow || isSameColumn || isSameBox) && "highlighted",
    isEntered && "entered",
    isSameValue && "same-value",
    isConflict && "conflict"
  ].filter(Boolean).join(" ")

  return (
    <div className={className} onClick={() => handleCellClick(row, column)}>
      {cell.value !== null ? (
        <div className="cell-value">{cell.value}</div>
      ) : (
        <div className="cell-notes">
          {Array(9).fill(null).map((_, digitIndex) => {
            const digit = digitIndex + 1
            return <span key={digit}>{cell.notes.includes(digit) ? digit : ""}</span>
          })}
        </div>
      )}
    </div>
  )
} 