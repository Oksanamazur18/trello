import React from "react";
import './list.scss';
import { ICard } from "../../../../common/interfaces/ICard";
import { Card } from "../Card/Card";

interface ListProps {
    title: string; 
    cards: ICard[]; 
  }

export const List: React.FC<ListProps>= ({ title, cards })=>{
  return(
    <div className="list">
        <h2 className="list-name">{title}</h2>
        <div>
          {cards.map(card=>(
            <Card key={card.id} title={card.title}/>
          ))}
        </div>
        <input type="button" className="btn-addCard" value="+ додати картку" />
    </div>
  )
}