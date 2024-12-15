import React, { useState } from "react";
import './newCard.scss';
import { nameRegex } from "../../../../../common/constants/regex";


interface INewModalCardProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (listName: string, description:string, deadline: Date) => void;
}

 const NewModalCard = (props:INewModalCardProps) => {
  const [cardName, setCardName] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const [cardDate, setCardDate] = useState(new Date());
  const [error, setError] = useState('');

  const handleSave = () => {
    if (cardName.trim() && nameRegex.test(cardName.trim())) {
      props.onSave(cardName, cardDescription, cardDate);
      setCardName('');
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
      <div className="modal-content">
        <h2>Create new card</h2>
        <input
          type="text"
          className="card-title-input"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          placeholder="Card Name"
        />
       <textarea 
         className="card-description"
         value={cardDescription}
         onChange={(e)=>setCardDescription(e.target.value)
         }>
       </textarea>
        <input 
          className="card-deadline"
          type="date"  
          onChange={(e)=>setCardDate (new Date(e.target.value))}/>
         <div className="buttons">
         <button className="btn-save" onClick={handleSave}>save</button>
         <button className="btn-cancel" onClick={props.onClose}>cancel</button>
         </div>
       
      </div>
    </div>
  )
}
export default NewModalCard;