import React from 'react';
import GridTable from '../shared/grid_table.jsx';
import Typography from '@mui/material/Typography';
import { useFetchData } from '../shared/fetch_data';

const Device_grid = () => {
  const { data, loading, error } = useFetchData('devices'); // Fetch the devices data

  const columnDefs = [
    { field: "dev_id", filter: "agNumberColumnFilter", headerName: "ID", flex: 1 },
    { field: "dev_type", filter: "agTextColumnFilter", headerName: "Type", flex: 1 },
    { field: "dev_name", filter: "agTextColumnFilter", headerName: "Device Name", flex: 3 },
    { field: "loc_name", filter: "agTextColumnFilter", headerName: "LOC", flex: 3 }, 
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
    <GridTable 
      rowData={data && data.length ? data : []} 
      columnDefs={columnDefs}
    />
  );
};

export default Device_grid;
