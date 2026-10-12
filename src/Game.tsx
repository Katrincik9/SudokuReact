import Board from './Board'
import GamePanel from './GamePanel';

export default function Game() {
  return (
    <div className="game">
      <Board />
      <GamePanel />
    </div>
  )
}