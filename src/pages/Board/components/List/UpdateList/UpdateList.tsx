import React, { useEffect, useState } from 'react';
import api from "../../../../../api/request";
import { IList } from '../../../../../common/interfaces/IList';

interface IUpdateListProps {
    boardId: number;
    listId:number;
    initialTitle: string;
    isEditing: boolean;
    onClose:()=>void;
}


const UpdateList = ({ boardId, listId, initialTitle, isEditing, onClose }: IUpdateListProps) => {
    const [listTitle, setListTitle] = useState(initialTitle);
    const [error, setError] = useState('');


    useEffect(() => {
        setListTitle(initialTitle);
    }, [initialTitle]);

    const listNameRegex = /^[a-zA-Z0-9\s\-_.,]+$/; 

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
       const value = e.target.value;
       if(listNameRegex.test(value)){
        setError('');
       }else{
        setError('Назва може містити лише цифри, літери, пробіли, тире, крапки та нижні підкреслення.')
       }
       setListTitle(value);
    }

    

    const handleSave = async()=>{
        if (error||!listTitle) {
            setError('Невірна назва списку');
            return;
        }

        try{
            console.log('Board ID:', boardId);  // Перевірка, що передаємо правильний ID
            console.log('Board Title:', listTitle);
           await api.put(`/board/${boardId}/list/${listId}`, {title: listTitle});

           const response:IList = await api.get(`/board/${boardId}`);
           setListTitle(response.title)
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
            <input type="text" 
             value={listTitle}
             onChange={handleInputChange}
             onBlur={handleBlur}
             onKeyDown={handleKeyPress} 
             autoFocus/>
        </div>
    )

}

export default  UpdateList;
