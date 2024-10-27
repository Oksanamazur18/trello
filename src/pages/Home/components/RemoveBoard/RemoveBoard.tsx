import React from "react";
import api from "../../../../api/request";
interface IRemoveBoardProps{
   boardId: number;
   onBoardRemove: ()=>void;
}

const RemoveBoard =({boardId, onBoardRemove}:IRemoveBoardProps)=>{
    const handleRemoveBoard= async()=>{
        try {
            await  api.delete(`/board/${boardId}`);
            onBoardRemove();
        }catch (error) {
            console.error(error);
        }


    }

    return(
        <div>
            <input className="btn-delete" type="button" value="Видалити дошку" onClick={handleRemoveBoard} />
        </div>
    )
}

export default RemoveBoard;