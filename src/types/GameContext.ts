import { createContext } from "react"

export interface GameContextData {
    selectedCell : {row: number, column: number},
    handleCellClick(row: number, column: number) : void
}

export const GameContext = createContext<GameContextData | null>(null)
