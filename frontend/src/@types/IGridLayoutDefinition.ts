export default interface IGridLayoutDefinition {
  cols: number;
  rows: number;
  controls: IControlDefinition[];
}

export type IControl = {
  col: number;
  row: number;
};

export type IControlDefinition = IControl & {
  type: string;
  title: string;
};
