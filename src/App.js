import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import HeaderUtama from './routes/HeaderUtama';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HeaderUtama/>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
