import React, { useEffect, useState } from "react";
import api from "../../../../../api/request.ts";
import { nameRegex } from "../../../../../common/constants/regex.ts";

interface IUpdateCardProps {
  boardId: string | undefined;
  cardId: number;
  listId: number | undefined;
  initialTitle: string | undefined;
  isEditing: boolean;
  onClose: () => void;
  onCardUpdating: () => void;
}

const UpdateCard = (props: IUpdateCardProps) => {
  const [cardTitle, setCardTitle] = useState(props.initialTitle);
  const [error, setError] = useState("");

  useEffect(() => {
    setCardTitle(props.initialTitle);
  }, [props.initialTitle]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (nameRegex.test(value)) {
      setError("");
    } else {
      setError(
        "Назва може містити лише цифри, літери, пробіли, тире, крапки та нижні підкреслення.",
      );
    }
    setCardTitle(value);
  };

  const handleSave = async () => {
    if (error || !cardTitle) {
      setError("Невірна назва списку");
      return;
    }

    try {
      await api.put(`/board/${props.boardId}/card/${props.cardId}`, {
        title: cardTitle,
        description: "",
        list_id: props.listId,
      });
      props.onCardUpdating();
    } catch (err) {
      setError("Не вдалося зберегти назву дошки");
      console.log(err + error);
    }
    props.onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  if (!props.isEditing) {
    return null;
  }

  return (
    <div className="titleChange">
      <input
        type="text"
        className="update-card-input"
        value={cardTitle}
        onChange={handleInputChange}
        onBlur={handleSave}
        onKeyDown={handleKeyPress}
        autoFocus
      />
    </div>
  );
};

export default UpdateCard;
