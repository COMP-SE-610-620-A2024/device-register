import * as React from 'react';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Grid2';
import LinkButton from './link_button';
import { Home, List, Lock} from '@mui/icons-material';

const Navigation_bar = () => (

<Box sx={{
        position: 'absolute', 
        top: 5,
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
            <Grid2 events>
                <LinkButton
                    href="/events"
                    icon={<List/>}
                    iconSx={{ 
                        minWidth: '20px', 
                        minHeight: '20px', 
                        fontSize: 'clamp(24px, 2vw, 32px)' 
                    }}
                />
            </Grid2>
            <Grid2 home>
                <LinkButton
                    href="/home"
                    icon={<Home/>}
                    iconSx={{ 
                        minWidth: '20px', 
                        minHeight: '20px', 
                        fontSize: 'clamp(24px, 2vw, 32px)' 
                    }}
                />
            </Grid2>
            <Grid2 admin>
                <LinkButton
                    href="/admin"
                    icon={<Lock/>}
                    iconSx={{ 
                        minWidth: '20px', 
                        minHeight: '20px', 
                        fontSize: 'clamp(24px, 2vw, 32px)' 
                    }}
                />
            </Grid2>
        </Grid2>
    </Box>
)

export default Navigation_bar;