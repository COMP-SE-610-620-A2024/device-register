import * as React from 'react';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import { Home, List, Lock} from '@mui/icons-material';

const NavigationBar = () => (
    <Box sx={{
        position: 'absolute', 
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)', 
        borderRadius: '16px',
        boxShadow: 2,
        minWidth: '15%', 
    }}>
        <Grid2
            container
            direction="row"          
            justifyContent="center" 
            alignItems="center"    
            spacing={5}
            wrap="nowrap"
            maxHeight={30}
            minWidth={225}
        >
            <Grid2 item>
                <a
                    className="App-link"
                    href="/events"
                    target="_self"
                    rel="noopener noreferrer"
                >
                    <IconButton sx={{
                        minWidth: '20px', 
                        minHeight: '20px'
                    }}>
                        <List sx={{ fontSize: 'clamp(24px, 2vw, 32px)' }}/>
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
                    <IconButton sx={{
                        minWidth: '20px', 
                        minHeight: '20px'
                    }}>
                        <Home sx={{ fontSize: 'clamp(24px, 2vw, 32px)' }}/>
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
                    <IconButton sx={{
                        minWidth: '20px', 
                        minHeight: '20px'
                    }}>
                        <Lock sx={{ fontSize: 'clamp(24px, 2vw, 32px)' }}/>
                    </IconButton>
                </a>
            </Grid2>
        </Grid2>
    </Box>
)
export default NavigationBar;
