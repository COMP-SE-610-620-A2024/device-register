import React from 'react';
import Box from '@mui/material/Box';
import DeviceRegisterGrid from '../components/device_register_components/device_register_grid';
import NavigationBar from '../components/shared/navigation';
import { useFetchData } from '../components/shared/fetch_data';
import TextBox from '../components/shared/text_box';

function DeviceRegisterView() {
  const { data: devices, loading: devicesLoading, error: devicesError }
    = useFetchData('devices');

  return (
    <Box direction="column" justifyContent="space-between">
        <NavigationBar></NavigationBar>
        <TextBox
          texts={[
            'Device Register'
          ]}
        />
        <DeviceRegisterGrid 
          devices={devices} 
          devicesLoading={devicesLoading} 
       />
    </Box>
  );
}

export default DeviceRegisterView;
