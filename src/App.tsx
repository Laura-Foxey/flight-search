import React from 'react';
import './App.css';
import Searchbar from "./Searchbar"

function App() {
  return (
    <>
      <header className="App-header">
        <section>
          <img src={require('./img/logo.jpg')} alt="logo"/>
          <h1> Flight search </h1>
        </section>
      </header>
      <body>
        <Searchbar />
      </body>
      <footer>

      </footer>
    </>
  );
}

export default App;
