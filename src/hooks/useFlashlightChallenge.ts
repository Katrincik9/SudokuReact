import { useEffect, useRef, useState } from "react";
import { isBoxCompleted } from "../services/sudokuValidation";
import { useGameContext } from "../context/GameContext";

export function useFlashlightChallenge() {
    const [battery, setBattery] = useState(100);
    const [revealed, setRevealed] = useState(false);
    const rechargedBoxes = useRef(new Set<number>());
    const { paused, won, board } = useGameContext();
    const previousBoardRef = useRef(board);

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

    function checkBoxAndRechargeBattery() {
        for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
            if (!isBoxCompleted({ board: previousBoardRef.current, boxIndex}) && 
                isBoxCompleted({ board: board, boxIndex })) {
                if (!rechargedBoxes.current.has(boxIndex)) {
                    rechargedBoxes.current.add(boxIndex);
                    setBattery(previousBattery => Math.min(100, previousBattery + 25));
                }
            }
        }
    }
    
    useEffect(() => {
        if (previousBoardRef.current !== board) {
            checkBoxAndRechargeBattery();
            previousBoardRef.current = board;
        }
    }, [board]);

    return {battery, revealed, activateFlashlight};
}