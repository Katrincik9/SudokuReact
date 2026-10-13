import pauseIcon from "./assets/icons/pauseIcon.svg";
import undoIcon from "./assets/icons/undoIcon.svg";
import eraseIcon from "./assets/icons/eraseIcon.svg";
import notesIcon from "./assets/icons/notesIcon.svg";

export default function GamePanel({onNewGame} : {onNewGame: () => void}) {
    return (
        <div className="game-panel">
            <TimerSection />
            <GameControls />
            <Numpad />
            <NewGameButton onNewGame={onNewGame}/>
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
}

const buttons : GameControlButtonData[] = [
    {task: "undo", icon: undoIcon},
    {task: "erase", icon: eraseIcon},
    {task: "notes", icon: notesIcon}
];

function GameControls() {
    return (
        <div className="game-controls">
            {buttons.map(gameButton => {
                return <GameControlButton key={`button-${gameButton.task}`} value={gameButton.icon}/>;
            })}
        </div>
    )
}

function GameControlButton({value} : {value : string}) {
    return (
        <button className="game-control-button">
            <img src={value}></img>
        </button>
    )
}

function Numpad() {
    return (
        <div className="numpad">
            {Array(9).fill(null).map((_, index) => {
                const number = index + 1
                return <NumpadItem key={`numpad-${number}`} value={number}/>;
                }
            )}
        </div>
    )
}

function NumpadItem({value} : {value : number}) {
    return (
        <button className="numpad-item">{value}</button>
    )
}

function NewGameButton({onNewGame} : {onNewGame: () => void}) {
    return (
        <button className="new-game-btn" onClick={onNewGame}>New Game</button>
    )
}