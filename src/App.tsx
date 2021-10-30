import { homedir } from 'os';
import React, { useEffect } from 'react';
import './App.css';
import Home from './Home'

function App() {
  useEffect(() => {
    document.title = "Barthilas Auctions"
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <Home />
      </header>
    </div>
  );
}

export default App;
