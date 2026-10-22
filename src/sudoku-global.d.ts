interface Window {
  sudoku: {
    generate(difficulty: string): string;
    board_string_to_grid(board: string): string[][];
  };
}