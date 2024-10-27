import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api, { setupInterceptors } from '../../api/request';
import './board.scss';
import { IBoard } from '../../common/interfaces/IBoard';
import { List } from './components/List/List';
import CreateNewList from './components/List/CreateList/CreateNewList';
import { toast } from 'react-toastify';  

export const Board: React.FC = () => {
  const { board_id } = useParams();
  const [board, setBoard] = useState<IBoard | null>(null);
  const [progress, setProgress] = useState<number>(0); 

  const fetchBoard = async () => {
    try {
    setupInterceptors(setProgress); 
      const response = await api.get(`/board/${board_id}`);
      setBoard(response.data);
 
    } catch (error) {
      console.error('Error fetching board:', error);
      setProgress(0);
      toast.error('Помилка при завантаженні дошки. Спробуйте ще раз.'); 
    }
  };

  useEffect(() => {
    
   
    fetchBoard();
  }, [board_id]);

  if (board === null) {
    return (
      <div>
   
        <progress value={progress} max="100" />
      </div>
    );
  }

  const listsAll = board && board.lists ? board.lists : [];

  return (
    <div className="board">
      <Link to={`/`} className="home-link">
        <input type="button" className="btn-home" value="<- додому" />
      </Link>
      <h1 className="board-name">{board.title}</h1>

      <div className="list-container">
        {listsAll.map((list) => (
          <List key={list.id} id={list.id} title={list.title} cards={list.cards} onCardCreated={fetchBoard} />
        ))}
        <CreateNewList boardId={board_id} onListCreate={fetchBoard} currentLists={listsAll}></CreateNewList>
      </div>
    </div>
  );
};
