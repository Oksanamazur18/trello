import React from "react";
import "./card.scss";
import RemoveCard from "./RemoveCard/RemoveCard";
import { ICard } from "../../../../common/interfaces/ICard";
import { useDispatch } from "react-redux";
import { openModal } from "../../../modal/modalSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

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
        board_id: boardId,
        list_id: listId,
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
      <button className="btn-update" onClick={handleClickUpdate}>
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
