import Board from './Board'
import GamePanel from './GamePanel';
import { useState } from 'react';
import type { BoardData, CellData } from './types/sudoku';
import { GameContext } from './types/GameContext';

export default function Game() {
  const [board, setBoard] = useState<BoardData>(createPuzzleBoard)
  const [selectedCell, setSelectedCell] = useState({row: 0, column: 0})
  const [notesMode, setNotesMode] = useState(false)

  function createPuzzleBoard() : BoardData {
    const generatedPuzzleString = window.sudoku.generate("easy");
    const generatedPuzzleGrid = window.sudoku.board_string_to_grid(generatedPuzzleString);
    let board : BoardData = []
    generatedPuzzleGrid.forEach(row => {
      let boardRow : CellData[] = []
      row.forEach(character => {
        const cell : CellData = {
          value: character === "." ? null : Number(character),
          notes: [],
          isFixed: character !== "."
        }
        boardRow.push(cell)
      })
      board.push(boardRow)
    })
    return board
  }

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
      return previousBoard.map((row, rowIndex) => {
        return row.map((cell, columnIndex) => {
          if (selectedCellRow !== rowIndex || selectedCellColumn !== columnIndex || cell.isFixed) {
            return cell
          }

          if (notesMode) {
            return {...cell, value: null, notes: [...cell.notes, number]}
          } else {
            return {...cell, value: number, notes: []}
          }
        })
      })
    })
  }

  function handleNotesClick() {
    setNotesMode(!notesMode)
  }

  return (
    <div className="game">
    <GameContext.Provider value={{selectedCell, handleCellClick}}>
      <Board board={board}/>
      <GamePanel onNewGame={startNewGame} onNumberClick={handleNumberClick} notesMode={notesMode} onNotesClick={handleNotesClick}/>
    </GameContext.Provider>
    </div>
  )
}