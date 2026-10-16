import undoIcon from "../../assets/icons/undoIcon.svg";
import eraseIcon from "../../assets/icons/eraseIcon.svg";
import notesIcon from "../../assets/icons/notesIcon.svg";
import { useGameContext } from "../../types/GameContext";
import "./css/GameControls.css"

interface GameControlButtonData {
    task : string;
    icon : string;
    onClick : () => void;
}

export default function GameControls() {
    const { handleUndoClick, handleEraseClick, handleNotesClick, notesMode } = useGameContext()
    const buttons : GameControlButtonData[] = [
        {task: "undo", icon: undoIcon, onClick: handleUndoClick},
        {task: "erase", icon: eraseIcon, onClick: handleEraseClick},
        {task: "notes", icon: notesIcon, onClick: handleNotesClick}
    ];
    return (
        <div className="game-controls">
            {buttons.map(gameButton => {
                return <GameControlButton key={`button-${gameButton.task}`} task={gameButton.task} value={gameButton.icon} onClick={gameButton.onClick} notesMode={notesMode}/>;
            })}
        </div>
    )
}

function GameControlButton({value, task, onClick, notesMode} : {value : string; task : string; onClick : () => void; notesMode : boolean}) {
    return (
        <button className = {`game-control-button ${task === "notes" ? (notesMode ? "notes-on" : "notes-off") : ""}`} onClick={onClick}>
            <img src={value}></img>
        </button>
    )
}