import React, { useState } from "react";
import { Link } from "react-router-dom";
import BoardTitle from "../BoardTitle/BoardTitle";
import './boardSmall.scss'
import RemoveBoard from "../RemoveBoard/RemoveBoard";
interface IBoardProps {
  id: number;
  title: string;
  custom: {
    background: string;
  };
  onBoardRemove: ()=>void;
}

 const Board = (props: IBoardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setTitle]= useState(props.title);
  const colorBoard = props.custom ? {
    backgroundColor: props.custom.background
  } : {};
  
  const handleSave = async (newTitle:string) => {
    try {
      setTitle(newTitle); 
      setIsEditing(false); 
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
            boardId={props.id}
            initialTitle={props.title}
            isEditing={isEditing}
            onEditing = {handleSave}
            onClose={() => setIsEditing(false)} />) :
          (<p className="title">{newTitle}</p>)}
      </div>
      <div className="actions">
      <Link  onClick={()=>{console.log(props.id)}}
        to={`/board/${props.id}`}
        key={props.id}
        className="board-link"
      >
        Перейти до дошки
      </Link>

      <RemoveBoard  boardId={props.id} onBoardRemove={props.onBoardRemove}></RemoveBoard>

      </div>
      
    </div>
  )
}

export default  Board;

