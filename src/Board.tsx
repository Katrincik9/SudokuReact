import { useContext } from "react";
import type { BoardData, CellData } from "./types/sudoku";
import { GameContext } from "./types/GameContext";

export default function Board({board} : {board : BoardData}) {
  return (
    <div className="board">
      {board.map((row, rowIndex) => {
        return row.map((column, columnIndex) => {
          return <Cell key={`${rowIndex}-${columnIndex}`} cell={column} row={rowIndex} column={columnIndex}/>;
        });
      })}
    </div>
  )
}

function Cell({cell, row, column} : {cell : CellData; row : number; column : number}) {
  const isEntered = !cell.isFixed && cell.value !== null
  const cellContext = useContext(GameContext)
  if (cellContext === null) {
    throw new Error("No saved context")
  } 
  const selectedCell = cellContext.selectedCell
  const handleCellClick = cellContext.handleCellClick
  const isSelected = selectedCell.row === row && selectedCell.column === column
  const isSameRow = selectedCell.row === row 
  const isSameColumn = selectedCell.column === column
  const isSameBox = Math.floor(row / 3) === Math.floor(selectedCell.row / 3) 
    && Math.floor(column/ 3) === Math.floor(selectedCell.column/ 3)
  const className = [
    "board-cell",
    isSelected && "selected",
    (isSameRow || isSameColumn || isSameBox) && "highlighted",
    isEntered && "entered",
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