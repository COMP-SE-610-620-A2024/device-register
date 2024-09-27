import TableGrid from '../shared/grid_table.jsx'
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
        width: '100%',
        gap: 2,
    }}>
      {(!eventsLoading) ? (
        <>
          <TextField
          label="Search events"
          variant="outlined"
          value={searchEvents}
          onChange={(e) => setSearchEvents(e.target.value)} 
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
