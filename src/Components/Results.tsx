import React, {useState, SetStateAction} from 'react';

import "../CSS/Results.css"
import { Button} from '@mantine/core';

interface Props {
  inbound: {
    flight_id: string,
    departureDestination: string,
    arrivalDestination: string,
    itineraries: {
      itinerary_id: number,
      departureAt: Date,
      arriveAt: Date,
      avaliableSeats: number,
      prices: {
        currency: string,
        adult: number,
        child: number
      }[]
    }[]
  }
  title: string,

}

function Results({inbound, title}: Props) {

    //caculates hours it takes for flight 
  const calculateTime = (dt1: Date, dt2: Date) => {
    var diff =(new Date(dt2).getTime() - new Date(dt1).getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
  }


  const saveSelection = (id: number) => {
    const saved = inbound.itineraries.find(x => x.itinerary_id === id);
    if(saved) {
      // setSaved((prev: string[]) => [...prev, saved.itinerary_id.toString()])
    }
  }

  if (!inbound.itineraries) { return (<></>)}

  return (
      <>
      <p>{title}</p>
        <ul className='search__results'>
          {inbound.itineraries.map((flight) => (
            <li key={flight.itinerary_id}>
              <p> Departure from {inbound.departureDestination} at {flight.departureAt}</p>
              <p> Arriving in {inbound.arrivalDestination} at {flight.arriveAt} </p>
              <p> Trip duration: {calculateTime(flight.departureAt, flight.arriveAt)} hours</p>
              <p> Price per adult: {flight.prices[0].adult} {flight.prices[0].currency} </p>
              <p> Seats available: {flight.avaliableSeats} </p>
              { flight.avaliableSeats < 1 ? 
                <Button color="gray" data-disabled> Sold out </Button> : 
                <Button onClick={() => saveSelection(flight.itinerary_id)}> Select </Button>
              }
            </li>
          ))}
        </ul>
      </>
  );
}

export default Results;
