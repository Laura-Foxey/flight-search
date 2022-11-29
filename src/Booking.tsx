import React, { useState } from "react";
import './CSS/Booking.css';
import { Input, NativeSelect, Switch, Button, Checkbox} from '@mantine/core';

function Booking() {
  const [passengers, setPassengers] = useState<Array<{ id: number, name: string, email: string, nationality: string, over18: boolean}>>([]);
  const [number, setNumber] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nationality, setNationality] = useState('');
  const [over18, setover18] = useState(false);
  const [checked, setChecked] = useState(false);
  const [error, setError] =useState('');

  console.log(passengers);

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
      if (number === 1 && !over18) {
        setError("Please have the first passanger to be a legal adult.") 
        return; 
      }
      setPassengers((prev) => [...prev, {id: number, name: name, email: email, nationality: nationality, over18: over18}])
      setNumber(prev => prev + 1);
      setName('') 
      setEmail('')
      setNationality('')
      setover18(false);
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
      <p> Add passenger {number} of {}</p>
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
          label="Passenger is over 18 years old"
          checked={over18} onChange={(event) => setover18(event.currentTarget.checked)}
          onLabel="YES" offLabel="NO"
        />

        <Checkbox
          mt="md"
          label="I have read the terms and conditions."
          checked={checked} onChange={(event) => setChecked(event.currentTarget.checked)}
        />

        <Button type="submit"> Add passenger </Button>
      </form>
    </div>
  );
}

export default Booking;
