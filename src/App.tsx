// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Board } from './pages/Board/Board';
// import './App.css';
// import { Home } from './pages/Home/Home';



// function App() {
//   return (
//     <div>
//     <Router>
//     <Routes>
//       <Route path="/board/:board_id" element={<Board />} />
//       <Route path="/board" element={<Board />} />
//       <Route path="/" element={<Home/>} />
//     </Routes>
//   </Router>
  
//     <div className="App">
  
//     </div>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Board } from './pages/Board/Board';
import { Home } from './pages/Home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/board/:board_id" element={<Board />} />
          <Route path="/board" element={<Board />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>

      {/* Компонент для спливаючих повідомлень */}
      <ToastContainer />

      <div className="App"></div>
    </div>
  );
}

export default App;
