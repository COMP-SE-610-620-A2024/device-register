import * as React from 'react';
import NavigationBar from '../components/navigation_bar/navigation_bar';
import DeviceHistoryCard from '../components/card/card';
import DeviceHistoryContainer from'../components/page_container/page_container';
import EventsDataGrid from '../components/events_data_grid_searchable/events_data_grid_searchable';
import { useFetchData } from '../services/fetch_data/fetch_data';
import InfoBox from '../components/text_box/text_box';


function DeviceHistoryPage() {
  const { data: events, loading: eventsLoading, error: eventsError } 
    = useFetchData('event_history');

  return (
    <DeviceHistoryContainer direction="column" justifyContent="space-between">
      <DeviceHistoryCard variant="outlined" sx={{ 
        display: 'flex',
        position: 'relative', 
        alignItems: 'center', 
        height: '100%',
      }}>
        <NavigationBar></NavigationBar>
        <InfoBox
                texts={[
                  'Event History'
                ]}
              />
        <EventsDataGrid 
          events={events} 
          eventsLoading={eventsLoading} 
        />
      </DeviceHistoryCard>
    </DeviceHistoryContainer>
  );
}

export default DeviceHistoryPage;
