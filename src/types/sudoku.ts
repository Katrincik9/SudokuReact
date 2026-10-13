export interface CellData {
  value: string | "";
  notes: number[];
  isFixed: boolean;
}

export type BoardData = CellData[][] 