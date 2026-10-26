import { GameControls } from "./GameControls";
import { NewGameButton } from "./NewGameButton";
import { Numpad } from "./Numpad";
import { TimerSection } from "./TimerSection";
import "./GamePanel.css";
import { FlashlightBattery } from "./FlashlightBattery";

export function GamePanel() {
    return (
        <div className="game-panel">
            <TimerSection />
            {window.flashlightChallenge && <FlashlightBattery />}
            <GameControls />
            <Numpad />
            <NewGameButton />
        </div>
    );
}