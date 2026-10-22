import { useGameContext } from "../../context/GameContext";
import "./css/NewGameButton.css"

export default function NewGameButton() {
    const {startNewGame} = useGameContext()
    return (
        <button className="new-game-btn" onClick={startNewGame}>New Game</button>
    )
}