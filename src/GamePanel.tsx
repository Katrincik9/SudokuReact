import pauseIcon from "./assets/icons/pauseIcon.svg";
import undoIcon from "./assets/icons/undoIcon.svg";
import eraseIcon from "./assets/icons/eraseIcon.svg";
import notesIcon from "./assets/icons/notesIcon.svg";
import { useGameContext } from "./types/GameContext";

export default function GamePanel() {
    return (
        <div className="game-panel">
            <TimerSection />
            <GameControls />
            <Numpad />
            <NewGameButton />
        </div>
    )
}

function TimerSection() {
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

interface GameControlButtonData {
    task : string;
    icon : string;
    onClick : () => void;
}

function GameControls() {
    const { handleUndoClick, handleEraseClick, handleNotesClick } = useGameContext()
    const buttons : GameControlButtonData[] = [
        {task: "undo", icon: undoIcon, onClick: handleUndoClick},
        {task: "erase", icon: eraseIcon, onClick: handleEraseClick},
        {task: "notes", icon: notesIcon, onClick: handleNotesClick}
    ];
    return (
        <div className="game-controls">
            {buttons.map(gameButton => {
                return <GameControlButton key={`button-${gameButton.task}`} task={gameButton.task} value={gameButton.icon} onClick={gameButton.onClick}/>;
            })}
        </div>
    )
}

function GameControlButton({value, task, onClick} : {value : string; task : string; onClick : () => void}) {
    const gameControlButtonContext = useGameContext()
    const notesMode = gameControlButtonContext.notesMode
    return (
        <button className = {`game-control-button ${task === "notes" ? (notesMode ? "notes-on" : "notes-off") : ""}`} onClick={onClick}>
            <img src={value}></img>
        </button>
    )
}

function Numpad() {
    const numpadContext = useGameContext()
    const onNumberClick = numpadContext.handleNumberClick
    return (
        <div className="numpad">
            {Array(9).fill(null).map((_, index) => {
                const number = index + 1
                return <NumpadItem key={`numpad-${number}`} value={number} onClick={() => onNumberClick(number)}/>;
                }
            )}
        </div>
    )
}

function NumpadItem({value, onClick} : {value : number; onClick: () => void}) {
    return (
        <button className="numpad-item" onClick={onClick}>{value}</button>
    )
}

function NewGameButton() {
    const newGameButtonContext = useGameContext()
    const onNewGameClick = newGameButtonContext.startNewGame
    return (
        <button className="new-game-btn" onClick={onNewGameClick}>New Game</button>
    )
}