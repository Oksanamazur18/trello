import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/request.ts";
import "./home.scss";
import Board from "./components/BoardSmall/BoardSmall.tsx";
import type { IBoard } from "../../common/interfaces/IBoard.d.ts";
import CreateNewBoard from "./components/CreateNewBoard/CreateNewBoard.tsx";


const Home = () => {
  const [boards, setBoards] = useState<IBoard[]>([]);
  const navigate = useNavigate(); 

  const fetchBoards = async () => {
    try {
      const response = await api.get("/board", {
        headers: {
          Authorization: "Bearer 123",
        },
      });
      console.log("Отримані дані:", response.data);
      setBoards(response.data.boards);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleBoardCreated = () => {
    fetchBoards();
  };

  const exit = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  }

  return (
    <div className="home-container">
      <h1>Мої дошки</h1>
      <div className="boards-container">
        {boards.map((board) => (
          <Board
            key={board.id}
            id={board.id}
            title={board.title}
            custom={board.custom}
            onBoardRemove={fetchBoards}
          />
        ))}
        <CreateNewBoard onBoardCreate={handleBoardCreated} />
      </div>
      <button
      className="exit"
        onClick={exit}
        type="button">Вийти
      </button>
    </div>
  );
};
export default Home;
