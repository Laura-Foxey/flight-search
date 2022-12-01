import React, { useState, useEffect } from "react";
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
  const navigate = useNavigate();

  //book?to=id&from=id&adults=1&children=1
  const to = searchParams.get('flight');
  const from = searchParams.get('return');
  const adults = searchParams.get('adults');
  const children = searchParams.get('children');
  let totalPassengers = 0;

  if(adults && children) {totalPassengers = parseInt(adults) + parseInt(children)}

  useEffect(() => {
    
  }, [])

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

  return (
    <div className="booking-form">
      <section>
        <ul>
          {passengers.map((passenger) => 
          <li key={passenger.id}>
            <p>{passenger.name}</p>
            <p>{passenger.email}</p>
            <p>{passenger.nationality}</p>
          </li>)}
        </ul>
      </section>

      <div>
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
        {passengers.length === 5 && <Button> Review booking</Button>}
        </div>
    </div>
  );
}

export default Booking;
