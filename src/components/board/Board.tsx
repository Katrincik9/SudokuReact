import './css/Board.css'
import Cell from "./Cell";
import { useGameContext } from '../../types/GameContext';
import pauseBoardIcon from "../../assets/icons/pauseBoardIcon.svg";


export default function Board() {
  const {board, paused} = useGameContext()
  return (
    <div className="board">
      {board.map((row, rowIndex) => {
        return row.map((column, columnIndex) => {
          return <Cell key={`${rowIndex}-${columnIndex}`} cell={column} row={rowIndex} column={columnIndex}/>;
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