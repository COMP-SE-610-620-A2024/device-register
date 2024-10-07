import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const TextBox = ({texts}) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      mt: 7, 
      mb: 2,
      maxWidth: '100%'
    }}>
      {texts.map((text, index) => (
        <Typography
          key={index}
          sx={{ 
            fontSize: 'clamp(1.5rem, 5vw, 2.4rem)', 
            paddingY: 1,
            textAlign: 'center',
            overflow: 'hidden',
          }}
        >
          {text}
        </Typography>
      ))}
    </Box>
  )
};

export default TextBox;