import * as React from 'react';
import Box from '@mui/material/Box';
import NavigationBar from '../components/shared/navigation';
import EventGrid from '../components/event_view_components/event_grid';
import { useFetchData } from '../components/shared/fetch_data';
import TextBox from '../components/shared/text_box';


function EventView() {
  const { data: events, loading: eventsLoading, error: eventsError } 
    = useFetchData('event_history');

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 'auto',
    }}>
        <NavigationBar></NavigationBar>
        <TextBox
          texts={[
            'Event History'
          ]}
        />
        <EventGrid 
          events={events} 
          eventsLoading={eventsLoading} 
        />
    </Box>
  );
}

export default EventView;
