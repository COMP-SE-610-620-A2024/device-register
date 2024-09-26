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