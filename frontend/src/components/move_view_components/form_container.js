
import * as React from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Inputs from './inputs';
import SubmitButton from './submit_button';

const FormInput = () => {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [roomError, setRoomError] = React.useState(false);
  const [roomErrorMessage, setRoomErrorMessage] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      room: data.get('room'),
    })
    if (validateInputs()) {
        navigate('/home', { replace: true }); 
    }
  };

  const validateInputs = () => {
    const email = document.getElementById('email');
    const room = document.getElementById('room');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!room.value || room.value.length < 6) {
      setRoomError(true);
      setRoomErrorMessage('Room code must be at least 6 characters long.');
      isValid = false;
    } else {
      setRoomError(false);
      setRoomErrorMessage('');
    }
    return isValid;
  };

  return (
    <Box sx={{
      wrap: "nowrap"
    }}
      component="form"
      onSubmit={handleSubmit}
      noValidate
    >
      <Inputs errors = {[
        emailError, 
        emailErrorMessage, 
        roomError, 
        roomErrorMessage
        ]}
      />
      <SubmitButton></SubmitButton>
    </Box>
  )
};

export default FormInput;
