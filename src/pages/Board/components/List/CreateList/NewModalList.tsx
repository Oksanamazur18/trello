import React, { useState } from "react";

interface NewModalListProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (listName: string) => void;
}

export const NewModalList: React.FC<NewModalListProps> = ({ isOpen, onClose, onSave }) => {
  const [listName, setListName] = useState("");
  const [error, setError] = useState('');

  const handleSave = () => {
    const listNameRegex = /^[a-zA-Z0-9\u0400-\u04FF\s\-_.]+$/;
    if (listName.trim() && listNameRegex.test(listName.trim())) {
      onSave(listName);
      setListName('');
      onClose();
      setError('');
    } else {
      setError('Назва списку може містити лише цифри, літери, пробіли, тире, крапки та нижні підкреслення.');
      console.log(error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-list">
      <div className="modal-content">
        <h2>Create new list</h2>
        <input  
          type="text"
          className="list-input"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          placeholder="List Name"
        />
        <div className="buttons">
        <button className="btn-save" onClick={handleSave}>save</button>
        <button className="btn-cancel" onClick={onClose}>cancel</button>
        </div>

      </div>
    </div>
  )
}