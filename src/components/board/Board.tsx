import './Board.css';
import { Cell } from "./Cell";
import { useGameContext } from "../../context/GameContext";
import { WinOverlay } from './WinOverlay';
import { PauseOverlay } from './PauseOverlay';
import { FlashlightChallenge } from './FlashlightChallenge';

export function Board() {
  const {board, paused, won, isFlashlightActive} = useGameContext();
  return (
    <div className="board">
      {board.map((rowCells, rowIndex) => {
        return rowCells.map((cell, columnIndex) => {
          return <Cell key={`${rowIndex}-${columnIndex}`} cell={cell} row={rowIndex} column={columnIndex}/>;
        });
      })}
      {paused && <PauseOverlay />}
      {won && <WinOverlay />}
      {isFlashlightActive && <FlashlightChallenge/>}
    </div>
  );
}