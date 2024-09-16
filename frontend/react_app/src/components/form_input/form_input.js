
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

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
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      gap: 2,
    }}
      component="form"
      onSubmit={handleSubmit}
      noValidate
    >
      <FormControl>
        <FormLabel htmlFor="email">EMAIL</FormLabel>
        <TextField sx={{ ariaLabel: 'email' }}
          error={emailError}
          helperText={emailErrorMessage}
          id="email"
          type="email"
          name="email"
          autoComplete="email"
          autoFocus
          required
          fullWidth
          variant="outlined"
          color={emailError ? 'error' : 'primary'}
        />
      </FormControl>
      <FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <FormLabel htmlFor="room">LOCATION</FormLabel>
        </Box>
        <TextField sx={{ ariaLabel: 'room' }}
          error={roomError}
          helperText={roomErrorMessage}
          name="room"
          type="room"
          id="room"
          required
          fullWidth
          variant="outlined"
          color={roomError ? 'error' : 'primary'}
        />
      </FormControl>    
      <Button sx={{mt: 2}}
        type="submit"
        fullWidth
        variant="contained"
      >
        Submit
      </Button>
    </Box>
  )
};

export default FormInput;
