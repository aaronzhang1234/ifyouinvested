import React from 'react';
import './App.css';

function App() {
  function getStock(){
    console.log("kill me");
  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={getStock}>
          Press Button for Stock
        </button>
      </header>
    </div>
  );
}

export default App;
