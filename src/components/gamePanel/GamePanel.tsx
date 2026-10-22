import GameControls from "./GameControls";
import NewGameButton from "./NewGameButton";
import Numpad from "./Numpad";
import TimerSection from "./TimerSection";
import "./GamePanel.css"

export default function GamePanel() {
    return (
        <div className="game-panel">
            <TimerSection />
            <GameControls />
            <Numpad />
            <NewGameButton />
        </div>
    )
}