import undoIcon from "../../assets/icons/undoIcon.svg";
import eraseIcon from "../../assets/icons/eraseIcon.svg";
import notesIcon from "../../assets/icons/notesIcon.svg";
import { useGameContext } from "../../context/GameContext";
import "./GameControls.css";

function UndoButton() {
    const { handleUndoClick } = useGameContext();
    return (
        <button className = "game-control-button" onClick={handleUndoClick}>
            <img src={undoIcon}></img>
        </button>
    );
}

function EraseButton() {
    const { handleEraseClick } = useGameContext();
    return (
        <button className = "game-control-button" onClick={handleEraseClick}>
            <img src={eraseIcon}></img>
        </button>
    );
}

function NotesButton() {
    const { handleNotesClick, notesMode } = useGameContext();
    return (
        <button className = {`game-control-button ${notesMode ? "notes-on" : "notes-off"}`} onClick={handleNotesClick}>
            <img src={notesIcon}></img>
        </button>
    );
}

export function GameControls() {
    return (
        <div className="game-controls">
            <UndoButton/>
            <EraseButton/>
            <NotesButton/>
        </div>
    );
}