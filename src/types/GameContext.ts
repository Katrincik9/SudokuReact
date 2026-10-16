import { createContext, useContext } from "react"

export interface GameContextData {
    selectedCell : {row: number, column: number},
    handleCellClick(row: number, column: number) : void,
    notesMode: boolean,
    startNewGame() : void,
    handleNumberClick(number: number) : void,
    handleNotesClick() : void,
    handleEraseClick() : void,
    handleUndoClick() : void
}

export const GameContext = createContext<GameContextData | null>(null)

export function useGameContext() : GameContextData {
    const gameContext = useContext(GameContext)
    if (gameContext === null) {
        throw new Error("No saved game context")
    } 
    return gameContext
}