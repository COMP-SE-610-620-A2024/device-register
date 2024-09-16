import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NavigationBar from '../components/top_menu/navigation_bar';
import DeviceHistoryCard from '../components/card/card';
import DeviceHistoryContainer from'../components/page_container/page_container';
import EventsDataGrid from '../components/events_data_grid_searchable/events_data_grid_searchable';
import { useFetchData } from '../services/fetch_data/fetch_data';


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
        <NavigationBar></NavigationBar>
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