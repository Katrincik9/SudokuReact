import type { CSSProperties } from 'react';
import { useGameContext } from '../../context/GameContext';
import './FlashlightChallenge.css';

export function FlashlightChallenge() {
    const {selectedCell, revealed} = useGameContext();
    const positionX = (selectedCell.column + 0.5) / 9 * 100;
    const positionY = (selectedCell.row + 0.5) / 9 * 100;

    const flashlightStyle : CSSProperties & Record<"--flashlight-x" | "--flashlight-y", string> = {
        "--flashlight-x" : `${positionX}%`,
        "--flashlight-y" : `${positionY}%`
    };
    
    return (
        <div className={`flashlight-overlay ${revealed ? "revealed" : ""}`} style={flashlightStyle}></div>
    );
}