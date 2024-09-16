import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const DeviceDataGrid = ({ devices, devicesLoading}) => {
  const [searchDevices, setSearchDevices] = useState('');

  const columns = [
    { field: 'id', headerName: 'ID', width: 50, headerAlign: 'center' },
    { field: 'type', headerName: 'Type', width: 50, headerAlign: 'center' },
    { field:'dev_name',headerName:'Device Name',width:125,headerAlign:'center'},
    { field: 'loc', headerName: 'Location',width: 125, headerAlign: 'center' },
    { field: 'opt1', headerName: 'Optional 1', width: 100 },
    { field: 'opt2', headerName: 'Optional 2', width: 100 },
    { field: 'opt3', headerName: 'Optional 3', width: 100 },
  ];

  const filteredDevices = (!devicesLoading && devices)
    ? devices.filter((device) =>
        device.dev_name.toLowerCase().includes(searchDevices.toLowerCase()) ||
        device.dev_type.toLowerCase().includes(searchDevices.toLowerCase()) ||
        device.dev_id.toLowerCase().includes(searchDevices.toLowerCase())
        // Filter by loc.
      )
    : [];

  const rows = filteredDevices.map((device) => ({
    id: device.dev_id,
    type: device.dev_type,
    dev_name: device.dev_name,
    loc: 'WIP', 
    opt1: device.optional_info?.[0]?.opt1 || 'N/A',
    opt2: device.optional_info?.[0]?.opt2 || 'N/A',
    opt3: device.optional_info?.[0]?.opt3 || 'N/A',
  }));

  return (
    <Box sx={{
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
  );
};

export default DeviceDataGrid;
