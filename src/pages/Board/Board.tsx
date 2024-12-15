import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/hooks'; 
import { fetchBoard } from '../Board/boardSlice';
import { RootState } from '../../store/store';
import './board.scss';
import List from './components/List/List';
import CreateNewList from './components/List/CreateList/CreateNewList';
import { toast } from 'react-toastify';
import Modal from '../modal/Modal';
import { openModal } from '../modal/modalSlice';
import { ICard } from '../../common/interfaces/ICard';

export const Board = () => {
  const { board_id, card_id } = useParams<{ board_id: string; card_id?: string }>();
  const dispatch = useAppDispatch(); 
  const { board, loading, error } = useSelector((state: RootState) => state.board);
  const { isOpen } = useSelector((state: RootState) => state.modal);

  useEffect(() => {
    
    if (board_id) {
      dispatch(fetchBoard(board_id)); 
    }
  }, [board_id, dispatch]);

  useEffect(() => {
    if (card_id && !isOpen) {
      const card = board?.lists?.flatMap((list) => list.cards).find((card) => card.id === parseInt(card_id));
      if (card) {
        const list = board?.lists?.find((list) => list.cards.some((c:ICard) => c.id === parseInt(card_id)));
        dispatch(openModal({ cardData: card, board_id, list_id: list?.id || 0 }));
      }
    }
  }, [card_id, board, dispatch, isOpen]);

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

  return (
    <div className="board">
      <Link to={`/`} className="home-link">
        <input type="button" className="btn-home" value="<- додому" />
      </Link>
      <h1 className="board-name">{board.title}</h1>

      <div className="list-container">
        {listsAll.map((list) => (
          <List key={list.id} id={list.id} title={list.title} cards={list.cards} onCardCreated={() => dispatch(fetchBoard(board_id!))} />
        ))}
        <CreateNewList boardId={board_id!} onListCreate={() => dispatch(fetchBoard(board_id!))} currentLists={listsAll}></CreateNewList>
      </div>
      <Modal />
    </div>
  );
};

export default Board;
