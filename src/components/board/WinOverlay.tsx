import confetti from "../../assets/icons/confetti.svg";
import { useGameContext } from "../../context/GameContext";
import { formatTimer } from "../../services/timeFormating";
import './WinOverlay.css';

export function WinOverlay() {
    const {timer, showWinOverlay} = useGameContext();
    
    return (
      <div className="board-win-overlay">
        {showWinOverlay && (
          <>
          <img src={confetti} />
          <div className="win-message">
            <p className="win-label">You win!</p>
            <p className="win-timer-label">{formatTimer(timer)}</p>
          </div>
          </>
        )}
      </div>
    );
}