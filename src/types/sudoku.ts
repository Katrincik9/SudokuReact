export interface CellData {
  value: number | null;
  notes: number[];
  isFixed: boolean;
}

export type HistoryEntry = {
  board : CellData[][];
  selectedCell : {row: number; column: number}
}