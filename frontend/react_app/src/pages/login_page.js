
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import SignInContainer from '../components/page_container/page_container';
import SignInCard from '../components/card/card';
import NavigationBar from '../components/top_menu/navigation_bar';
import { useFetchData } from '../services/fetch_data/fetch_data';

function LoginPage() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [roomError, setroomError] = React.useState(false);
  const [roomErrorMessage, setroomErrorMessage] = React.useState('');
  const { data: devices, loading: devicesLoading, error: devicesError }
    = useFetchData('http://localhost:5000/devices');
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
      setroomError(true);
      setroomErrorMessage('Room code must be at least 6 characters long.');
      isValid = false;
    } else {
      setroomError(false);
      setroomErrorMessage('');
    }
    return isValid;
  };

  // Value will eventually be imported from the QR Code
  const deviceNumber = Math.floor(Math.random()*devices.length);

  return (
      <SignInContainer direction="column" justifyContent="space-between">
        <SignInCard variant="outlined" sx={{ 
          display: 'flex',
          position: 'relative', 
          alignItems: 'center', 
          height: '100%',
        }}>
          <NavigationBar></NavigationBar>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            mt: 2, 
            maxWidth: '100%'
          }}>
            {!devicesLoading? (
              <>
                <Typography sx={{ 
                  fontSize: 'clamp(1.8rem, 10vw, 2rem)', 
                  paddingY: 1,
                  textAlign: 'center',
                }}>
                  Move device
                </Typography>
                <Typography sx={{ 
                    fontSize: 'clamp(1rem, 5vw, 1.9rem)', 
                    paddingY: 1,
                    textAlign: 'center',
                    overflow: 'hidden',
                }}>
                  {devices[deviceNumber].dev_name}
                </Typography>
                <Typography sx={{ 
                    fontSize: 'clamp(1.6rem, 6vw, 1.8rem)', 
                    paddingY: 1,
                    textAlign: 'center',
                }}>
                  {devices[deviceNumber].dev_id}
                </Typography>
              </>
            ) : (
              <Typography component="h1" variant="h4">
                Loading devices...
              </Typography>
            )}
          </Box>
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
                autoFocus
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
              onClick={validateInputs}
            >
              Submit
            </Button>
          </Box>
        </SignInCard>
      </SignInContainer>
  );
}

export default LoginPage;