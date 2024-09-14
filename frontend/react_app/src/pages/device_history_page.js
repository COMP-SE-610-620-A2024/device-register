import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { Home, List, Lock} from '@mui/icons-material';
import { DataGrid} from '@mui/x-data-grid';


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const DeviceHistoryContainer = styled(Stack)(({ theme }) => ({
  padding: 20,
  marginTop: '10vh',
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

function DeviceHistoryPage(props) {
  const [devices, setDevices] = useState([]);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchDevices, setSearchDevices] = useState(''); // State for search input

  // Fetch devices
  useEffect(() => {
    fetch('http://localhost:5000/devices')
      .then((response) => response.json())
      .then((data) => setDevices(data))
      .catch((error) => console.error('Error fetching devices:', error));
  }, []);

  // Fetch events
  useEffect(() => {
    fetch('http://localhost:5000/event_history')
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  // Fetch users
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);
  
  const columns = [
    { field: 'id', headerName: 'id', width: 50, headerAlign: 'center' },
    { field: 'type', headerName: 'type', width: 50, headerAlign: 'center' },
    { field: 'deviceName', headerName: 'Device name', width: 125, headerAlign: 'center' },
    { field: 'location', headerName: 'LOC', width: 125, headerAlign: 'center' },
    { field: 'opt1', headerName: 'Optional 1', width: 100 },
    { field: 'opt2', headerName: 'Optional 2', width: 100 },
    { field: 'opt3', headerName: 'Optional 3', width: 100 },
  ];

  const filterDevices = devices.filter((device) =>
    device.dev_name.toLowerCase().includes(searchDevices.toLowerCase()) ||
    device.dev_type.toLowerCase().includes(searchDevices.toLowerCase()) ||
    device.dev_id.toLowerCase().includes(searchDevices.toLowerCase())
    // Filter by location
  );
  const rows = filterDevices.map((device) => ({
    id: device.dev_id,
    type: device.dev_type,
    deviceName: device.dev_name,
    location: 'WIP',
    opt1: device.optional_info[0]?.opt1 || 'N/A',
    opt2: device.optional_info[0]?.opt2 || 'N/A',
    opt3: device.optional_info[0]?.opt3 || 'N/A',
  }));


  // Value will eventually be imported from the QR Code
  const deviceNumber = Math.floor(Math.random()*devices.length);

  return (
    <DeviceHistoryContainer direction="column" justifyContent="space-between">
      <Card variant="outlined" sx={{ 
        display: 'flex',
        position: 'relative', 
        alignItems: 'center', 
        height: '100%',
      }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            borderRadius: '16px',
            overflow: 'hidden',           
            boxShadow: 2,                
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 'auto',
            height:'auto',       
          }}
        >
          <Grid2
            container
            direction="row"          
            justifyContent="center" 
            alignItems="center"    
            spacing={2}   
          >
            <Grid2 item>
              <a
                className="App-link"
                href="/device_history"
                target="_self"
                rel="noopener noreferrer"
              >
                <IconButton>
                  <List />
                </IconButton>
              </a>
            </Grid2>
            <Grid2 item>
              <a
                className="App-link"
                href="/home"
                target="_self"
                rel="noopener noreferrer"
              >
                <IconButton>
                  <Home />
                </IconButton>
              </a>
            </Grid2>
            <Grid2 item>
            <a
                className="App-link"
                href="/admin"
                target="_self"
                rel="noopener noreferrer"
              >
                <IconButton>
                <Lock />
              </IconButton>
              </a>
            </Grid2>
          </Grid2>
        </Box>
        <Box sx={{ display: 'flex',             
          flexDirection: 'column',     
          justifyContent: 'center',    
          alignItems: 'center',
          mt: 2
          }}>
          {(devices.length > 0 || events.length > 0 || users.length > 0) ? (
            <>
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontSize: 'clamp(1.8rem, 10vw, 2rem)', paddingY: 1}}
          >
            {users[deviceNumber].user_name}
          </Typography>
          <Typography
            component="h1"
            variant="h4"
            sx={{    
              fontSize: 'clamp(1rem, 5vw, 1.9rem)', 
              paddingY: 1,
              textAlign: 'center',
              overflow: 'hidden',
              }}
          >
            {devices[deviceNumber].dev_name}
          </Typography>
          <Typography
            component="h1"
            variant="h4"
            sx={{  fontSize: 'clamp(1.6rem, 6vw, 1.8rem)', paddingY: 1 }}
          >
            {events[deviceNumber].loc[0].loc_name}
          </Typography>
          </>
          ) : (
            <Typography component="h1" variant="h4">
              Loading data...
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
          }}
        >
          <TextField
            label="Search Devices"
            variant="outlined"
            value={searchDevices}
            onChange={(e) => setSearchDevices(e.target.value)} 
            sx={{ marginBottom: 2 }}
          />
            <DataGrid
              rows={rows}
              columns={columns}
              autoHeight
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
        </Box>
      </Card>
    </DeviceHistoryContainer>
  );
}

  export default DeviceHistoryPage;