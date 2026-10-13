export interface CellData {
  value: number | null;
  notes: number[];
  isFixed: boolean;
}

export type BoardData = CellData[][] 