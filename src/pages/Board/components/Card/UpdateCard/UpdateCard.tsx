import React, { useEffect, useState } from 'react';
import api from "../../../../../api/request";
// import { IList } from '../../../../../common/interfaces/IList';
// import { title } from 'process';


interface IUpdateCardProps {
    boardId: string|undefined;
    cardId:number;
    listId:number;
    initialTitle: string;
    isEditing: boolean;
    onClose:()=>void;
    onCardUpdating:()=>void;
}


const UpdateCard = ({ boardId, cardId, listId, initialTitle, isEditing, onClose, onCardUpdating }: IUpdateCardProps) => {
    const [cardTitle, setCardTitle] = useState(initialTitle);
    const [error, setError] = useState('');


    useEffect(() => {
        setCardTitle(initialTitle);
    }, [initialTitle]);

    const cardNameRegex = /^[a-zA-Z0-9\s\-_.,]+$/; 

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
       const value = e.target.value;
       if(cardNameRegex.test(value)){
        setError('');
       }else{
        setError('Назва може містити лише цифри, літери, пробіли, тире, крапки та нижні підкреслення.')
       }
       setCardTitle(value);
    }

    

    const handleSave = async()=>{
        if (error||!cardTitle) {
            setError('Невірна назва списку');
            return;
        }

        try{
            console.log('Board ID:', boardId);  // Перевірка, що передаємо правильний ID
            console.log('Board Title:', cardTitle);
           await api.put(`/board/${boardId}/card/${cardId}`, {title: cardTitle, description:"", list_id:listId});

        //    const response:IList = await api.get(`/board/${boardId}`);
        //    setListTitle(response.title)
        onCardUpdating();

        }catch (err) {
            setError('Не вдалося зберегти назву дошки');
            console.log(err + error)
          }
         onClose();
    } 
    

const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>)=>{
  if(e.key === 'Enter'){
    handleSave()
  }
}

const handleBlur  = ()=>{
    handleSave()
}

    if (!isEditing) {
        return null;
    }


    return (
        <div className="titleChange">
            <input 
             type="text" 
             className='update-card-input'
             value={cardTitle}
             onChange={handleInputChange}
             onBlur={handleBlur}
             onKeyDown={handleKeyPress} 
             autoFocus/>
        </div>
    )

}

export default  UpdateCard;

