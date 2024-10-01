import React, { useEffect, useState } from "react";
import NavigationBar from '../components/shared/navigation_bar'
import Form_container from '../components/shared/form_container'
import Function_button from '../components/shared/function_button'
import Text_field from '../components/shared/text_field'

function MoveView() {
  const { data: devices, loading: devicesLoading, error: devicesError }
  = useFetchData('devices');

  // Value will eventually be imported from the QR Code
  const deviceNumber =  !devicesLoading ?
  Math.floor(Math.random()*devices.length) : 0;;

  return (
      <Box sx={{
        display: 'flex',           
        flexDirection: 'column',   
        justifyContent: 'center',  
        alignItems: 'center',  
      }}>
          <NavigationBar/>
            {devices && !devicesLoading ? (
              <TextBox
                texts={[
                  'Move Device', 
                  devices[deviceNumber].dev_name, 
                  devices[deviceNumber].dev_id
                ]}
              />
            ) : (
              <Typography sx={{
                mt: 7,
                fontSize: 'clamp(1.5rem, 10vw, 2.4rem)'
                }}>
                Loading devices...
              </Typography>
            )}
          <FormContainer></FormContainer>
      </Box>
  );
}

export default MoveView;
