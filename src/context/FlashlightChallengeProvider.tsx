import type { ReactNode } from "react";
import { useFlashlightChallenge } from "../hooks/useFlashlightChallenge";
import { FlashlightChallengeContext } from "./FlashlightChallengeContext";

export function FlashlightChallengeProvider({children} : {children : ReactNode}) {
    const { battery, revealed, activateFlashlight } = useFlashlightChallenge();

    const challengeContextValues = {
        battery,
        activateFlashlight,
        revealed
    };

  return (
    <FlashlightChallengeContext.Provider value={challengeContextValues}>
        {children }
    </FlashlightChallengeContext.Provider>
  );
}