import Board from './board/Board';
import GamePanel from './gamePanel/GamePanel';
import { useState } from 'react';
import type { BoardData } from '../types/sudoku';
import { GameContext } from '../types/GameContext';
import createPuzzleBoard from '../utils/createPuzzleBoard';

export default function Game() {
  const [board, setBoard] = useState<BoardData>(createPuzzleBoard)
  const [selectedCell, setSelectedCell] = useState({row: 0, column: 0})
  const [notesMode, setNotesMode] = useState(false)

  function startNewGame() {
    setBoard(createPuzzleBoard())
    setSelectedCell({row: 0, column: 0})
  }

  function handleCellClick(row: number, column: number) {
    setSelectedCell({row, column})
  }

  function handleNumberClick(number : number) {
    const selectedCellRow = selectedCell.row
    const selectedCellColumn = selectedCell.column
    setBoard(previousBoard => {
      const cell = previousBoard[selectedCellRow][selectedCellColumn]
      if (cell.isFixed) return previousBoard

      const nextBoard = previousBoard.map((row) => row.map((column) => ({...column})))
      nextBoard[selectedCellRow][selectedCellColumn] = {...cell, 
        ...(notesMode
          ? { value: null, notes: [...cell.notes, number] }
          : { value: number, notes: [] }
        ),
      }
      return nextBoard
    })
  }

  function handleEraseClick() {
    const selectedCellRow = selectedCell.row
    const selectedCellColumn = selectedCell.column
    setBoard(previousBoard => {
      const cell = previousBoard[selectedCellRow][selectedCellColumn]
      if (cell.isFixed) return previousBoard

      const nextBoard = previousBoard.map((row) => row.map((column) => ({...column})))
      nextBoard[selectedCellRow][selectedCellColumn] = {...cell, value: null, notes: []}
      return nextBoard;
    })
  }

  function handleUndoClick() {

  }

  function handleNotesClick() {
    setNotesMode(!notesMode)
  }

  const contextValues = {
    selectedCell,
    handleCellClick,
    notesMode, 
    startNewGame, 
    handleNumberClick, 
    handleNotesClick,
    handleEraseClick, 
    handleUndoClick
  }

  return (
    <div className="game">
    <GameContext.Provider value={contextValues}>
      <Board board={board}/>
      <GamePanel/>
    </GameContext.Provider>
    </div>
  )
}