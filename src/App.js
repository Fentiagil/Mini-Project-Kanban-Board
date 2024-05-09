
import './App.css';
import React from 'react';

function App() {
  return (
    <div className="App">

      {/* Header */}
      <header className="App-header"> 
        <div className='Header-menu'>      
          <div className="Right-side">
            <div className="Heading">
              <h3 className="Header-brand">Product Roadmap</h3>
            </div>
            <div className="Button flex-container">
              <button type="button" className="btn-newgroup">+ Add New Group</button>
            </div>
            
          </div>

          <div className="Left-side"></div>
        </div>      
      </header><hr></hr>

      {/* Body */}
      <div className="App-body">
      
      </div>

    </div>
  );
}

export default App;
