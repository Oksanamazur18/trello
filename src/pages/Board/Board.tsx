import React, {useState} from "react";

interface Card {
    id: number;
    title: string;
}

interface List{
    id: number;
    title: string;
    cards: Card[];
}


export const Board: React.FC = () =>{ 
    const [title, setTitle] = useState<string>( "Моя тестова дошка");
    const [lists, setLists] = useState<List[]>(
        [
            {
              id: 1,
              title: "Плани",
              cards: [
                {id: 1, title: "помити кота"},
                {id: 2, title: "приготувати суп"},
                {id: 3, title: "сходити в магазин"}
              ]
            },
            {
              id: 2,
              title: "В процесі",
              cards: [
                {id: 4, title: "подивитися серіал"}
              ]
            },
            {
              id: 3,
              title: "Зроблено",
              cards: [
                {id: 5, title: "зробити домашку"},
                {id: 6, title: "погуляти з собакой"} 
              ]
            }
          ]
    )
    return(
<div>{title}</div>
    )
}