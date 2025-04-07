import React, {useState} from "react";
import api from "../../../../../api/request.ts";
import NewModalCard from "./NewModalCard.tsx";
import type { ICard } from "../../../../../common/interfaces/ICard.d.ts";

interface ICreateNewCardProps {
  boardId: string | undefined;
  listId: string | undefined;
  currentCards: ICard[];
  onCardCreate: () => void;
}
export function CreateNewCard ({boardId, listId,currentCards, onCardCreate}: ICreateNewCardProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAddCard = async (
    cardName: string,
    description: string,
    deadline: Date,
  ) => {
    const position = currentCards.length === 0 ? 0 : currentCards.length + 1;
    try {
      await api.post(
        `/board/${boardId}/card`,
        {
          title: cardName,
          list_id: listId,
          position,
          description,
          custom: {
            deadline,
          },
        },
      
      );
      onCardCreate();
    } catch (error) {
      console.error("Error adding new list:", error);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="create-card-btn"
        onClick={() => setModalOpen(true)}>
        + додати картку
      </button>

      <NewModalCard
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleAddCard}
      />
    </div>
  );
};

export default CreateNewCard;
