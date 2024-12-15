import React, { useEffect, useState } from 'react';
import api from "../../../../api/request";
import { IBoard } from '../../../../common/interfaces/IBoard';

interface IBoartTitleProps {
    boardId: number;
    initialTitle: string;
    isEditing: boolean;
    onClose:()=>void;
    onEditing: (newTitle:string)=>void;
}


const BoardTitle = (props: IBoartTitleProps) => {
    const [boardTitle, setBoardTitle] = useState(props.initialTitle);
    const [error, setError] = useState('');


    useEffect(() => {
        setBoardTitle(props.initialTitle);
    }, [props.initialTitle]);

    const boardNameRegex = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ0-9\s\-_.,]+$/; 

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
       const value = e.target.value;
       if(boardNameRegex.test(value)){
        setError('');
       }else{
        setError('Назва може містити лише цифри, літери, пробіли, тире, крапки та нижні підкреслення.')
       }
       setBoardTitle(value);
    }

    

    const handleSave = async()=>{
        if (error||!boardTitle) {
            setError('Невірна назва дошки');
            return;
        }

        try{
            console.log('Board ID:', props.boardId);  
            console.log('Board Title:', boardTitle);
           await api.put(`/board/${props.boardId}`, {title: boardTitle});

           const response:IBoard = await api.get(`/board/${props.boardId}`);
           setBoardTitle(response.title)
        }catch (err) {
            setError('Не вдалося зберегти назву дошки');
            console.log(err + error)
          }
          props.onEditing(boardTitle);
         props.onClose();
    } 
    

const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>)=>{
  if(e.key === 'Enter'){
    handleSave()
  }
}

const handleBlur  = ()=>{
    handleSave()
}

    if (!props.isEditing) {
        return null;
    }


    return (
        <div className="titleChange">
          <input 
            className='title_update'
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

}

export default  BoardTitle;
