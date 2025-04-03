import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Board } from "./pages/Board/Board";
import Home from "./pages/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store";
import Register from "./pages/authorization/Register/Register";
import Login from "./pages/authorization/Login/Login";
import PrivateRoute from "./pages/PrivateRoute";

import { setupInterceptors } from "./api/request";

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
            <Route path="/auth" element={<Login />}></Route>
            <Route path="/login" element={<Register />} />
            <Route element={<PrivateRoute />}>
              <Route path="/board/:board_id" element={<Board />} />
              <Route path="/board/:board_id/card/:card_id" element={<Board />} />
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Login/>}/>
            </Route>
            <Route path="*" element={<Navigate to="/auth" />}></Route>
          </Routes>
        </Router>

        <ToastContainer />
      </div>
    </Provider>
  );
}

export default App;
