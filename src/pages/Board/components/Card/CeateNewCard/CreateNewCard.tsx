import React from 'react';
import { useState } from "react";
import api from "../../../../../api/request";
import { NewModalCard } from './NewModalCard';
import { ICard } from '../../../../../common/interfaces/ICard';

interface CreateNewCardProps {
    boardId: string | undefined;
    listId: string | undefined;
    currentCards: ICard[];
    onCardCreate: () => void;
}
const CreateNewCard = ({ boardId, listId, currentCards, onCardCreate }: CreateNewCardProps) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleAddCard = async (cardName: string, description: string, deadline: Date) => {
        const position = currentCards.length + 1;
        try {
            await api.post(`/board/${boardId}/card`, {
                title: cardName,
                list_id: listId,
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
            onCardCreate();

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