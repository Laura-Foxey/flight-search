import React from 'react';
import './App.css';
import Booking from './Booking';
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
        <Booking />
      </body>
      <footer>

      </footer>
    </>
  );
}

export default App;
