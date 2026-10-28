import { createContext, useContext } from "react";
import type { FlashlightChallengeContextData } from "../types/flashlight";

export const FlashlightChallengeContext = createContext<FlashlightChallengeContextData | null>(null);

export function useFlashlightChallengeContext() : FlashlightChallengeContextData {
    const flashlightChallengeContext = useContext(FlashlightChallengeContext);
    if (flashlightChallengeContext === null) {
        throw new Error("No saved flashlight challenge context");
    }
    return flashlightChallengeContext;
}