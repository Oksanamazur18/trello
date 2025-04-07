import React, { useCallback, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../store/hooks.ts";
import { fetchBoard } from "./boardSlice.ts";
import { RootState } from "../../store/store.ts";
import "./board.scss";
import List from "./components/List/List.tsx";
import CreateNewList from "./components/List/CreateList/CreateNewList.tsx";
import Modal from "../modal/Modal.tsx";
import { openModal } from "../modal/modalSlice.ts";
import type { ICard } from "../../common/interfaces/ICard.d.ts";


export function Board  ()  {

  const { boardId, cardId } = useParams<{
    boardId: string;
    cardId?: string;
  }>();
  const dispatch = useAppDispatch();
  const { board, loading, error } = useSelector(
    (state: RootState) => state.board,
  );
  const { isOpen } = useSelector((state: RootState) => state.modal);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(boardId)
    if (boardId) {
      console.log("boardId")
      dispatch(fetchBoard(boardId));
    }
  }, [boardId, dispatch]);

  useEffect(() => {
    if (cardId && !isOpen) {
      const foundCard = board?.lists
        ?.flatMap((list) => list.cards)
        .find((card) => card.id === Number(cardId));
      if (foundCard) {
        const foundList = board?.lists?.find((list) =>
          list.cards.some((c: ICard) => c.id === Number(cardId)),
        );
        dispatch(
          openModal({ cardData: foundCard, boardId, listId: foundList?.id || 0 }),
        );
      }
    }
  }, [cardId, board, dispatch, isOpen]);

  const handleBoardUpdate = useCallback(() => {
    if (boardId) {
      dispatch(fetchBoard(boardId));
    }
  }, [boardId, dispatch]);

  if (loading) {
    return (
      <div>
        <progress value="0" max="100" />
        <p>Завантаження...</p>
      </div>
    );
  }

  if (error) {
    toast.error(`Помилка: ${error}`);
    return <p>{error}</p>;
  }

  if (!board) {
    return <p>Дошка не знайдена</p>;
  }

  const listsAll = board.lists || [];

  const exit = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  }

  return (
    <div className="board">
      <Link to="/" className="home-link">
        <input type="button" className="btn-home" value="<- додому" />
      </Link>
      <button
        className="exit"
        onClick={exit}
        type="button"> вийти
      </button>
      <h1 className="board-name">{board.title}</h1>

      <div className="list-container">
        {listsAll.map((list) => (
          <List
            key={list.id}
            id={list.id}
            title={list.title}
            cards={list.cards}
            onCardCreated={handleBoardUpdate}
          />
        ))}
        <CreateNewList
          boardId={boardId}
          onListCreate={handleBoardUpdate}
          currentLists={listsAll}
        />
      </div>
      <Modal />
    </div>
  );
};

export default Board;
