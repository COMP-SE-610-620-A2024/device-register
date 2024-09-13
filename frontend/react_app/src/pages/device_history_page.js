import Box from '@mui/material/Box';

import Input from '@mui/material/Input';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';


const rows: GridRowsProp = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' },
];

const columns: GridColDef[] = [
  { field: 'col1', headerName: 'Column 1', width: 150 },
  { field: 'col2', headerName: 'Column 2', width: 150 },
];

  
function DeviceHistoryPage() {
    return (
      <div>
           <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <a
            className="App-link"
            href="/"
            target="_self"
            rel="noopener noreferrer"
          >
            Back to login
          </a>
          <a
            className="App-link"
            href="/home"
            target="_self"
            rel="noopener noreferrer"
          >
            Back to home
          </a>
          </Box>
        <div style={{ height: 300, width: '100%' }}>
          <Input placeholder="Placeholder"/>
          <DataGrid rows={rows} columns={columns} />
        </div>
      </div>
    )
  }
  export default DeviceHistoryPage;