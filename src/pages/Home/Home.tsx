import React from "react";
import api from "../../api/request";
import './home.scss';
import { useState, useEffect } from "react";
import  Board  from "./components/BoardSmall/BoardSmall";
import { IBoard } from "../../common/interfaces/IBoard";
import CreateNewBoard from "./components/CreateNewBoard/CreateNewBoard";


 const Home = () => {
    const [boards, setBoards] = useState<IBoard[]>([]);

    const fetchBoards = async () => {
        try {
              const response = await api.get('/board', {
              headers:{
                  Authorization: 'Bearer 123',
              }
          });
          console.log('Отримані дані:', response.data);
          setBoards(response.data.boards); 
        } catch (error) {
          console.error('Error fetching boards:', error);
        }
      };
  

    useEffect(() => {
        fetchBoards();
      }, []);

      
      const  handleBoardCreated = ()=>{
        fetchBoards();
      }
       

    return (
        <div className="home-container">
            <h1>Мої дошки</h1>
            <div className="boards-container">
                {boards.map(board => (
                        <Board key={board.id} id={board.id} title={board.title} custom={board.custom} onBoardRemove={fetchBoards} />
                ))}
                <CreateNewBoard onBoardCreate={handleBoardCreated}/>
            </div>

        </div>
    )
}
export default Home;