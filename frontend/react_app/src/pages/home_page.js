import * as React from 'react';
import NavigationBar from '../components/navigation_bar/navigation_bar';
import HomeCard from '../components/card/card';
import HomeContainer from '../components/page_container/page_container';
import { useFetchData } from '../services/fetch_data/fetch_data';
import DevicesDataGrid from '../components/device_data_grid_searchable/device_data_grid_searchable';
import InfoBox from '../components/text_box/text_box';

function HomePage() {
  const { data: devices, loading: devicesLoading, error: devicesError }
    = useFetchData('devices');

  return (
    <HomeContainer direction="column" justifyContent="space-between">
      <HomeCard variant="outlined" sx={{ 
        display: 'flex',
        position: 'relative', 
        alignItems: 'center', 
        height: '100%',
      }}>
        <NavigationBar></NavigationBar>
        <InfoBox
                texts={[
                  'Device Register'
                ]}
              />
        <DevicesDataGrid 
          devices={devices} 
          devicesLoading={devicesLoading} 
       />
      </HomeCard>
    </HomeContainer>
  );
}

export default HomePage;
