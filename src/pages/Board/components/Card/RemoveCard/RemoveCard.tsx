import React from "react";
import api from "../../../../../api/request.ts";

interface IRemoveCardProps {
  boardId: string | undefined;
  cardId: number;
  onCardRemove: () => void;
}

const RemoveCard = ({boardId,cardId,onCardRemove}: IRemoveCardProps) => {
  const handleRemoveCard = async () => {
    try {
      await api.delete(`/board/${boardId}/card/${cardId}`);
      onCardRemove();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        className="btn-delete-card"
        type="button"
        value="видалити  картку"
        onClick={handleRemoveCard}
      />
    </div>
  );
};

export default RemoveCard;
