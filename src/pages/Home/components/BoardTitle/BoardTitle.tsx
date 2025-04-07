import React, { useEffect, useState } from "react";
import api from "../../../../api/request.ts";
import type { IBoard } from "../../../../common/interfaces/IBoard.d.ts";

interface IBoartTitleProps {
  boardId: number;
  initialTitle: string;
  isEditing: boolean;
  onClose: () => void;
  onEditing: (newTitle: string) => void;
}

const BoardTitle = ({boardId, initialTitle, isEditing,  onClose, onEditing}: IBoartTitleProps) => {
  const [boardTitle, setBoardTitle] = useState(initialTitle);
  const [error, setError] = useState("");

  useEffect(() => {
    setBoardTitle(initialTitle);
  }, [initialTitle]);

  const boardNameRegex = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ0-9\s\-_.,]+$/;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (boardNameRegex.test(value)) {
      setError("");
    } else {
      setError(
        "Назва може містити лише цифри, літери, пробіли, тире, крапки та нижні підкреслення.",
      );
    }
    setBoardTitle(value);
  };

  const handleSave = async () => {
    if (error || !boardTitle) {
      setError("Невірна назва дошки");
      return;
    }

    try {
      console.log("Board ID:", boardId);
      console.log("Board Title:", boardTitle);
      await api.put(`/board/${boardId}`, { title: boardTitle });

      const response: IBoard = await api.get(`/board/${boardId}`);
      setBoardTitle(response.title);
    } catch (err) {
      setError("Не вдалося зберегти назву дошки");
      console.log(err + error);
    }
    onEditing(boardTitle);
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const handleBlur = () => {
    handleSave();
  };

  if (!isEditing) {
    return null;
  }

  return (
    <div className="titleChange">
      <input
        className="title_update"
        type="text"
        value={boardTitle}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyPress}
        autoFocus
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default BoardTitle;
