import React, { useState } from "react";
import './board.scss';
import { ICard } from "../../common/interfaces/ICard";
import { List } from "./components/List/List";


interface List {
    id: number;
    title: string;
    cards: ICard[];
}


export const Board: React.FC = () => {
    const [title, setTitle] = useState<string>("Моя тестова дошка");
    const [lists, setLists] = useState<List[]>(
        [
            {
                id: 1,
                title: "Плани",
                cards: [
                    { id: 1, title: "помити кота" },
                    { id: 2, title: "приготувати суп" },
                    { id: 3, title: "сходити в магазин" }
                ]
            },
            {
                id: 2,
                title: "В процесі",
                cards: [
                    { id: 4, title: "подивитися серіал" }
                ]
            },
            {
                id: 3,
                title: "Зроблено",
                cards: [
                    { id: 5, title: "зробити домашку" },
                    { id: 6, title: "погуляти з собакой" }
                ]
            }
        ]
    )



    return (
        <div className="board">
            {/* <div className="title-container"> */}
                <input type="button" className="btn-home" value="<- додому" />
                <h1 className="board-name">{title}</h1>
            {/* </div> */}
            <div className="list-container">
                {lists.map(list => (
                    <List key={list.id} title={list.title} cards={list.cards} />
                ))}
                <input type="button" className="create-btn" value="+ cтворити список" />
            </div>

        </div>


    )
}