import React from 'react';
import { useState } from "react";
import api from "../../../../api/request";
import { NewModalBoard } from '../../NewModalBoard';

interface CreateNewBoardProps {
    onBoardCreate: ()=> void;
}
  const CreateNewBoard = ({onBoardCreate}:CreateNewBoardProps)=>{ 
    const [isModalOpen, setModalOpen] = useState(false);
        const handleAddBoard = async (boardName:string, backgroundColor:string) => {
            try {
              await api.post('/board', {
                title: boardName,
                custom: {
                  background: backgroundColor, 
                },
              },
              {
                headers: {
                    Authorization: 'Bearer 123', 
                  },
              });
        onBoardCreate();
            } catch (error) {
              console.error('Error adding new board:', error);
            }
          };

          return(
            <div>
            <button className="create-btn" onClick={() => setModalOpen(true)}>+ створити дошку</button>
        
            <NewModalBoard
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleAddBoard}
            />
           </div>
          )
 }
 
 export default CreateNewBoard;