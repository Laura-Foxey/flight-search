import React from 'react';

interface Props {
  inbound: {
    flight_id: string,
    departureDestination: string,
    arrivalDestination: string,
    itineraries: {
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

function Results({inbound, outbound}: Props) {

  const calculateTime = (dt1: Date, dt2: Date) => {
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
  }

  console.log(inbound)

  if (!inbound) { return <p> Your dream destination awaits... </p>}
  return (
      <>
        
      </>
  );
}

export default Results;
