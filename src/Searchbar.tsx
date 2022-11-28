import React, { useState } from "react";
import './App.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import LiveSearch from "./LiveSearch";

function Searchbar() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(startDate);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const values = [
    {
      key: "stockholm",
      value: "Stockholm",
    },
    {
      key: "oslo",
      value: "Oslo",
    },
    {
      key: "amsterdam",
      value: "Amsterdam",
    },

  ];

  console.log(origin)

  return (
    <div className="Searchbar">
    <button> One way </button>
      <button> Return  </button>
      <LiveSearch placeholder={"Origin"} data={values} datavalue={origin} setValue={setOrigin} /> 
      <DatePicker selected={startDate} minDate={new Date()} onChange={(date:Date) => setStartDate(date)} />
      <DatePicker selected={endDate} minDate={startDate} onChange={(date:Date) => setEndDate(date)} />
      <p> Passengers: </p>
      <section>
        <AiFillMinusCircle />
        <p>{adults} Adults </p>
        <AiFillPlusCircle />
      </section>
      <section>
        <AiFillMinusCircle />
        <p>{children} Children </p>
        <AiFillPlusCircle />
      </section>
    </div>
  );
}

export default Searchbar;
