import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Searchbar.css"
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import LiveSearch from "./LiveSearch";
import Results from './Results'
import { DatePicker} from '@mantine/dates';
import { Button, RangeSlider, MantineProvider, SegmentedControl } from '@mantine/core';


function Searchbar() {
  const [to, setTo] = useState<Date | null>(null);
  const [from, setFrom] = useState<Date | null>(null);
  const [ret, setRet] = useState('return');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [price, setPrice] = useState<[number, number]>([0, 5000]);
  const [error, setError] = useState(false);
  const [fetched, setFetched] = useState<[] | any>([]);
  const [twoFetched, setTwoFetched] = useState<[] | any>([])
  const [saved, setSaved] = useState<string[] | any>([])
  const navigate = useNavigate();


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
    if (ret === 'return' && to && from && destination && origin) {
      return true
    } 
    else if (ret === 'oneway' && to && destination && origin) { 
      return true
    }
    return false;
  }

  const search = () => {
    if (!checkValues()) {
      setError(true);
      setFetched([]);
      setTwoFetched([]);
      return ;
    }
      if (to) {
        console.log(new Date(to).toISOString().slice(0, 10));
      fetch(`https://localhost:7277/flights?departure=${origin}&destination=${destination}&date=${new Date(to).toISOString().slice(0, 10)}`)
      .then(res => res.json())
      .then(data => setFetched(data))
      .catch((error) =>
        console.log('fetchToken error: ', error)) }
      if (ret === 'return' && from) {
        fetch(`https://localhost:7277/flights?departure=${destination}&destination=${origin}&date=${new Date(from).toISOString().slice(0, 10)}`)
        .then(res => res.json())
        .then(data => setTwoFetched(data))
        .catch((error) => console.log('fetchToken error: ', error))
  }
  setError(false);
}

console.log(fetched)
console.log(twoFetched)

return (
  <MantineProvider
    theme={{
      colors: {
        'white': ['#ffffff', '#e5e5e5'],
      },
    }}
  >
    <div className="searchpage">
      <div className="search">
      {error && <p style={{color: 'red'}}>Please complete all values!</p> }
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
        <DatePicker label="Select date" inputFormat="YYYY/MM/DD"
          labelFormat="YYYY/MM/DD" minDate={new Date()} value={to} onChange={setTo} clearable={false}/>
        {ret === 'return' &&  <DatePicker label="Select date" inputFormat="YYYY/MM/DD"
          labelFormat="YYYY/MM/DD" minDate={new Date()} value={from} onChange={setFrom} clearable={false}/>}
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
    
      <div>
        {fetched.status ? 
        <>
          <p>Inbound flights: </p>
          <p>No results found</p>
        </> : 
        <Results inbound={fetched} title={'Results towards destination: '} setSaved={setSaved}/>}
        {twoFetched.status && ret === "return" ? 
                <>
                <p>Outbound flights: </p>
                <p>No results found</p>
              </> :  
        <Results inbound={twoFetched} title={'Results back home: '} setSaved={setSaved}/>}

        {saved.length === 1 && ret === 'oneway' && <Button onClick={() => navigate(`/book?flight=${saved[0]}&return=0&adults=${adults}&children=${children}`)} > Review & Book </Button>}
        {saved.length >= 1 && ret === 'return' && <Button onClick={() => navigate(`/book?flight=${saved[0]}&return=${saved[1]}&adults=${adults}&children=${children}`)}> Review & Book </Button>}
      </div>
    </div>

  </MantineProvider>
);
  
}

export default Searchbar;
