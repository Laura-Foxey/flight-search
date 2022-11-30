import React, { useState } from "react";
import "../CSS/Searchbar.css"
import "react-datepicker/dist/react-datepicker.css";
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import LiveSearch from "./LiveSearch";
import Results from './Results'
import { DatePicker, DateRangePicker, DateRangePickerValue  } from '@mantine/dates';
import { Button, RangeSlider, MantineProvider, SegmentedControl } from '@mantine/core';


function Searchbar() {
  const [days, setDays] =useState<DateRangePickerValue>([
    new Date(),
    new Date(),
  ]);
  const [day, setDay] = useState<Date | null>(new Date());
  const [ret, setRet] = useState('return');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [price, setPrice] = useState<[number, number]>([0, 5000]);
  const [error, setError] = useState(false);
  const [fetched, setFetched] = useState<[] | any>([]);
  const [twoFetched, setTwoFetched] = useState<[] | any>([])

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

  const marks = [
    { value: 0, label: 'SEK0' },
    { value: 5000, label: 'SEK5000' },
  ];

  //sets a limit to minimum number of adults/children
  const decrementLimit = (input: string) => {
    if (input === "adult" && adults > 1) { setAdults (prev => prev - 1)}
    if (input === "child" && children > 0) { setChildren (prev => prev - 1)}
    return ;
  }

  const checkValues = () => {
    if (ret === 'return' && days[0] && days[1] && destination && origin) { 
      return true
    } 
    else if (ret === 'oneway' && day && destination && origin) { 
      return true
    }
    return false;
  }

  const search = () => {
    if (!checkValues()) {
      setError(true);
      return ;
    }
    fetch(`https://localhost:7277/flights?departure=${origin}&destination=${destination}`)
    .then(res => res.json())
    .then(data => setFetched(data))
    .catch((error) => console.log('fetchToken error: ', error))
    if (ret === 'return') {
      fetch(`https://localhost:7277/flights?departure=${destination}&destination=${origin}`)
      .then(res => res.json())
      .then(data => setTwoFetched(data))
      .catch((error) => console.log('fetchToken error: ', error))
    }
  }

  return (
    <MantineProvider
      theme={{
        colors: {
          'white': ['#ffffff', '#e5e5e5'],
        },
      }}
    >
      {error && <p>Please provide all values</p> }
      <div className="search">
        <div className="search__traveltype">
          <SegmentedControl
            size="lg"
            color="grape"
            value={ret}
            onChange={setRet}
            data={[
              { label: 'One-way', value: 'oneway' },
              { label: 'Return', value: 'return' },
            ]}
            />
        </div>

        <div className="search__box">
          <LiveSearch placeholder={"Origin"} data={values} datavalue={origin} setValue={setOrigin} />
          <LiveSearch
            placeholder={"Destination"} data={values.filter(d => d.value !== origin)} 
            datavalue={destination} setValue={setDestination} /> 
        </div>

        <div className="search__box">
        { ret==='return' ?  <DateRangePicker
            label="Select dates"
            minDate={new Date()}
            value={days}
            onChange={setDays}
            clearable={false}
            inputFormat="YYYY/MM/DD"
            labelFormat="YYYY/MM/DD"
          /> : <DatePicker label="Select date"             inputFormat="YYYY/MM/DD"
          labelFormat="YYYY/MM/DD" minDate={new Date()} value={day} onChange={setDay} clearable={false}/> }
        </div>

        <div className="search__passengers">
          <p> Passengers: </p>
          <section className="search__passengers__section">
            <AiFillMinusCircle style={{fontSize: "180%", color: "#be4bdb", cursor: 'pointer'}} onClick={() => decrementLimit("adult")}/>
            <p> {adults} Adults(12+) </p>
            <AiFillPlusCircle style={{fontSize: "180%", color: "#be4bdb", cursor: 'pointer'}} onClick={() => setAdults(prev => prev + 1)}/>
          </section>
          <section className="search__passengers__section">
            <AiFillMinusCircle style={{fontSize: "180%", color: "#be4bdb", cursor: 'pointer'}} onClick={() => decrementLimit("child")}/>
            <p> {children} Children(0-12) </p>
            <AiFillPlusCircle style={{fontSize: "180%", color: "#be4bdb", cursor: 'pointer'}} onClick={() => setChildren(prev => prev + 1)}/>
          </section>
        </div>

        <div className="search__box">
            <p> Price range: </p>
            <RangeSlider labelAlwaysOn min={1} max={5000} thumbSize={27} marks={marks} value={price} onChange={setPrice} color="white"/>
        </div>

        <Button color="grape" radius="md" size="lg" onClick={() => search()}> Submit </Button>
      </div>
      <Results ret={ret} inbound={fetched} outbound={twoFetched} />
    </MantineProvider>
  );
}

export default Searchbar;
