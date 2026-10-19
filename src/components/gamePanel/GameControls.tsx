import undoIcon from "../../assets/icons/undoIcon.svg";
import eraseIcon from "../../assets/icons/eraseIcon.svg";
import notesIcon from "../../assets/icons/notesIcon.svg";
import { useGameContext } from "../../types/GameContext";
import "./css/GameControls.css"

export default function GameControls() {
    const { handleUndoClick, handleEraseClick, handleNotesClick, notesMode } = useGameContext()
    return (
        <div className="game-controls">
            <UndoButton value={undoIcon} onClick={handleUndoClick}/>
            <EraseButton value={eraseIcon} onClick={handleEraseClick}/>
            <NotesButton value={notesIcon} notesMode={notesMode} onClick={handleNotesClick}/>
        </div>
    )
}

function UndoButton({value, onClick} : {value : string; onClick : () => void}) {
   return (
        <button className = "game-control-button" onClick={onClick}>
            <img src={value}></img>
        </button>
    ) 
}

function EraseButton({value, onClick} : {value : string; onClick : () => void}) {
   return (
        <button className = "game-control-button" onClick={onClick}>
            <img src={value}></img>
        </button>
    ) 
}

function NotesButton({value, onClick, notesMode} : {value : string; onClick : () => void; notesMode : boolean}) {
   return (
        <button className = {`game-control-button ${notesMode ? "notes-on" : "notes-off"}`} onClick={onClick}>
            <img src={value}></img>
        </button>
    ) 
}