import * as React from 'react';
import useState from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'
import { DataGrid} from '@mui/x-data-grid';
import TopMenu from '../components/top_menu'
import DeviceHistoryCard from '../components/card'
import DeviceHistoryContainer from '../components/page_container'
import { useFetchData } from '../services/fetch_data';

function DeviceHistoryPage() {
  const [searchDevices, setSearchDevices] = useState('');
  const { data: devices, loading: devicesLoading, error: devicesError }
    = useFetchData('http://localhost:5000/devices');
  const { data: events, loading: eventsLoading, error: eventsError } 
    = useFetchData('http://localhost:5000/event_history');
  const { data: users, loading: usersLoading, error: usersError } 
    = useFetchData('http://localhost:5000/users');

  const columns = [
    { field: 'id', headerName: 'id', width: 50, headerAlign: 'center' },
    { field: 'type', headerName: 'type', width: 50, headerAlign: 'center' },
    { field: 'deviceName', headerName: 'Device name'
                                          , width: 125, headerAlign: 'center' },
    { field: 'location', headerName: 'LOC', width: 125, headerAlign: 'center' },
    { field: 'opt1', headerName: 'Optional 1', width: 100 },
    { field: 'opt2', headerName: 'Optional 2', width: 100 },
    { field: 'opt3', headerName: 'Optional 3', width: 100 },
  ];


  const filterDevices = (!devicesLoading && devices) ?
   devices.filter((device) =>
    device.dev_name.toLowerCase().includes(searchDevices.toLowerCase()) ||
    device.dev_type.toLowerCase().includes(searchDevices.toLowerCase()) ||
    device.dev_id.toLowerCase().includes(searchDevices.toLowerCase())
    // Filter by location
  ) : [];
  
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
  const deviceNumber = (devices && devices.length > 0) ?
    Math.floor(Math.random() * devices.length) : 0;


  return (
    <DeviceHistoryContainer direction="column" justifyContent="space-between">
      <DeviceHistoryCard variant="outlined" sx={{ 
        display: 'flex',
        position: 'relative', 
        alignItems: 'center', 
        height: '100%',
      }}>
        <TopMenu></TopMenu>
        <Box sx={{ 
          display: 'flex',             
          flexDirection: 'column',     
          justifyContent: 'center',    
          alignItems: 'center',
          mt: 2
          }}>
          {(!devicesLoading && !usersLoading && !eventsLoading
            && devices && users && events) ? (
            <>
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontSize: 'clamp(1.8rem, 10vw, 2rem)', paddingY: 1}}
          >
            {users[0]?.user_name || 'Unknown User'}
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
            {devices[deviceNumber]?.dev_name || 'Unknown Device'}
          </Typography>
          <Typography
            component="h1"
            variant="h4"
            sx={{  fontSize: 'clamp(1.6rem, 6vw, 1.8rem)', paddingY: 1 }}
          >
            {events[deviceNumber]?.loc?.[0]?.loc_name || 'Unknown Location'}
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
          }}>
          {(!devicesLoading) ? (
            <>
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
          </>
          ) : (
            <Typography component="h1" variant="h4">
              Loading data...
            </Typography>
          )}
        </Box>
      </DeviceHistoryCard>
    </DeviceHistoryContainer>
  );
}

  export default DeviceHistoryPage;