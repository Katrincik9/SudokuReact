import type { BoardData, CellData } from "./types/sudoku";

export default function Board({board} : {board : BoardData}) {
  return (
    <div className="board">
      {board.map((row, rowIndex) => {
        return row.map((column, columnIndex) => {
          return <Cell key={`${rowIndex}-${columnIndex}`} cell={column}/>;
        });
      })}
    </div>
  )
}

function Cell({cell} : {cell : CellData}) {
  return (
    <div className="board-cell">
      <div>{cell.value}</div>
    </div>
  )
}