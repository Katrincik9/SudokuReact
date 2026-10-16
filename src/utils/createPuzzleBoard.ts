import type { BoardData, CellData } from "../types/sudoku";

export default function createPuzzleBoard() : BoardData {
    const generatedPuzzleString = window.sudoku.generate("easy");
    const generatedPuzzleGrid = window.sudoku.board_string_to_grid(generatedPuzzleString);
    let board : BoardData = []
    for (const row of generatedPuzzleGrid) {
      let boardRow : CellData[] = []
      for (const character of row) {
        const cell : CellData = {
          value: character === "." ? null : Number(character),
          notes: [],
          isFixed: character !== "."
        }
        boardRow.push(cell)
      }
      board.push(boardRow)
    }
    return board
  }