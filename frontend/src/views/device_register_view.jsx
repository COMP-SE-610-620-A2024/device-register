import React from 'react';
import Box from '@mui/material/Box';
import DeviceGrid from '../components/device_register/device_register_grid';
import NavigationBar from '../components/shared/navigation_bar';
import TextBox from '../components/shared/text_box';

function DeviceRegisterView() {

  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', 
        height: '100%',
        overflow: 'hidden',
        textWrap: 'nowrap'
    }}>
        <NavigationBar/>
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
