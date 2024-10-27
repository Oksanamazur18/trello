import React from 'react';
import { useState } from "react";
import api from "../../../../../api/request";
import { NewModalList } from './NewModalList';
import { IList } from '../../../../../common/interfaces/IList';

interface CreateNewListProps {
    boardId: string | undefined;
    onListCreate: ()=> void;
    currentLists: IList[];
}
  const CreateNewList = ({boardId, onListCreate, currentLists}:CreateNewListProps)=>{ 
    const [isModalOpen, setModalOpen] = useState(false);

        const handleAddList = async (listName:string) => {
            const position = currentLists.length + 1;
            try {
              await api.post(`/board/${boardId}/list`, {
                title: listName,
                position: position
              },
              {
                headers: {
                    Authorization: 'Bearer 123', 
                  },
              });
        onListCreate();

            } catch (error) {
              console.error('Error adding new list:', error);
            }
          };

          return(
            <div>
            <button className="create-list-btn" onClick={() => setModalOpen(true)}>+ створити список</button>
        
            <NewModalList
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleAddList}
            />
           </div>
          )
 }
 

 export default CreateNewList;