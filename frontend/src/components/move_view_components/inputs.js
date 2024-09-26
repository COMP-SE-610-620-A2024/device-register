import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

const Inputs = ({emailError, emailErrorMessage, roomError, roomErrorMessage}) => (
  <div>
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
        <FormLabel htmlFor="room">LOCATION</FormLabel>
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
    </div>
  );

  export default Inputs;
