// interface Board {
//     title: string;
//     lists: List;
// }
export interface IBoard {
    id: ID;
    title: string;
    custom: { background: string };
    lists?: IList[];
  }