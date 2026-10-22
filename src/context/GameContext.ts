import { createContext, useContext } from "react"
import type { GameContextData } from "../types/game"

export const GameContext = createContext<GameContextData | null>(null)

export function useGameContext() : GameContextData {
    const gameContext = useContext(GameContext)
    if (gameContext === null) {
        throw new Error("No saved game context")
    } 
    return gameContext
}