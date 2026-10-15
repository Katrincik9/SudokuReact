import type { BoardData, CellData } from "./types/sudoku";

export default function Board({board, onSelectCell, selectedCell} : {board : BoardData; onSelectCell: (row: number, column: number) => void; selectedCell: {row: number, column: number}}) {
  return (
    <div className="board">
      {board.map((row, rowIndex) => {
        return row.map((column, columnIndex) => {
          const isSelected = selectedCell.row === rowIndex && selectedCell.column === columnIndex
          return <Cell key={`${rowIndex}-${columnIndex}`} cell={column} onClick={() => onSelectCell(rowIndex, columnIndex)} isSelected={isSelected}/>;
        });
      })}
    </div>
  )
}

function Cell({cell, onClick, isSelected} : {cell : CellData; onClick: () => void; isSelected : boolean}) {
  const isEntered = !cell.isFixed && cell.value !== ""
  return (
    <div className={"board-cell " + (isSelected ? "selected " : "") + (isEntered ? "entered" : "")} onClick={onClick}>
      {cell.value !== "" ? (
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