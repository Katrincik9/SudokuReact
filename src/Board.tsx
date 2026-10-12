export default function Board() {
  return (
    <div className="board">
        {Array(9).fill(null).map((_, index) => index + 1).map(row => {
            return Array(9).fill(null).map((_, index) => index + 1).map(col => {
                return <Cell key={`${row}-${col}`} />;
            });
        })}
    </div>
  )
}

function Cell() {
  return (
    <div className="board-cell">
      <div>1</div>
    </div>
  )
}