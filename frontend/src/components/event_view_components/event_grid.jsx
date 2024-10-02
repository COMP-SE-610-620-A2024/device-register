import React from 'react';
import GridTable from '../shared/grid_table.jsx';
import Typography from '@mui/material/Typography';
import { useFetchData } from '../shared/fetch_data';

const Event_grid = () => {
  const { data, loading, error } = useFetchData('event_history'); // Changes when API available

  const columnDefs = [
    { field: "event_id", filter: "agNumberColumnFilter", headerName: "DEV",flex: 1 },
    { field: "dev_id", filter: "agTextColumnFilter", headerName: "USER", flex: 1 }, // Replaced with user_name
    { field: "time_start", filter: "agDateColumnFilter", headerName: "Date", flex: 4 },
    { 
      headerName: "Location", 
      field: "loc[0].loc_name", 
      valueGetter: (params) => params.data.loc && params.data.loc.length > 0 ? params.data.loc[0].loc_name : 'N/A', 
      filter: "agTextColumnFilter", 
      flex: 3 
    },
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

export default Event_grid;