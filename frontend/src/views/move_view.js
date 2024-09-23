import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormInput from '../components/move_view_components/form_container';
import NavigationBar from '../components/shared/navigation';
import { useFetchData } from '../components/shared/fetch_data';
import TextBox from '../components/shared/text_box';

function MoveView() {
  const { data: devices, loading: devicesLoading, error: devicesError }
  = useFetchData('devices');

  // Value will eventually be imported from the QR Code
  const deviceNumber =  !devicesLoading ?
  Math.floor(Math.random()*devices.length) : 0;;

  return (
      <Box direction="column" justifyContent="space-between">
          <NavigationBar></NavigationBar>
            {devices && !devicesLoading ? (
              <TextBox
                texts={[
                  'Move Device', 
                  devices[deviceNumber].dev_name, 
                  devices[deviceNumber].dev_id
                ]}
              />
            ) : (
              <Typography>Loading devices...</Typography>
            )}
          <FormInput></FormInput>
      </Box>
  );
}

export default MoveView;
