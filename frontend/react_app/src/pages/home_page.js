import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TopMenu from '../components/top_menu';
import HomeCard from '../components/card';
import HomeContainer from '../components/page_container';
import { useFetchData } from '../services/fetch_data';
import DevicesDataGrid from '../components/device_data_grid_searchable';


function HomePage() {
  const { data: devices, loading: devicesLoading, error: devicesError }
    = useFetchData('http://localhost:5000/devices');

  return (
    <HomeContainer direction="column" justifyContent="space-between">
      <HomeCard variant="outlined" sx={{ 
        display: 'flex',
        position: 'relative', 
        alignItems: 'center', 
        height: '100%',
      }}>
        <TopMenu></TopMenu>
        <Box sx={{ 
          display: 'flex',             
          flexDirection: 'column',     
          justifyContent: 'center',    
          alignItems: 'center',
          mt: 2
        }}>
          <Typography sx={{    
              fontSize: 'clamp(1rem, 5vw, 1.9rem)', 
              paddingY: 4,
              textAlign: 'center',
              overflow: 'hidden',
          }}>
            Device Register
          </Typography>
        </Box>
        <DevicesDataGrid 
          devices={devices} 
          devicesLoading={devicesLoading} 
       />
      </HomeCard>
    </HomeContainer>
  );
}

  export default HomePage;