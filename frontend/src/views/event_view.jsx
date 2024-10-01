import * as React from 'react';
import Box from '@mui/material/Box';
import NavigationBar from '../components/shared/navigation_bar'
import EventGrid from '../components/event_view_components/event_grid';
import TextBox from '../components/shared/text_box';

function EventView() {

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    }}>
        <NavigationBar/>
        <TextBox
          texts={[
            'Event History'
          ]}
        />
        <EventGrid />
    </Box>
  );
}

export default EventView;
