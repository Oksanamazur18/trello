import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import "./card.scss";
import RemoveCard from "./RemoveCard/RemoveCard.tsx";
import type { ICard } from "../../../../common/interfaces/ICard.d.ts";
import { openModal } from "../../../modal/modalSlice.ts";



interface CardProps {
  card: ICard;
  boardId: string | undefined;
  listId: number;
  onCardUpdating: () => void;
}

const Card = ({ card, boardId, listId, onCardUpdating }: CardProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickUpdate = () => {
    navigate(`/board/${boardId}/card/${card.id}`);
    dispatch(
      openModal({
        cardData: card,
        boardId,
        listId,
      }),
    );
  };

  return (
    <div className="card-container">
      <h3 className="card-name">{card.title}</h3>
      <RemoveCard
        boardId={boardId}
        cardId={card.id}
        onCardRemove={onCardUpdating}
      />
      <button type="button" className="btn-update" onClick={handleClickUpdate}>
        <FontAwesomeIcon
          className="icon"
          icon={faPen}
          style={{ color: "#49432d" }}
        />
        <div className="unvisible">редагувати</div>
      </button>
    </div>
  );
};

export default Card;
