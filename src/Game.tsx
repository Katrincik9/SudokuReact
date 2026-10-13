import Board from './Board'
import GamePanel from './GamePanel';
import { useState } from 'react';
import type { BoardData, CellData } from './types/sudoku';

export default function Game() {
  const [board, setBoard] = useState<BoardData>(createPuzzleBoard)

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
  }

  return (
    <div className="game">
      <Board board={board} />
      <GamePanel onNewGame={createNewGame}/>
    </div>
  )
}