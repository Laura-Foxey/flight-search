import React from 'react';
import Booking from './Components/Booking';
import Header from './Components/Header';
import Searchbar from "./Components/Searchbar"
import Error from "./Components/Error"
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
    <Header />  
    <Routes>
      <Route path="/" element={<Searchbar />} />
      <Route path="book" element={<Booking/>} />
      <Route path="error" element={<Error />} />

    </Routes>
    </>
  );
}

export default App;
