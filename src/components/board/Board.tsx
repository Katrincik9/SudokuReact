import './css/Board.css'

import type { BoardData } from "../../types/sudoku";
import Cell from "./Cell";

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