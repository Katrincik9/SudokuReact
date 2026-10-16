import { useGameContext } from "../../types/GameContext";
import "./css/Numpad.css"

export default function Numpad() {
    const {handleNumberClick} = useGameContext()
    return (
        <div className="numpad">
            {Array(9).fill(null).map((_, index) => {
                const number = index + 1
                return <NumpadItem key={`numpad-${number}`} value={number} onClick={() => handleNumberClick(number)}/>;
                }
            )}
        </div>
    )
}

function NumpadItem({value, onClick} : {value : number; onClick: () => void}) {
    return (
        <button className="numpad-item" onClick={onClick}>{value}</button>
    )
}