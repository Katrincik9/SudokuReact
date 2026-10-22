import { useGameContext } from "../../context/GameContext";
import "./NewGameButton.css"

export function NewGameButton() {
    const {startNewGame} = useGameContext()
    return (
        <button className="new-game-btn" onClick={startNewGame}>New Game</button>
    )
}