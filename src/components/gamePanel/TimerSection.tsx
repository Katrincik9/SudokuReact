import pauseIcon from "../../assets/icons/pauseIcon.svg";
import playIcon from "../../assets/icons/playIcon.svg";
import "./TimerSection.css";
import { useGameContext } from "../../context/GameContext";
import { formatTimer } from "../../services/timeFormating";

function TimerDisplay() {
    const { timer } = useGameContext();
    return (
        <div className="timer-display">
            <label className="timer-label">Time</label>
            <span className="timer-span">{formatTimer(timer)}</span>
        </div>
    );
} 

function PauseButton() {
    const { paused, won, togglePauseGame } = useGameContext();
    return (
        <button className="pause-btn" onClick={togglePauseGame}>
            <img src={(paused || won) ? playIcon : pauseIcon}></img>
        </button>
    );
}

export function TimerSection() {
    return (
        <div className="timer-section">
            <TimerDisplay />
            <PauseButton />
        </div>
    );
}