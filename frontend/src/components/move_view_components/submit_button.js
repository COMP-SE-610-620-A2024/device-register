import React from 'react';
import Button from '@mui/material/Button';

const SubmitButton = () => {

  return (
    <div>
        <Button sx={{mt: 2}}
        type="submit"
        fullWidth
        variant="contained"
      >
        Submit
      </Button>
    </div>
  );
};

export default SubmitButton;