import './css/Board.css'
import { Cell } from "./Cell";
import { useGameContext } from '../../types/GameContext';
import pauseBoardIcon from "../../assets/icons/pauseBoardIcon.svg";

export function Board() {
  const {board, paused} = useGameContext()
  return (
    <div className="board">
      {board.map((rowCells, rowIndex) => {
        return rowCells.map((cell, columnIndex) => {
          return <Cell key={`${rowIndex}-${columnIndex}`} cell={cell} row={rowIndex} column={columnIndex}/>;
        });
      })}
      {paused && (
        <div className="board-pause-overlay">
          <img src={pauseBoardIcon} />
        </div>
      )}
    </div>
  )
}