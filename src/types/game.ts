import type { CellData } from "./sudoku";

export interface GameContextData {
    board : CellData[][],
    selectedCell : {row: number, column: number},
    handleCellClick(row: number, column: number) : void,
    notesMode : boolean,
    startNewGame() : void,
    handleNumberClick(number: number) : void,
    handleNotesClick() : void,
    handleEraseClick() : void,
    handleUndoClick() : void,
    togglePauseGame() : void,
    timer : number,
    paused: boolean,
    won: boolean,
    showWinOverlay: boolean,
    battery: number,
    handleFlashlightClick(): void
}   