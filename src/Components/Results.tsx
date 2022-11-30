import React, {useState} from 'react';
import "../CSS/Results.css"
import { Button} from '@mantine/core';

interface Props {
  ret: string,
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
  outbound: {
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
}

function Results({ret, inbound, outbound}: Props) {
  const [selected, setSelected] = useState(false);
  const [save, setSave] = useState<Array<{

      departureAt: Date,
      arriveAt: Date,
      avaliableSeats: number,
      adult: number,
      child: number,
    } | null>>([]);

  const calculateTime = (dt1: Date, dt2: Date) => {
    
    var diff =(new Date(dt2).getTime() - new Date(dt1).getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
  }

  const saveSelection = (id: number) => {
    const saved = inbound.itineraries.find(x => x.itinerary_id === id);
    console.log('this is saved: ');
    console.log(saved);
  }

  console.log("this is inbound")
  console.log(inbound)

  if (!inbound.itineraries) { return <p> Your dream destination awaits... </p>}

  return (
      <>
        {!selected && <ul className='search__results'>
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
        </ul>}
        {ret === 'return' && selected && 
        <>
          <ul className='search__results'>
            {outbound.itineraries.map((flight) => (
              <li key={flight.itinerary_id}>
                <p>Departure from {outbound.departureDestination} at {flight.departureAt}</p>
                <p> Arriving in {outbound.arrivalDestination} at {flight.arriveAt} </p>
                <p> Trip duration: {calculateTime(flight.departureAt, flight.arriveAt)} hours</p>
                <p> Price per adult: {flight.prices[0].adult} {flight.prices[0].currency} </p>
                <p> Seats available: {flight.avaliableSeats} </p>
                {flight.avaliableSeats < 1 ? 
                <Button color="gray" data-disabled> Sold out </Button> : 
                <Button> Select & Go to Booking</Button> }
              </li>
            ))}
          </ul>
        </>}
      </>
  );
}

export default Results;
