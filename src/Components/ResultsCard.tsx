import React, {useState, SetStateAction, Dispatch} from 'react';

import "../CSS/Results.css"
import { Button} from '@mantine/core';

interface Props {
  inbound: {
    flight_id: string,
    departureDestination: string,
    arrivalDestination: string,
    },
  flight: {
    itinerary_id: number,
    departureAt: Date,
    arriveAt: Date,
    avaliableSeats: number,
    expanded: boolean,
    prices: {
      currency: string,
      adult: number,
      child: number
    }[]
  },
  setSaved: any,
  seats: number,
}

function ResultsCard({inbound, flight, setSaved, seats}: Props) {
  const [expanded, setExpanded] = useState(false);

    //caculates hours it takes for flight 
  const calculateTime = (dt1: Date, dt2: Date) => {
    var diff =(new Date(dt2).getTime() - new Date(dt1).getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
  }

  const saveSelection = () => {
      setSaved((prev: any) => [...prev, flight.itinerary_id.toString()])
  }

  return (
      <li>
        <section onClick={() => setExpanded(prev => !prev)}>
          <p> Departure from {inbound.departureDestination} at {flight.departureAt}</p>
          <p> Arriving in {inbound.arrivalDestination} at {flight.arriveAt} </p>
          <p> Trip duration: {calculateTime(flight.departureAt, flight.arriveAt)} hours</p>
          <p> Price: {flight.prices[0].adult} {flight.prices[0].currency} </p>
        </section>
        {expanded && 
        <section>
            <p>Seats available: {flight.avaliableSeats}</p>
            <p>Price per adult: {flight.prices[0].adult} {flight.prices[0].currency}</p>
            <p>Price per child : {flight.prices[0].child} {flight.prices[0].currency}</p>
            { flight.avaliableSeats < 1 && <Button color="gray" data-disabled> Sold out </Button> }
            { !(flight.avaliableSeats < 1) && flight.avaliableSeats < seats && <Button color="gray" data-disabled> Not enough seats </Button>}
            {!(flight.avaliableSeats < 1) && !(flight.avaliableSeats < seats) && <Button onClick={() => saveSelection()}> Select </Button>}
        </section> }
      </li>

  );
}

export default ResultsCard;
