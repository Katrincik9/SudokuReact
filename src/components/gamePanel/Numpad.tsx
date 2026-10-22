import { useGameContext } from "../../context/GameContext";
import "./Numpad.css";

function NumpadItem({value, onClick} : {value : number; onClick: () => void}) {
    return (
        <button className="numpad-item" onClick={onClick}>{value}</button>
    );
}

export function Numpad() {
    const { handleNumberClick } = useGameContext();
    return (
        <div className="numpad">
            {Array(9).fill(null).map((_, index) => {
                const number = index + 1;
                return <NumpadItem key={`numpad-${number}`} value={number} onClick={() => handleNumberClick(number)}/>;
                }
            )}
        </div>
    );
}