import './App.css';
import './assets/Kanban.css';
import './assets/ItemTask.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Kanban from './routes/Kanban';
import Test from './Test.js';


function App() {

  return (
    <div className="App">
      <BrowserRouter basename="/v1">
          <Kanban/> 
          <Test/> 
      </BrowserRouter>
    </div>
    
  );
}

export default App;
