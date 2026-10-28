import { FlashlightIcon } from '../../assets/icons/GameIcons';
import { useFlashlightChallengeContext } from '../../context/FlashlightChallengeContext';
import './FlashlightBattery.css';

export function FlashlightBattery() {
    const { battery, activateFlashlight } = useFlashlightChallengeContext();

    return (
        <button className="flashlight-section" onClick={activateFlashlight}>
            <div className="flashlight-action">
                <FlashlightIcon />
                <div className="action-text">Reveal · 5s</div>
            </div>
            <div className="battery-levels">
                {Array(4).fill(null).map((_, index) => {
                    return <span className={`battery-segment ${index < battery / 25 ? "charged" : "empty"}`} key={index}></span>;
                    }
                )}
            </div>
        </button>
    );
}