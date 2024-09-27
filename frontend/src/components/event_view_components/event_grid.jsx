import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TableGrid from '../shared/grid_table.jsx'

const EventGrid = ({ events, eventsLoading}) => {
  const [searchEvents, setSearchEvents] = useState('');

  const columns = [
    { field:'id',headerName:'Id',width:50,headerAlign:'center'},
    { field:'dev_id',headerName:'Device Id',width:50,headerAlign:'center'},
    { field:'t_start',headerName:'Time Start',width:125,headerAlign:'center'},
    { field:'t_end',headerName:'Time End', width: 125, headerAlign: 'center'},
    { field:'loc_name',headerName:'Location',width:125,headerAlign:'center'},
    { field:'opt1',headerName:'Optional1',width:100},
    { field:'opt2',headerName:'Optional2',width:100},
    { field:'opt3',headerName:'Optional3',width:100},
  ];

  const filteredEvents = (!eventsLoading && events)
    ? events.filter((event) =>
        event.event_id.toLowerCase().includes(searchEvents.toLowerCase()) ||
        event.dev_id.toLowerCase().includes(searchEvents.toLowerCase()) ||
        event.loc[0].loc_name.toLowerCase().includes(searchEvents.toLowerCase())
      )
    : [];

  const rows = filteredEvents.map((event) => ({
    id: event.event_id,
    dev_id: event.dev_id,
    t_start: event.time_start,
    t_end: event.time_end,
    loc_name: event.loc[0].loc_name, 
    opt1: event.optional_info?.[0]?.opt1 || 'N/A',
    opt2: event.optional_info?.[0]?.opt2 || 'N/A',
    opt3: event.optional_info?.[0]?.opt3 || 'N/A',
  }));

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: 'clamp(250px, 95vw, 800px)',          
      marginTop: 1,
    }}>
      {(!eventsLoading) ? (
        <>
          <TextField sx={{width: 'clamp(250px, 95vw, 800px)'}}
          label="Search"
          variant="outlined"
          value={searchEvents}
          onChange={(e) => setSearchEvents(e.target.value)} 
          />
          <DataGrid sx={{
            width: 'clamp(250px, 95vw, 800px)',
            height: 'clamp(250px, 95vh, 800px)',
            mt:0.3
            }}
              rows={rows}
              columns={columns}
              autoHeight
              pageSize={5}
              rowsPerPageOptions={[5]}
          />
        </>
      ) : (
        <Typography sx={{
          mt: 7,
          fontSize: 'clamp(1.5rem, 10vw, 2.4rem)'
          }}>
          Loading devices...
        </Typography>
      )}
    </Box>
  );
};

export default EventGrid;
