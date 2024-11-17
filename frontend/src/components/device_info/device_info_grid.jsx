import React, {useRef} from 'react';
import GridTable from '../shared/grid_table.jsx';
import Typography from '@mui/material/Typography';
import useFetchData from '../shared/fetch_data';
import PropTypes from 'prop-types'
import Function_button from '../shared/function_button.jsx';

const Device_info_grid = ({ id }) => {
  const { data: events, loading, error } = useFetchData('devices/' + id + '/events');

  const formattedEvents = Array.isArray(events)
  ? events.map(event => ({
      ...event,
      // Format move_time to DD/MM/YYYY HH:MM:SS, parse forces javascript to treat time as UTC format
      move_time: new Date(Date.parse(event.move_time + 'Z')).toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      // `move_time_iso` in ISO format for easier sorting/filtering
      move_time_iso: new Date(Date.parse(event.move_time + 'Z')).toISOString(),
    }))
  : [];

  // Tells AG-Grid how to filter EU-formatted datetimes by date
  var filterParams = {
    comparator: (filterLocalDateAtMidnight, cellValue) => {
        const cellDate = new Date(cellValue);
        if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
          return 0;
        }
        return cellDate < filterLocalDateAtMidnight ? -1 : 1;
      },
      minValidYear: 2024,
      
  };

  const columnDefs = [
      { field: "move_time_iso", filter: "agDateColumnFilter", headerName: "Date/Time", flex: 2.0, minWidth: 160,
        filterParams:filterParams, suppressHeaderFilterButton: false, sort: 'desc'// Enough for showing datetime
        , valueFormatter: (params) => params.data.move_time, // Display the formatted date
        valueGetter: (params) => params.data.move_time
      },
      { field: "loc_name", filter: "agTextColumnFilter", headerName: "Location", flex: 2.2, minWidth: 170, autoHeight: true,
          cellStyle: { whiteSpace: 'normal', wordWrap: 'break-word',  lineHeight: 1.2,  paddingTop: '13px', } // text wrapping
        },
      { field: "user_name", filter: "agTextColumnFilter", headerName: "User name", flex: 2, minWidth: 150, autoHeight: true,
          cellStyle: { whiteSpace: 'normal', wordWrap: 'break-word', lineHeight: 1.2,  paddingTop: '13px' } // text wrapping  
        },
      { field: "comment", filter: "agTextColumnFilter", headerName: "Comment", flex: 2, minWidth: 200, autoHeight: true,
        cellStyle: { whiteSpace: 'normal', wordWrap: 'break-word', lineHeight: 1.2,  paddingTop: '13px' } // text wrapping  
        },
  ];

  //export csv functionality
  const gridRef = useRef();

    const exportClick = () => {
        if (gridRef.current) {
  
          gridRef.current.exportCsv();
        } else {
          console.error('Grid reference is not available');
        }
      };

  if (loading) {
      return (
          <Typography sx={{ mt: 7, fontSize: 'clamp(1.5rem, 10vw, 2.4rem)' }}>
              Loading events...
          </Typography>
      );
  }

  if (error) {
      return (
          <Typography sx={{ mt: 7, fontSize: 'clamp(1.5rem, 9vw, 2.4rem)', color: 'red' }}>
              Failed to load events.<br />
              Please try again later.<br />
          </Typography>
      );
  }


  return (
    <div>
      <Function_button size='small' onClick={exportClick} text='Export CSV'/>
      <GridTable 
          rowData={formattedEvents.length > 0 ? formattedEvents : []} 
          columnDefs={columnDefs}
          ref={gridRef}
      />
    </div>
  );
};

Device_info_grid.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  };

export default Device_info_grid;