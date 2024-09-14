
import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import { Home, List, Lock} from '@mui/icons-material';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  padding: 20,
  marginTop: '10vh',
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

function LoginPage(props) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [roomError, setroomError] = React.useState(false);
  const [roomErrorMessage, setroomErrorMessage] = React.useState('');
  const [devices, setDevices] = useState([]);
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

  // Fetch devices
  useEffect(() => {
    fetch('http://localhost:5000/devices')
      .then((response) => response.json())
      .then((data) => setDevices(data))
      .catch((error) => console.error('Error fetching devices:', error));
  }, []);

  // Value will eventually be imported from the QR Code
  const deviceNumber = Math.floor(Math.random()*devices.length);

  return (
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined" sx={{ 
          display: 'flex',
          position: 'relative', 
          alignItems: 'center', 
          height: '100%',
        }}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              borderRadius: '16px',
              overflow: 'hidden',           
              boxShadow: 2,                
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 'auto',
              height:'auto',       
            }}
          >
            <Grid2
              container
              direction="row"          
              justifyContent="center" 
              alignItems="center"    
              spacing={2}   
            >
              <Grid2 item>
                <a
                  className="App-link"
                  href="/device_history"
                  target="_self"
                  rel="noopener noreferrer"
                >
                  <IconButton>
                    <List />
                  </IconButton>
                </a>
              </Grid2>
              <Grid2 item>
                <a
                  className="App-link"
                  href="/home"
                  target="_self"
                  rel="noopener noreferrer"
                >
                  <IconButton>
                    <Home />
                  </IconButton>
                </a>
              </Grid2>
              <Grid2 item>
              <a
                  className="App-link"
                  href="/admin"
                  target="_self"
                  rel="noopener noreferrer"
                >
                  <IconButton>
                  <Lock />
                </IconButton>
                </a>
              </Grid2>
            </Grid2>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            mt: 2, 
            maxWidth: '100%'
            }}>
            {devices.length > 0 ? (
              <>
                <Typography
                  component="h1"
                  variant="h4"
                  sx={{ 
                    fontSize: 'clamp(1.8rem, 10vw, 2rem)', 
                    paddingY: 1,
                    textAlign: 'center',
                  }}
                >
                  Move device
                </Typography>

                <Typography
                  component="h1"
                  variant="h4"
                  sx={{ 
                    fontSize: 'clamp(1rem, 5vw, 1.9rem)', 
                    paddingY: 1,
                    textAlign: 'center',
                    overflow: 'hidden',
                    
                  }}
                >
                  {devices[deviceNumber].dev_name}
                </Typography>

                <Typography
                  component="h1"
                  variant="h4"
                  sx={{ 
                    fontSize: 'clamp(1.6rem, 6vw, 1.8rem)', 
                    paddingY: 1,
                    textAlign: 'center',
                  }}
                >
                  {devices[deviceNumber].dev_id}
                </Typography>
              </>
            ) : (
              <Typography component="h1" variant="h4">
                Loading devices...
              </Typography>
            )}
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">EMAIL</FormLabel>
              <TextField
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
                sx={{ ariaLabel: 'email' }}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormLabel htmlFor="room">LOCATION</FormLabel>
              </Box>
              <TextField
                error={roomError}
                helperText={roomErrorMessage}
                name="room"
                type="room"
                id="room"
                autoComplete="current-room"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={roomError ? 'error' : 'primary'}
                sx={{ ariaLabel: 'room' }}
              />
            </FormControl>    
            <Button
              sx={{mt: 2}}
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Submit
            </Button>
          </Box>
        </Card>
      </SignInContainer>
  );
}

  export default LoginPage;