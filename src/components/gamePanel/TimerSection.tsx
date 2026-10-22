import pauseIcon from "../../assets/icons/pauseIcon.svg";
import playIcon from "../../assets/icons/playIcon.svg";
import "./TimerSection.css";
import { useGameContext } from "../../context/GameContext";

function TimerDisplay() {
    const {timer} = useGameContext()
    const minutes = Math.floor(timer / 60).toString().padStart(2, "0")
    const seconds = (timer % 60).toString().padStart(2, "0")
    return (
        <div className="timer-display">
            <label className="timer-label">Time</label>
            <span className="timer-span">{`${minutes}:${seconds}`}</span>
        </div>
    )
} 

function PauseButton() {
    const {paused, togglePauseGame} = useGameContext()
    return (
        <button className="pause-btn" onClick={togglePauseGame}>
            <img src={paused ? playIcon : pauseIcon}></img>
        </button>
    )
}

export function TimerSection() {
    return (
        <div className="timer-section">
            <TimerDisplay />
            <PauseButton />
        </div>
    )
}