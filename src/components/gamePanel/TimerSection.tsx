import pauseIcon from "../../assets/icons/pauseIcon.svg";
import "./css/TimerSection.css";
import { useGameContext } from "../../types/GameContext";

export default function TimerSection() {
    return (
        <div className="timer-section">
            <TimerDisplay />
            <PauseButton />
        </div>
    )
}

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
    const {pauseGame} = useGameContext()
    return (
        <button className="pause-btn" onClick={pauseGame}>
            <img src={pauseIcon}></img>
        </button>
    )
}