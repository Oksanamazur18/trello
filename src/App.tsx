import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Board } from "./pages/Board/Board.tsx";
import Home from "./pages/Home/Home.tsx";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import store from "./store/store.ts";
import Register from "./pages/authorization/Register/Register.tsx";
import Login from "./pages/authorization/Login/Login.tsx";
import PrivateRoute from "./pages/PrivateRoute.tsx";
import { setupInterceptors } from "./api/request.ts";

function App() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setupInterceptors(setProgress); 
  }, []);

  return (
    <Provider store={store}>
      <div>
        <Router basename="/trello">
          <Routes>
            <Route path="/auth" element={<Login />}/>
            <Route path="/login" element={<Register />} />
            <Route element={<PrivateRoute />}>
              <Route path="/board/:boardId" element={<Board />} />
              <Route path="/board/:boardId/card/:cardId" element={<Board />} />
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Login/>}/>
            </Route>
            <Route path="*" element={<Navigate to="/auth" />}/>
          </Routes>
        </Router>

        <ToastContainer />
      </div>
    </Provider>
  );
}

export default App;
