import pauseBoardIcon from "../../assets/icons/pauseBoardIcon.svg";
import './PauseOverlay.css';

export function PauseOverlay() {
    return (
        <div className="board-pause-overlay">
            <img src={pauseBoardIcon} />
        </div>
    );
}