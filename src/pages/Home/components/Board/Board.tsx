import React, { useState } from "react";
import { Link } from "react-router-dom";
import BoardTitle from "../BoardTitle/BoardTitle";
import './board.scss'
import RemoveBoard from "../RemoveBoard/RemoveBoard";
interface BoardProps {
  id: number;
  title: string;
  custom: {
    background: string;
  };
  onBoardRemove: ()=>void;
}

 const Board = ({ id, title, custom, onBoardRemove }: BoardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setTitle]= useState(title);
  const colorBoard = custom ? {
    backgroundColor: custom.background
  } : {};
  
  const handleSave = async (newTitle:string) => {
    try {
      setTitle(newTitle); // Оновлюємо локальний стан батьківського компоненту
      setIsEditing(false); // Закриваємо режим редагування
    } catch (error) {
      console.error("Помилка під час збереження назви:", error);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();  
    setIsEditing(true);  
  };
  return (
    <div className="board-container" style={colorBoard}>
      <div className="title-container" onClick={handleClick}>
        {isEditing ? (
          <BoardTitle
            boardId={id}
            initialTitle={title}
            isEditing={isEditing}
            onEditing = {handleSave}
            onClose={() => setIsEditing(false)} />) :
          (<p className="title">{newTitle}</p>)}
      </div>
      <div className="actions">
      <Link  onClick={()=>{console.log(id)}}
        to={`/board/${id}`}
        key={id}
        className="board-link"
      >
        Перейти до дошки
      </Link>

      <RemoveBoard  boardId={id} onBoardRemove={onBoardRemove}></RemoveBoard>

      </div>
      
    </div>
  )
}

export default  Board;

