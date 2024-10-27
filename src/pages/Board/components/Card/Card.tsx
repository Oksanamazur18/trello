import React, { useState } from "react";
import './card.scss';
import UpdateCard from "./UpdateCard/UpdateCard";
import RemoveCard from "./RemoveCard/RemoveCard";

interface CardProps {
  title: string;
  cardId: number;
  boardId: string | undefined;
  listId: number;
  onCardUpdating: () => void;
}

export const Card: React.FC<CardProps> = ({ title, cardId, listId, boardId, onCardUpdating }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = () => {
    setIsEditing(true);  // Переключаємося в режим редагування
  };
  return (
    <div className="card-container" onClick={handleClick}>
      {/* <h3 className="card-name">{title}</h3> */}
      {isEditing ? (
        <UpdateCard
          cardId={cardId}
          boardId={boardId}
          listId={listId}
          initialTitle={title}
          isEditing={isEditing}
          onClose={() => setIsEditing(false)}
          onCardUpdating={onCardUpdating} />) :
        (<h3 className="card-name">{title}</h3>)}

      <RemoveCard boardId={boardId} cardId={cardId} onCardRemove={onCardUpdating}></RemoveCard>
    </div>
  )
}