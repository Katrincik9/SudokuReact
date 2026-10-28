import { useEffect, useState } from "react";
import { isBoxCompleted } from "../services/sudokuValidation";
import type { CellData } from "../types/sudoku";

export function useFlashlightChallenge({paused, won} : {paused : boolean; won : boolean}) {
    const [battery, setBattery] = useState(100);
    const [revealed, setRevealed] = useState(false);
    const [rechargedBoxes, setRechargedBoxes] = useState(new Set<number>());
    
    function resetFlashlightChallenge() {
        setBattery(100);
        setRevealed(false);
        setRechargedBoxes(new Set<number>());
    }

    function activateFlashlight() {
        if (paused || won) return;
        if (battery < 25) return;
        if (revealed) return;
        setBattery(battery - 25);
        setRevealed(true);
    }
    
    useEffect(() => {
        if (!revealed) return;
        const revealID = setTimeout(() => {
            setRevealed(false);
        }, 5000);
        return () => clearTimeout(revealID);
    }, [revealed]);

    function checkBoxAndRechargeBattery({nextBoard, row, column} : {nextBoard : CellData[][]; row : number, column : number}) {
        if (isBoxCompleted({ board: nextBoard, row, column })) {
            const boxIndex = Math.floor(row / 3) * 3 + Math.floor(column / 3);
            if (!rechargedBoxes.has(boxIndex)) {
                setRechargedBoxes(new Set([...rechargedBoxes, boxIndex]));
                setBattery(previousBattery => Math.min(100, previousBattery + 25));
            }
        }
    }

    return {battery, revealed, activateFlashlight, checkBoxAndRechargeBattery, resetFlashlightChallenge};
}