import Board from './Board'
import GamePanel from './GamePanel';
import { useState } from 'react';
import type { BoardData, CellData } from './types/sudoku';

export default function Game() {
  const [board, setBoard] = useState<BoardData>(createEmptyBoard)

  function createEmptyBoard() : BoardData {
    let board : BoardData = []
    Array(9).fill(null).forEach(() => {
      let boardRow : CellData[] = []
      Array(9).fill(null).forEach(() => {
        const emptyCell : CellData = {
          value: null,
          notes: [],
          isFixed: false
        }
        boardRow.push(emptyCell)
      })
      board.push(boardRow)
    })
    return board
  }

  return (
    <div className="game">
      <Board board={board} />
      <GamePanel />
    </div>
  )
}