import { useParams } from "react-router-dom";
import React, { useState } from "react";
import "./list.scss";
import Card from "../Card/Card.tsx";
import type  { IList } from "../../../../common/interfaces/IList.d.ts";
import CreateNewCard from "../Card/CeateNewCard/CreateNewCard.tsx";
import RemoveList from "./RemoveList/RemoveList.tsx";
import api from "../../../../api/request.ts";

const List = (list: IList) => {
  const { boardId } = useParams();
  const [draggedCardId, setDraggedCardId] = useState<number | null>(null);
  const [slotIndex, setSlotIndex] = useState<number | null>(null);

  const handleDragStart = async (
    event: React.DragEvent<HTMLDivElement>,
    cardId: number,
    position: number,
    listId: number,
  ) => {
    event.dataTransfer.setData("text/plain", cardId.toString());
    setDraggedCardId(cardId);
    setSlotIndex(position);

    const boundingRect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - boundingRect.left + 10;
    const offsetY = event.clientY - boundingRect.top + 10;

    const dragImage = event.currentTarget.cloneNode(true) as HTMLElement;
    dragImage.classList.add("dragging-image");
    dragImage.style.position = "absolute";
    dragImage.style.width = "260px";
    dragImage.style.opacity = "0.8";
    dragImage.style.transform = "rotate(5deg)";
    dragImage.style.transition = "transform 0.2s ease";
    document.body.appendChild(dragImage);
    event.dataTransfer.setDragImage(dragImage, offsetX, offsetY);

    
    const updatedCards = list.cards
    .filter((card) => card.id !== cardId)
    .map((card) => ({
      id: card.id,
      position: card.position > position ? card.position - 1 : card.position,
      list_id: listId,
    }));

    try {
      await api.put(`/board/${boardId}/card`, updatedCards);
    } catch (error) {
      console.error("Error updating card positions:", error);
    }
  };

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>,
    index: number,
  ) => {
    event.preventDefault();
    const transferElement = event.dataTransfer;
    transferElement.dropEffect = "move";

    const boundingRect = event.currentTarget.getBoundingClientRect();
    const offsetY = event.clientY - boundingRect.top;

    setSlotIndex(offsetY < boundingRect.height / 2 ? index : index + 1);
  };

  const handleDragOverList = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const transfer = event.dataTransfer;
    transfer.effectAllowed = "move";
    transfer.dropEffect = "move";
    if (list.cards.length === 0) {
      setSlotIndex(0);
    }
    const boundingRect = event.currentTarget.getBoundingClientRect();
    const offsetY = event.clientY - boundingRect.top;
    if (offsetY > boundingRect.height - 20) {
      setSlotIndex(list.cards.length);
    }
  };

  const handleDrop = async (
    event: React.DragEvent<HTMLDivElement>,
    targetListId: number,
  ) => {
    event.preventDefault();
    const droppedCardId = +event.dataTransfer.getData("text/plain");

    if (droppedCardId && slotIndex !== null) {
      const updatedCards = list.cards
        .filter((card) => card.id !== droppedCardId)
        .map((card) => ({
          id: card.id,
          position:
            card.position >= slotIndex ? card.position + 1 : card.position,
          list_id: targetListId,
        }));

      const newCard = {
        id: droppedCardId,
        position: slotIndex,
        list_id: targetListId,
      };
      updatedCards.push(newCard);

      try {
        await api.put(`/board/${boardId}/card`, updatedCards);
        list.onCardCreated();
      } catch (error) {
        console.error("Error dropping card:", error);
      }
    }

    setDraggedCardId(null);
    setSlotIndex(null);
  };

  const handleDragEnd = () => {
    const dragImage = document.querySelector(".dragging-image");
    if (dragImage) {
      dragImage.remove();
    }
    setDraggedCardId(null);
    setSlotIndex(null);
  };

  return (
    <div
      className="list"
      onDragOver={(event) => handleDragOverList(event)}
      onDrop={(event) => handleDrop(event, list.id)}
      onDragLeave={() => setSlotIndex(null)}
    >
      <h2 className="list-name">{list.title}</h2>
      <div className="cards">
        {list.cards
          ?.slice()
          .sort((a, b) => a.position - b.position)
          .map((card, index) => (
            <React.Fragment key={card.id}>
              {slotIndex === index && <div className="slot"/>}
              {slotIndex === card.id && <div className="slot"/>}
              <div
                className={draggedCardId === card.id ? "hidden-card" : ""}
                draggable="true"
                onDragStart={(event) =>
                  handleDragStart(event, card.id, card.position, list.id)
                }
                onDragOver={(event) => handleDragOver(event, index)}
                onDragEnd={handleDragEnd}
                onClick={(event) => event.preventDefault()}
              >
                <Card
                  listId={list.id}
                  card={card}
                  boardId={boardId}
                  onCardUpdating={list.onCardCreated}
                />
              </div>
            </React.Fragment>
          ))}
        {slotIndex === list.cards.length && <div className="slot"/>}
      </div>
      <CreateNewCard
        boardId={boardId}
        listId={list.id}
        currentCards={list.cards}
        onCardCreate={list.onCardCreated}
      />
      <RemoveList
        boardId={boardId}
        listId={list.id}
        onListRemove={list.onCardCreated}
      />
    </div>
  );
};

export default List;
