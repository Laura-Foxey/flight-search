import React from 'react';
import './App.css';
import Searchbar from "./Searchbar"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="./img/logo.jpg" alt="logo"/>
        <h1> Flight search </h1>
      </header>
      <body>
        <Searchbar />
      </body>
      <footer>
        
      </footer>
    </div>
  );
}

export default App;
