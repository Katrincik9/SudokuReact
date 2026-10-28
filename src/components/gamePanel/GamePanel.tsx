import { GameControls } from "./GameControls";
import { NewGameButton } from "./NewGameButton";
import { Numpad } from "./Numpad";
import { TimerSection } from "./TimerSection";
import "./GamePanel.css";
import { FlashlightBattery } from "./FlashlightBattery";
import { useGameContext } from "../../context/GameContext";

export function GamePanel() {
    const {isFlashlightActive} = useGameContext();
    return (
        <div className="game-panel">
            <TimerSection />
            {isFlashlightActive && <FlashlightBattery />}
            <GameControls />
            <Numpad />
            <NewGameButton />
        </div>
    );
}