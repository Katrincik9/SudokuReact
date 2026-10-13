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
  return (
    <div className={"board-cell " + (isSelected ? "selected" : "")} onClick={onClick}>
      <div>{cell.value}</div>
    </div>
  )
} 