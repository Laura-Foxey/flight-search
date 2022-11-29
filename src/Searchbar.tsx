import React, { useState } from "react";
import "./CSS/Searchbar.css"
import "react-datepicker/dist/react-datepicker.css";
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import LiveSearch from "./LiveSearch";
import { DatePicker, DateRangePicker, DateRangePickerValue  } from '@mantine/dates';
import { Button, RangeSlider, MantineProvider, SegmentedControl } from '@mantine/core';


function Searchbar() {
  const [date, setDate] =useState<DateRangePickerValue>([
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

  return (
    <MantineProvider
      theme={{
        colors: {
          'white': ['#ffffff', '#e5e5e5'],
        },
      }}
    >
      <div className="search">
        <div className="search__traveltype">
          <SegmentedControl
            size="lg"
            color="grape"
            value={ret}
            onChange={setRet}
            data={[
              { label: 'One-way', value: 'one' },
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
            value={date}
            onChange={setDate}
            clearable={false}
          /> : <DatePicker label="Select date" minDate={new Date()} value={day} onChange={setDay} clearable={false}/> }
          
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
        </div>

        <div className="search__box">
            <p> Price range: </p>
            <RangeSlider labelAlwaysOn min={1} max={5000} thumbSize={27} marks={marks} value={price} onChange={setPrice} color="white"/>
        </div>

        <Button color="grape" radius="md" size="lg"> Submit </Button>
      </div>
    </MantineProvider>
  );
}

export default Searchbar;
