import React, { useEffect } from 'react';
import game from './game';
import './App.css';

function App() {
  useEffect(() => {
    game.init();
  }, []);
  
  return (
    <div className="wrapper">
      sdf
    </div>
  );
}

export default App;
