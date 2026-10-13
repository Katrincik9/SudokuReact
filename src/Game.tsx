import Board from './Board'
import GamePanel from './GamePanel';
import { useState } from 'react';
import type { BoardData, CellData } from './types/sudoku';

export default function Game() {
  const [board, setBoard] = useState<BoardData>(createPuzzleBoard)
  const [selectedCell, setselectedCell] = useState({row: 0, column: 0})

  function createPuzzleBoard() : BoardData {
    const generatedPuzzleString = window.sudoku.generate("easy");
    const generatedPuzzleGrid = window.sudoku.board_string_to_grid(generatedPuzzleString);
    let board : BoardData = []
    generatedPuzzleGrid.forEach(row => {
      let boardRow : CellData[] = []
      row.forEach(character => {
        const emptyCell : CellData = {
          value: character === "." ? "" : character,
          notes: [],
          isFixed: character !== "."
        }
        boardRow.push(emptyCell)
      })
      board.push(boardRow)
    })
    return board
  }

  function createNewGame() {
    setBoard(createPuzzleBoard())
    setselectedCell({row: 0, column: 0})
  }

  function handleSelectCell(row: number, column: number) {
    setselectedCell({row, column})
  }

  return (
    <div className="game">
      <Board board={board} onSelectCell={handleSelectCell} selectedCell={selectedCell}/>
      <GamePanel onNewGame={createNewGame}/>
    </div>
  )
}