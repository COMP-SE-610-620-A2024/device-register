import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TopMenu from '../components/top_menu';
import DeviceHistoryCard from '../components/card';
import DeviceHistoryContainer from '../components/page_container';
import { useFetchData } from '../services/fetch_data';
import SearchableDataGrid from '../components/searchable_data_grid';

function DeviceHistoryPage() {
  const { data: devices, loading: devicesLoading, error: devicesError }
    = useFetchData('http://localhost:5000/devices');
  const { data: events, loading: eventsLoading, error: eventsError } 
    = useFetchData('http://localhost:5000/event_history');
  const { data: users, loading: usersLoading, error: usersError } 
    = useFetchData('http://localhost:5000/users');

  // Value will eventually be imported from the QR Code
  const deviceNumber = (devices && devices.length > 0) ?
    Math.floor(Math.random() * devices.length) : 0;

  return (
    <DeviceHistoryContainer direction="column" justifyContent="space-between">
      <DeviceHistoryCard variant="outlined" sx={{ 
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
          {(!devicesLoading && !usersLoading && !eventsLoading
            && devices && users && events) ? (
            <>
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontSize: 'clamp(1.8rem, 10vw, 2rem)', paddingY: 1}}
          >
            {users[0]?.user_name || 'Unknown User'}
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
            {devices[deviceNumber]?.dev_name || 'Unknown Device'}
          </Typography>
          <Typography
            component="h1"
            variant="h4"
            sx={{  fontSize: 'clamp(1.6rem, 6vw, 1.8rem)', paddingY: 1 }}
          >
            {events[deviceNumber]?.loc?.[0]?.loc_name || 'Unknown Location'}
          </Typography>
          </>
          ) : (
            <Typography component="h1" variant="h4">
              Loading data...
            </Typography>
          )}
        </Box>
        <SearchableDataGrid 
        devices={devices} 
        devicesLoading={devicesLoading} 
        devicesError={devicesError} 
      />
      </DeviceHistoryCard>
    </DeviceHistoryContainer>
  );
}

  export default DeviceHistoryPage;