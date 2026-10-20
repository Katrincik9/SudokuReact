import { useGameContext } from "../../types/GameContext";
import type { CellData } from "../../types/sudoku";
import './css/Cell.css';

export default function Cell({cell, row, column} : {cell : CellData; row : number; column : number}) {
  const { board } = useGameContext()
  const isEntered = !cell.isFixed && cell.value !== null
  const {selectedCell, handleCellClick} = useGameContext()
  const isSelected = selectedCell.row === row && selectedCell.column === column
  const isSameRow = selectedCell.row === row 
  const isSameColumn = selectedCell.column === column
  const isSameBox = Math.floor(row / 3) === Math.floor(selectedCell.row / 3) 
    && Math.floor(column/ 3) === Math.floor(selectedCell.column/ 3)
  const isSameValue = board[selectedCell.row][selectedCell.column].value === cell.value
  const className = [
    "board-cell",
    isSelected && "selected",
    (isSameRow || isSameColumn || isSameBox) && "highlighted",
    isEntered && "entered",
    isSameValue && "same-value"
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