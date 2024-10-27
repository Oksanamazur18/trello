import React from "react";
import './list.scss';
import { Card } from "../Card/Card";
import { IList } from "../../../../common/interfaces/IList";
import { useParams } from "react-router-dom";
import CreateNewCard from "../Card/CeateNewCard/CreateNewCard";
import RemoveList from "./RemoveList/RemoveList";

export const List: React.FC<IList>= ({id, title, cards, onCardCreated })=>{
  const { board_id } = useParams();
  return(
    <div className="list">
        <h2 className="list-name">{title}</h2>
        <div>
          {cards?cards.map(card=>(
            <div key={card.id}>
            <Card key={card.id} listId={id} cardId={card.id} boardId={board_id} title={card.title} onCardUpdating={onCardCreated}/>
            
            </div>
          )):null}
        </div>
        <CreateNewCard  boardId={board_id}  listId={id} currentCards={cards} onCardCreate={onCardCreated}></CreateNewCard>
        <RemoveList boardId={board_id} listId={id} onListRemove={onCardCreated}></RemoveList>
    </div>
  )
}