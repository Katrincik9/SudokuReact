export interface CellData {
  value: number | null;
  notes: number[];
  isFixed: boolean;
}

export type BoardData = CellData[][] 

export type HistoryEntry = {
  board : BoardData;
  selectedCell : {row: number; column: number}
}