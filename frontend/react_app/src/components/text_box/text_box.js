import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const InfoBox = ({texts}) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      mt: 2, 
      maxWidth: '100%'
    }}>
      {texts.map((text, index) => (
        <Typography
          key={index}
          sx={{ 
            fontSize: 'clamp(1rem, 5vw, 1.9rem)', 
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

export default InfoBox;