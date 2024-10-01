import TableGrid from '../shared/grid_table.jsx'
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const DeviceGrid = () => {
  const { data, loading, error } = useFetchData('event_history'); // Changes when API available

  const columnDefs = [
    { field: "event_id", filter: "agNumberColumnFilter", headerName: "#",flex: 1 },
    { field: "dev_id", filter: "agTextColumnFilter", headerName: "USER (WIP)", flex: 1 }, // Replaced with user_name
    { field: "time_start", filter: "agDateColumnFilter", headerName: "Date", flex: 4 },
    { 
      headerName: "Location", 
      field: "loc[0].loc_name", 
      valueGetter: (params) => params.data.loc && params.data.loc.length > 0 ? params.data.loc[0].loc_name : 'N/A', 
      filter: "agTextColumnFilter", 
      flex: 3 
    }, // Doesn't work
  ];

  if (loading) {
    return (
      <Typography
        sx={{
          mt: 7,
          fontSize: 'clamp(1.5rem, 10vw, 2.4rem)',
        }}
      >
        Loading devices...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography
      sx={{
        mt: 7,
        fontSize: 'clamp(1.5rem, 9vw, 2.4rem)',
        color: 'red',
        textWrap: true
      }}
    >
        Failed to load devices.<br />
        Please try again later.<br />
    </Typography>
    );
  }

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

export default DeviceGrid;
