import React, { useState } from "react";
import "./CSS/Searchbar.css"
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

  //sets a limit to minimum number of adults/children
  const decrementLimit = (input: string) => {
    if (input === "adult" && adults > 1) { setAdults (prev => prev - 1)}
    if (input === "child" && children > 0) { setChildren (prev => prev - 1)}
    return ;
  }

  return (
    <div className="search">
      <div className="">
        <p> One way </p>
        <p> Return  </p>
      </div>

      <div className="">
        <LiveSearch placeholder={"Origin"} data={values} datavalue={origin} setValue={setOrigin} />
        <LiveSearch
          placeholder={"Destination"} data={values.filter(d => d.value !== origin)} 
          datavalue={destination} setValue={setDestination} /> 
      </div>

      <div className="">
        <DatePicker className="" selected={startDate} minDate={new Date()} onChange={(date:Date) => setStartDate(date)} />
        <DatePicker selected={endDate} minDate={startDate} onChange={(date:Date) => setEndDate(date)} />
      </div>

      <div className="search__passengers">
        <p> Passengers: </p>
        <section className="search__passengers__section">
          <AiFillMinusCircle style={{fontSize: "180%"}} onClick={() => decrementLimit("adult")}/>
          <p> {adults} Adults(12+) </p>
          <AiFillPlusCircle style={{fontSize: "180%"}} onClick={() => setAdults(prev => prev + 1)}/>
        </section>
        <section className="search__passengers__section">
          <AiFillMinusCircle style={{fontSize: "180%"}} onClick={() => decrementLimit("child")}/>
          <p> {children} Children(0-12) </p>
          <AiFillPlusCircle style={{fontSize: "180%"}} onClick={() => setChildren(prev => prev + 1)}/>
        </section>
        <section>

        </section>
        <p> Submit </p>
      </div>
    </div>
  );
}

export default Searchbar;
