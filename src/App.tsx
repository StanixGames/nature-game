import React, { useEffect } from 'react';
import game from './game';
import './App.css';

function App() {
  useEffect(() => {
    game.init();
  }, []);
  
  return (
    <div className="wrapper">
      <div id="game" />
    </div>
  );
}

export default App;
