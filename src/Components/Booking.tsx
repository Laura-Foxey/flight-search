import React, { useState, useMemo } from "react";
import '../CSS/Booking.css';
import { Input, NativeSelect, Switch, Button, Checkbox} from '@mantine/core';
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function Booking() {
  const [searchParams] = useSearchParams();
  const [passengers, setPassengers] = useState<Array<{ id: number, name: string, email: string, nationality: string, notChild: boolean}>>([]);
  const [number, setNumber] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nationality, setNationality] = useState('');
  const [notChild, setnotChild] = useState(false);
  const [checked, setChecked] = useState(false);
  const [error, setError] =useState('');
  const [trip, setTrip] = useState<any>([]);
  const [showReview, setShowReview] = useState(false);
  const navigate = useNavigate();

  //example : http://localhost:3000/book?flight=5&return=12&adults=1&children=1
  const to = searchParams.get('flight');
  const from = searchParams.get('return');
  const adults = searchParams.get('adults');
  const children = searchParams.get('children');
  let totalPassengers = 0;

  //calculate total passangers
  if(adults && children) {totalPassengers = parseInt(adults) + parseInt(children)}

  //fetch flight data
  useMemo(() => {
    if (to) {
    fetch(`https://localhost:7277/flights/itinerary/${to}`)
    .then(res => res.json())
    .then(data => setTrip((prev: any) => [...prev, {data}]))
    .catch(e => console.log(e))
    }
    if (from !== '0') {
      fetch(`https://localhost:7277/flights/itinerary/${from}`)
      .then(res => res.json())
      .then(data => setTrip((prev: any) => [...prev, {data}]))
      .catch(e => console.log(e))
      }
  }, [to, from])

  //form submit
  const addPassenger = (e: any) => {
    e.preventDefault();
    if (name && email && nationality) {
      if (name.split(" ").length < 2 || name.length < 3) {
        setError("Please include your full name.") 
        return; }
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setError("Please add a valid email.") 
        return; 
      }
      if (number === 1 && !notChild) {
        setError("Please have the first passanger to be a legal adult.") 
        return; 
      }
      setPassengers((prev) => [...prev, {id: number, name: name, email: email, nationality: nationality, notChild: notChild}])
      setNumber(prev => prev + 1);
      setName('') 
      setEmail('')
      setNationality('')
      setnotChild(false);
      setChecked(false);
      setError('')
      return ;
    }
    if (!checked) { 
      setError("Please accept terms and conditions."); 
    }
    setError("Please fill out all values."); 
  }

  //calculate total price of tickets
  const calculateTotal = () => {
    const adultPrice = trip[0].data.itineraries[0].prices[0].adult;
    const childPrice = trip[0].data.itineraries[0].prices[0].child;
    var total = 0;
    if(adults && children)
      {
        total = (adultPrice * parseInt(adults)) + (childPrice * parseInt(children))
      if (from && trip[1]) {
        const adultPrice2 = trip[1].data.itineraries[0].prices[0].adult;
        const childPrice2 = trip[1].data.itineraries[0].prices[0].child;
        total = total + (adultPrice2 * parseInt(adults)) + (childPrice2 * parseInt(children))
      }
    return total;
    }
  }

  //finish booking
  const finish = () => {
    if(to && trip[0]) {
      if(trip[0].data.itineraries[0].avaliableSeats < totalPassengers)
      {navigate("/error")}
      fetch(`https://localhost:7277/flights/${trip[0].data.itineraries[0].itinerary_id}?departure=${trip[0].data.departureDestination}&destination=${trip[0].data.arrivalDestination}&passangers=${totalPassengers}`, {
        method: 'PATCH',
        body: JSON.stringify({
          departure: trip[0].data.departureDestination,
          destination: trip[0].data.arrivalDestination,
          passangers: totalPassengers,
          id: trip[0].data.itineraries[0]
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .catch(e => console.log('What happened??' + e))
      if(from && trip[1]) {
        if(trip[1].data.itineraries[0].avaliableSeats < totalPassengers)
        { navigate("/error") }
        fetch(`https://localhost:7277/flights/${trip[1].data.itineraries[0].itinerary_id}?departure=${trip[1].data.departureDestination}&destination=${trip[1].data.arrivalDestination}&passangers=${totalPassengers}`, {
          method: 'PATCH',
          body: JSON.stringify({
            departure: trip[1].data.departureDestination,
            destination: trip[1].data.arrivalDestination,
            passangers: totalPassengers,
            id: trip[1].data.itineraries[0]
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .catch(e => console.log('What happened??' + e))
        }
        }
    navigate("/");
  }

  if (!to || !from || !adults || !children) {
    navigate("/") }
  
  const Review = () => {
    return (
      <>
      <section>
        <p> Inbound flight: </p>
        <p> Leaving {trip[0].data.departureDestination} at {trip[0].data.itineraries[0].departureAt}</p>
        <p> Arriving {trip[0].data.arrivalDestination} at {trip[0].data.itineraries[0].arriveAt}</p>
        <p> Flight ID: {trip[0].data.flight_id}</p>
      </section>
      {trip.length === 2 && <section>
        <p> Outbound flight: </p>
        <p> Leaving {trip[1].data.departureDestination} at {trip[1].data.itineraries[0].departureAt}</p>
        <p> Arriving {trip[1].data.arrivalDestination} at {trip[1].data.itineraries[0].arriveAt}</p>
        <p> Flight ID: {trip[1].data.flight_id}</p>
      </section>}
      <section>
        <p> Passengers information: </p>
        <ol>
          {passengers.map((passenger) => 
          <li key={passenger.id}>
            <p>{passenger.name}, {passenger.email}, {passenger.nationality}, {passenger.notChild ? "adult" : "minor"}</p>
          </li>)}
        </ol>
      </section>
      <p> Total amount owed: {calculateTotal()}</p>
      <Button onClick={() => finish()}> Finish booking </Button>
      </>
    )
  }

  if(!trip) {
    return (<p> Something went wrong.</p>)}

  return (
    <div className="booking-form">
      {passengers.length < totalPassengers && <div>
        <p> Add passenger {number} of {totalPassengers}</p>
        <p style={{color: 'red'}}>{error}</p>
        <form className="booking-form__form" onSubmit={addPassenger}>
          <Input.Wrapper id="Name" label="Passenger name" required>
            <Input placeholder="Full name" value={name} onChange={(e: any) => setName(e.target.value)}/>
          </Input.Wrapper>

          <Input.Wrapper id="Email" label="Email address" required>
            <Input placeholder="Email" value={email} onChange={(e: any) => setEmail(e.target.value)}/>
          </Input.Wrapper>

          <NativeSelect
            data={['ID', 'Passport', 'National ID', 'Driver License']}
            label="Select what document you will be traveling with"
            description="Make sure the document is not expired else you can be denied boarding"
            value={nationality}
            onChange={(event) => setNationality(event.currentTarget.value)}
            required
          />

          <Switch
            label="Passenger is over 12 years old"
            checked={notChild} onChange={(event) => setnotChild(event.currentTarget.checked)}
            onLabel="YES" offLabel="NO"
          />

          <Checkbox
            mt="md"
            label="I have read the terms and conditions."
            checked={checked} onChange={(event) => setChecked(event.currentTarget.checked)}
          />

          <Button type="submit"> Add passenger </Button>
        </form>
      </div>}
      {passengers.length === totalPassengers && !showReview && <Button onClick={() => setShowReview(true)}> Review booking</Button>}
      {showReview && <Review />}
    </div>
  );
}

export default Booking;
