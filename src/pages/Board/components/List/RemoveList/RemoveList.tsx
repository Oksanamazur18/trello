import React from "react";
import api from "../../../../../api/request";

interface IRemoveListProps{
    boardId: string|undefined;
   listId: number;
   onListRemove: ()=>void;
}

const RemoveList =({boardId, listId, onListRemove}:IRemoveListProps)=>{
    const handleRemoveList= async()=>{
        try {
            await  api.delete(`/board/${boardId}/list/${listId}`);
            onListRemove();
        }catch (error) {
            console.error(error);
        }

    }

    return(
        <div>
            <input className="btn-delete-list" type="button" value="видалити  список" onClick={handleRemoveList} />
        </div>
    )
}

export default RemoveList;