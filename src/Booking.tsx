import React, { useState } from "react";
import './App.css';
import { Input, NativeSelect, Switch, Button} from '@mantine/core';


function Booking() {
  const [passengers, setPassengers] = useState<Array<{ id: number, name: string, email: string, nationality: string, noMinor: boolean}>>([]);
  const [number, setNumber] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nationality, setNationality] = useState('');
  const [noMinor, setNoMinor] = useState(false);

  const addPassenger = () => {
      setPassengers((prev) => [...prev, {id: number, name: name, email: email, nationality: nationality, noMinor: noMinor}])
      setNumber(prev => prev + 1);
      setName('') 
      setEmail('')
      setNationality('')
      setNoMinor(false);
  }
  return (
    <>
      <p> Add passenger {number} </p>
      <Input.Wrapper id="Name" label="Passenger name" required>
        <Input placeholder="Full name" />
      </Input.Wrapper>

      <Input.Wrapper id="Email" label="Email address" required>
        <Input placeholder="Email" />
      </Input.Wrapper>

      <NativeSelect
        data={['ID', 'Passport', 'National ID', 'Driver License']}
        label="Select what document you will be traveling with"
        description="Make sure the document is not expired else you can be denied boarding"
        value={nationality}
        onChange={(event) => setNationality(event.currentTarget.value)}
      />

      <Switch
        label="Passenger is over 18 years old"
        checked={noMinor} onChange={(event) => setNoMinor(event.currentTarget.checked)}
        onLabel="YES" offLabel="NO"
      />

      <Button onClick={addPassenger}> Add passenger </Button>
    </>
  );
}

export default Booking;
