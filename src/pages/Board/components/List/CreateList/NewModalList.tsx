import React, { useState } from "react";
import { nameRegex } from "../../../../../common/constants/regex";
interface INewModalListProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (listName: string) => void;
}

 const NewModalList = (props:INewModalListProps) => {
  const [listName, setListName] = useState("");
  const [error, setError] = useState('');

  const handleSave = () => {
    if (listName.trim() && nameRegex.test(listName.trim())) {
      props.onSave(listName);
      setListName('');
      props.onClose();
      setError('');
    } else {
      setError('Назва списку може містити лише цифри, літери, пробіли, тире, крапки та нижні підкреслення.');
      console.log(error);
    }
  };

  if (!props.isOpen) {
    return null;
  }

  return (
    <div className="modal">
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
        <button className="btn-cancel" onClick={props.onClose}>cancel</button>
        </div>

      </div>
    </div>
    </div>
  )
}
export default NewModalList;