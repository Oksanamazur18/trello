import React from 'react';
import { useState } from "react";
import api from "../../../../../api/request";
import NewModalCard  from './NewModalCard';
import { ICard } from '../../../../../common/interfaces/ICard';

interface ICreateNewCardProps{
    boardId: string | undefined;
    listId: string | undefined;
    currentCards: ICard[];
    onCardCreate: () => void;
}
const CreateNewCard = (props: ICreateNewCardProps) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleAddCard = async (cardName: string, description: string, deadline: Date) => {
        const position = props.currentCards.length===0?0: props.currentCards.length+1;
        try {
            await api.post(`/board/${props.boardId}/card`, {
                title: cardName,
                list_id: props.listId,
                position: position,
                description: description,
                custom: {
                    deadline: deadline
                }
            }, {
                headers: {
                    Authorization: 'Bearer 123', 
                },
            });
            props.onCardCreate();

        } catch (error) {
            console.error('Error adding new list:', error);
        }
    };

    return (
        <div>
            <button className="create-card-btn" onClick={() => setModalOpen(true)}>+ додати картку</button>

            <NewModalCard
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleAddCard}
            />
        </div>
    )
}


export default CreateNewCard;