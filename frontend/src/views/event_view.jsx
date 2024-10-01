import NavigationBar from '../components/shared/navigation_bar'
import EventGrid from '../components/event_view_components/event_grid'
import * as React from 'react';
import Box from '@mui/material/Box';
import NavigationBar from '../components/shared/navigation';
import EventGrid from '../components/event_view_components/event_grid';
import TextBox from '../components/shared/text_box';

function EventView() {

  return (
    <Box direction="column" justifyContent="space-between">
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
