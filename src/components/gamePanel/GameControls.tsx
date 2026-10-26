import { UndoIcon } from "../../assets/icons/GameIcons";
import { EraseIcon } from "../../assets/icons/GameIcons";
import { NotesIcon } from "../../assets/icons/GameIcons";
import { useGameContext } from "../../context/GameContext";
import "./GameControls.css";

function UndoButton() {
    const { handleUndoClick } = useGameContext();
    return (
        <button className = "game-control-button" onClick={handleUndoClick}>
            < UndoIcon />
        </button>
    );
}

function EraseButton() {
    const { handleEraseClick } = useGameContext();
    return (
        <button className = "game-control-button" onClick={handleEraseClick}>
            < EraseIcon />
        </button>
    );
}

function NotesButton() {
    const { handleNotesClick, notesMode } = useGameContext();
    return (
        <button className = {`game-control-button ${notesMode ? "notes-on" : "notes-off"}`} onClick={handleNotesClick}>
            < NotesIcon />
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