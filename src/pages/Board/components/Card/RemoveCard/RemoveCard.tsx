import React from "react";
import api from "../../../../../api/request";


interface IRemoveCardProps{
    boardId: string|undefined;
   cardId: number;
   onCardRemove: ()=>void;
}

const RemoveCard =(props:IRemoveCardProps)=>{
    const handleRemoveCard= async()=>{
        try {
            await  api.delete(`/board/${props.boardId}/card/${props.cardId}`);
            props.onCardRemove();
        }catch (error) {
            console.error(error);
        }

    }

    return(
        <div>
            <input className="btn-delete-card" type="button" value="видалити  картку" onClick={handleRemoveCard} />
        </div>
    )
}

export default RemoveCard;