
import * as React from 'react';
import Typography from '@mui/material/Typography';
import SignInContainer from '../components/page_container/page_container';
import SignInCard from '../components/card/card';
import NavigationBar from '../components/navigation_bar/navigation_bar';
import FormInput from '../components/form_input/form_input';
import { useFetchData } from '../services/fetch_data/fetch_data';
import InfoBox from '../components/text_box/text_box';

function LoginPage() {
  const { data: devices, loading: devicesLoading, error: devicesError }
  = useFetchData('devices');

  // Value will eventually be imported from the QR Code
  const deviceNumber =  !devicesLoading ?
  Math.floor(Math.random()*devices.length) : 0;;

  return (
      <SignInContainer direction="column" justifyContent="space-between">
        <SignInCard variant="outlined" sx={{ 
          display: 'flex',
          position: 'relative', 
          alignItems: 'center', 
          height: '100%',
        }}>
          <NavigationBar></NavigationBar>
            {devices && !devicesLoading ? (
              <InfoBox
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
        </SignInCard>
      </SignInContainer>
  );
}

export default LoginPage;