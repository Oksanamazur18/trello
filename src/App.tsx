import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Board } from './pages/Board/Board';
import  Home from './pages/Home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
    <div>
      <Router  basename='/trello'>
        <Routes>
          <Route path="/board/:board_id" element={<Board />} />
          <Route path="/board/:board_id/card/:card_id" element={<Board />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>

      <ToastContainer />
    </div>
    </Provider>
  );
}

export default App;
