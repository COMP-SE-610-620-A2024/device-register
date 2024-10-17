import React from 'react';
import Box from '@mui/material/Box';
import { Typography, TextField } from '@mui/material';
import NavigationBar from '../components/shared/navigation_bar';
import Form_container from '../components/shared/form_container';
import Function_button from '../components/shared/function_button';
import { useParams, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import useFetchData from '../components/shared/fetch_data';
import usePostData from '../components/shared/post_data';
const Move_view = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const { data: device, error } = useFetchData('devices/' + id);
  const devName = String(device.dev_name);

  const {
    result: eventResult,
    loading: eventLoading,
    error: eventError,
    postData: postEventData,
  } = usePostData('events');

  const [deviceMoveData, setDeviceMoveData] = useState({
    "dev_id": parseInt(id, 10),
    "move_time": "",
    "loc_name": "",
    "comment": "",
    "user": {
      "user_email": "",
      "user_name": "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('user_')) {
      setDeviceMoveData({
        ...deviceMoveData,
        user: {
          ...deviceMoveData.user,
          [name]: value,
        },
      });
    } else {
      setDeviceMoveData({
        ...deviceMoveData,
        [name]: value,
      });
    }
  };

  const onSubmit = (e) => {
    const MoveData = {
      ...deviceMoveData,
      move_time: new Date().toISOString().slice(0, 19).replace('T', ' '),
    };
    postEventData(MoveData);
  };
  
  useEffect(() => {
    if (eventResult) {
      console.log('Result:', eventResult);  // Print the result to console

      // Check for a successful response and redirect
      if (eventResult.message === "Event created successfully") {
        navigate('/');  // Redirect to the home page or another URL
      }
    }
  }, [eventResult, navigate]);
  


  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%', 
      height: '100%',
      overflow: 'hidden',
      textWrap: 'nowrap',
      gap: 2
  }}>
        <NavigationBar/>
        <Typography sx={{
          fontSize: 'clamp(1.5rem, 5vw, 2.4rem)', 
          textAlign: 'center',
          mt: 8, 
          mb: 3,
        }}>
        Move Device
        </Typography>
        <Typography sx={{
          fontSize: 'clamp(1.5rem, 5vw, 2.4rem)', 
          textAlign: 'center',
          mt: 8, 
          mb: 3,
        }}>
        {error ?  "Device not found!" : devName}
        </Typography>
       <Form_container onSubmit={onSubmit}>

          <TextField
            label="Location"
            name="loc_name"
            value={deviceMoveData.loc_name}
            onChange={handleChange}
          />

          <TextField
            label="Name"
            name="user_name"
            value={deviceMoveData.user.user_name}
            onChange={handleChange}
          />

          <TextField
            label="Email"
            name="user_email"
            value={deviceMoveData.user.user_email}
            onChange={handleChange}
          />

          <TextField
            label="Comment"
            name="comment"
            value={deviceMoveData.comment}
            onChange={handleChange}
          />

          <Function_button text='Move' onClick={onSubmit} ></Function_button>
       </Form_container> 

       
    </Box>
  ); 

  
};

export default Move_view;