import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Board } from './pages/Board/Board';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
    <Router>
    <Routes>
      <Route path="/board" element={<Board />} />
    </Routes>
  </Router>
  
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    </div>
  );
}

export default App;
