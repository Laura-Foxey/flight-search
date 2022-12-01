import React from 'react';
import "../CSS/App.css"

function Header() {
  return (
      <header className="App-header">
          <img src={require('../img/logo.jpg')} alt="logo"/>
          <h1> Flight searcher </h1>
      </header>
  );
}

export default Header;
