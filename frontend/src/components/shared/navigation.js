import * as React from 'react';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import { Home, List, Lock} from '@mui/icons-material';

const NavigationBar = () => (
    <Box sx={{
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
    }}>
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
                    href="/events"
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
)
export default NavigationBar;
