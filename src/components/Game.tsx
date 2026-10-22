import { Board } from './board/Board';
import GamePanel from './gamePanel/GamePanel';
import { useEffect, useState } from 'react';
import type { CellData, HistoryEntry } from '../types/sudoku';
import { GameContext } from '../context/GameContext';
import { createPuzzleBoard } from '../services/puzzleBoardInitialization';
import type { MouseEvent } from 'react'

export default function Game() {
  const [board, setBoard] = useState<CellData[][]>(createPuzzleBoard)
  const [selectedCell, setSelectedCell] = useState({row: 0, column: 0})
  const [notesMode, setNotesMode] = useState(false)
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [paused, setPaused] = useState(false)
  const [timer, setTimer] = useState(0)
  const numberKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

  function startNewGame() {
    setBoard(createPuzzleBoard())
    setSelectedCell({row: 0, column: 0})
    setHistory([])
    setTimer(0)
    setPaused(false)
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedCell, paused, notesMode, board])

  function handleKeyDown(event : KeyboardEvent) {
    if (paused) return 
    let { row, column } = selectedCell
    switch (event.key) {
      case "ArrowUp":
        row--
        break
      case "ArrowDown":
        row++
        break
      case "ArrowLeft":
        column--
        break
      case "ArrowRight":
        column++
        break
    }

    if (row >= 0 && row < 9 && column >=0 && column < 9 && (selectedCell.row !== row || selectedCell.column !== column)) {
      setSelectedCell({row, column})
    }

    if (numberKeys.includes(event.key)) {
      handleNumberClick(Number(event.key))
    }

    if (event.key === "Backspace" || event.key === "Delete") {
      handleEraseClick()
    }
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
    const previousCell = board[selectedCell.row][selectedCell.column]
    const newCellData = {...previousCell, 
      ...(notesMode
        ? { value: null, 
            notes : previousCell.notes.includes(number) 
              ? previousCell.notes.filter(note => note !== number) 
              : [...previousCell.notes, number]
          }
        : { value : (previousCell.value === number) ? null : number, notes: [] })
    }
    updateSelectedCell(newCellData)
  }

  function handleEraseClick() {
    const previousCell = board[selectedCell.row][selectedCell.column]
    const newCellData = {...previousCell, value: null, notes: []}
    updateSelectedCell(newCellData)
  }

  function updateSelectedCell(nextCellData : CellData) {
    const { row, column } = selectedCell
    const currentCell = board[row][column]
    if (currentCell.isFixed) return
    if (currentCell.value === nextCellData.value && currentCell.notes.length === nextCellData.notes.length) return
    setHistory(previousHistory => [...previousHistory, { board, selectedCell }])
    
    const nextBoard = [...board]
    const updatedRow = [...nextBoard[row]]
    updatedRow[column] = nextCellData
    nextBoard[row] = updatedRow
    setBoard(nextBoard)
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
    const target = event.target
    if (!(target instanceof Element)) return
    if (target.closest(".new-game-btn") || !target.closest(".board, button")) return
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
    <div className={`game ${paused ? "paused" : ""}`} onClickCapture={paused ? handleClickCapture : undefined}>
    <GameContext.Provider value={contextValues}>
      <Board/>
      <GamePanel/>
    </GameContext.Provider>
    </div>
  )
}