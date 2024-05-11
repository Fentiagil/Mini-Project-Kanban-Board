import './App.css';
import './assets/Kanban.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Kanban from './routes/Kanban';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
          <Kanban/> 
      </BrowserRouter>
    </div>
    
  );
}

export default App;
