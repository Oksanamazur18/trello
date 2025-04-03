import React, { useState } from "react";
import { boardNameRegex } from "../../common/constants/regex";
interface NewBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (boardName: string, boardColor: string) => void;
}

export const NewModalBoard: React.FC<NewBoardModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [boardName, setBoardName] = useState("");
  const [boardColor, setBoardColor] = useState("#000000");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (boardName.trim() && boardNameRegex.test(boardName.trim())) {
      onSave(boardName, boardColor);
      setBoardName("");
      onClose();
      setError("");
    } else {
      setError(
        "Назва дошки може містити лише цифри, літери, пробіли, тире, крапки та нижні підкреслення.",
      );
      console.log(error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-board">
        <div className="modal-content">
          <h2>Create new board</h2>
          <input
            type="text"
            className="board-input"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            placeholder="Board Name"
          />
          <div className="error_message">{error}</div>
          <input
            type="color"
            className="board-input color-input"
            value={boardColor}
            onChange={(e) => setBoardColor(e.target.value)}
            name="color"
          />
          <div className="buttons">
            <button className="btn-save" onClick={handleSave}>
              Save
            </button>
            <button className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
