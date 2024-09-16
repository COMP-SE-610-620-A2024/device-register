import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TopMenu from '../components/top_menu';
import DeviceHistoryCard from '../components/card';
import DeviceHistoryContainer from '../components/page_container';
import { useFetchData } from '../services/fetch_data';
import EventsDataGrid from '../components/events_data_grid_searchable';


function DeviceHistoryPage() {
  const { data: events, loading: eventsLoading, error: eventsError } 
    = useFetchData('http://localhost:5000/event_history');

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
          <Typography sx={{    
              fontSize: 'clamp(1rem, 5vw, 1.9rem)', 
              paddingY: 4,
              textAlign: 'center',
              overflow: 'hidden',
          }}>
            Event History
          </Typography>
        </Box>
        <EventsDataGrid 
          events={events} 
          eventsLoading={eventsLoading} 
        />
      </DeviceHistoryCard>
    </DeviceHistoryContainer>
  );
}

  export default DeviceHistoryPage;