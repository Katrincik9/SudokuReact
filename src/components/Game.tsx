import Board from './board/Board';
import GamePanel from './gamePanel/GamePanel';
import { useEffect, useState } from 'react';
import type { BoardData, HistoryEntry } from '../types/sudoku';
import { GameContext } from '../types/GameContext';
import createPuzzleBoard from '../utils/createPuzzleBoard';
import type { MouseEvent } from 'react'

export default function Game() {
  const [board, setBoard] = useState<BoardData>(createPuzzleBoard)
  const [selectedCell, setSelectedCell] = useState({row: 0, column: 0})
  const [notesMode, setNotesMode] = useState(false)
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [paused, setPaused] = useState(false)
  const [timer, setTimer] = useState(0)

  function startNewGame() {
    setBoard(createPuzzleBoard())
    setSelectedCell({row: 0, column: 0})
    setHistory([])
    setTimer(0)
    setPaused(false)
  }

  useEffect(() => {
    if (paused) return
    const intervalId = setInterval(() => {
      setTimer(interval => interval + 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [paused])

  function togglePauseGame() {
    setPaused(!paused)
    console.log(paused)
  }

  function handleCellClick(row: number, column: number) {
    setSelectedCell({row, column})
  }

  function handleNumberClick(number : number) {
    const selectedCellRow = selectedCell.row
    const selectedCellColumn = selectedCell.column
    const selectedCellBeforeEdit = board[selectedCellRow][selectedCellColumn]
    if (selectedCellBeforeEdit.isFixed) return 
    setHistory(previousHistory => [...previousHistory, {board, selectedCell}])
    setBoard(previousBoard => {
      const nextBoard = previousBoard.map((row) => row.map((column) => ({...column})))
      const previousCell = previousBoard[selectedCellRow][selectedCellColumn]
      nextBoard[selectedCellRow][selectedCellColumn] = {...previousCell, 
        ...(notesMode
          ? { value: null, 
              notes : previousCell.notes.includes(number) 
                ? previousCell.notes.filter(note => note !== number) 
                : [...previousCell.notes, number]
            }
          : { value : (previousCell.value === number) ? null : number, notes: [] })
      }
      return nextBoard
    })
  }

  function handleEraseClick() {
    const selectedCellRow = selectedCell.row
    const selectedCellColumn = selectedCell.column
    const selectedCellBeforeEdit = board[selectedCellRow][selectedCellColumn]
    if (selectedCellBeforeEdit.isFixed || (selectedCellBeforeEdit.value === null && selectedCellBeforeEdit.notes.length === 0)) return
    setHistory(previousHistory => [...previousHistory, {board, selectedCell}])
    setBoard(previousBoard => {
      const nextBoard = previousBoard.map((row) => row.map((column) => ({...column})))
      const previousCell = previousBoard[selectedCellRow][selectedCellColumn]
      nextBoard[selectedCellRow][selectedCellColumn] = {...previousCell, value: null, notes: []}
      return nextBoard;
    })
  }

  function handleUndoClick() {
    if (history.length === 0) return
    const lastEntry = history[history.length - 1]
    setBoard(lastEntry.board)
    setSelectedCell(lastEntry.selectedCell)
    setHistory(history.slice(0, -1))
  }

  function handleNotesClick() {
    setNotesMode(!notesMode)
  }
  
  function handleClickCapture(event : MouseEvent<HTMLDivElement>) {
    if (!paused || !(event.target instanceof Element)) return
    const target = event.target
    if (target.closest(".new-game-btn")) return
    if (!target.closest(".board, button")) return
    event.stopPropagation()
    setPaused(false)
  }

  const contextValues = {
    board,
    selectedCell,
    handleCellClick,
    notesMode, 
    startNewGame, 
    handleNumberClick, 
    handleNotesClick,
    handleEraseClick, 
    handleUndoClick, 
    togglePauseGame,
    timer,
    paused
  }

  return (
    <div className={`game ${paused ? "paused" : ""}`} onClickCapture={handleClickCapture}>
    <GameContext.Provider value={contextValues}>
      <Board/>
      <GamePanel/>
    </GameContext.Provider>
    </div>
  )
}