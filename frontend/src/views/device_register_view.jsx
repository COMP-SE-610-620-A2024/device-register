import DeviceRegisterGrid from '../components/device_register/device_register_grid'
import NavigationBar from '../components/shared/navigation_bar'
import React from 'react';
import Box from '@mui/material/Box';
import DeviceRegisterGrid from '../components/device_register_components/device_register_grid';
import NavigationBar from '../components/shared/navigation';
import { useFetchData } from '../components/shared/fetch_data';
import TextBox from '../components/shared/text_box';

function DeviceRegisterView() {

  return (
    <Box direction="column" justifyContent="space-between">
        <NavigationBar></NavigationBar>
        <TextBox
          texts={[
            'Device Register'
          ]}
        />
        <DeviceGrid/>
    </Box>
  );
}

export default DeviceRegisterView;
