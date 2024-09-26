import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';

const Inputs = ({emailError, emailErrorMessage, roomError, roomErrorMessage}) => (
  <Box sx= {{     
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
    }}>
    <FormControl>
      <FormLabel htmlFor="email">EMAIL</FormLabel>
      <TextField sx={{ ariaLabel: 'email', mb:3, width: 'clamp(250px, 75vw, 800px)' }}
        error={emailError}
        helperText={emailErrorMessage}
        id="email"
        type="email"
        name="email"
        autoComplete="email"
        autoFocus
        required
        variant="outlined"
        color={emailError ? 'error' : 'primary'}
      />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="room">LOCATION</FormLabel>
        <TextField sx={{ ariaLabel: 'room', mb:3, width: 'clamp(250px, 75vw, 800px)'}}
          error={roomError}
          helperText={roomErrorMessage}
          name="room"
          type="room"
          id="room"
          required
          variant="outlined"
          color={roomError ? 'error' : 'primary'}
        />
      </FormControl>   
    </Box>
  );

  export default Inputs;