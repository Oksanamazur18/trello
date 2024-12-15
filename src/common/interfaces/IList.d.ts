export interface IList {
    id: ID;
    title: string;
    cards: ICard[];
    onCardCreated:()=>void;
}