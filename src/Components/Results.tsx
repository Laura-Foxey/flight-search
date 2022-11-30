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
      }
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
      }
    }[]
  }
}

function Results({ret, inbound, outbound}: Props) {
  const [selected, setSelected] = useState(false);
  const [save, setSave] = useState();

  const calculateTime = (dt1: Date, dt2: Date) => {
    
    var diff =(new Date(dt2).getTime() - new Date(dt1).getTime()) / 1000;
    console.log(new Date(dt2).getTime())
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
  }

  const saveSelection = () => {

  }

  if (!inbound.itineraries) { return <p> Your dream destination awaits... </p>}
  if (ret === 'oneway') {
    return (
      <ul className='search__results'>
      {inbound.itineraries.map((flight) => (
        <li key={flight.itinerary_id}>
          <p>Departure from {inbound.departureDestination} at {flight.departureAt}</p>
          <p> Arriving in {inbound.arrivalDestination} at {flight.arriveAt} </p>
          <p> Trip duration: {calculateTime(flight.departureAt, flight.arriveAt)} hours</p>
          <Button> Select </Button>
        </li>
      ))}
    </ul>
    )
  }
  return (
      <>
        {!selected && <ul className='search__results'>
          {inbound.itineraries.map((flight) => (
            <li key={flight.itinerary_id}>
              <p>Departure from {inbound.departureDestination} at {flight.departureAt}</p>
              <p> Arriving in {inbound.arrivalDestination} at {flight.arriveAt} </p>
              <p> Trip duration: {calculateTime(flight.departureAt, flight.arriveAt)} hours</p>
              <Button onClick={() => setSelected(true)}> Select </Button>
            </li>
          ))}
        </ul>}
        {selected && 
        <>
          <ul className='search__results'>
            {outbound.itineraries.map((flight) => (
              <li key={flight.itinerary_id}>
                <p>Departure from {outbound.departureDestination} at {flight.departureAt}</p>
                <p> Arriving in {outbound.arrivalDestination} at {flight.arriveAt} </p>
                <p> Trip duration: {calculateTime(flight.departureAt, flight.arriveAt)} hours</p>
                <Button> Select </Button>
              </li>
            ))}
          </ul>
        </>}
      </>
  );
}

export default Results;
