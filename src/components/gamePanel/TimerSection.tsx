import pauseIcon from "../../assets/icons/pauseIcon.svg";
import "./css/TimerSection.css"

export default function TimerSection() {
    return (
        <div className="timer-section">
            <TimerDisplay />
            <PauseButton />
        </div>
    )
}

function TimerDisplay() {
    return (
        <div className="timer-display">
            <label className="timer-label">Time</label>
            <span className="timer-span">00:00</span>
        </div>
    )
} 

function PauseButton() {
    return (
        <button className="pause-btn">
            <img src={pauseIcon}></img>
        </button>
    )
}