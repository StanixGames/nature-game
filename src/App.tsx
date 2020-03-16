import React, { useEffect } from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import game from './game';
import {GUI} from './gui';
import './App.css';

function App() {
  useEffect(() => {
    game.init();
    return () => {
      game.destroy();
    }
  }, []);
  
  return (
    <Provider store={store}>
    <div className="wrapper">
      <div id="game" />
      <GUI />
    </div>
    </Provider>
  );
}

export default App;
