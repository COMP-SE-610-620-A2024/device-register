import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const UsersGrid = ({ users, usersLoading}) => {
  const [searchUsers, setSearchUsers] = useState('');

  const columns = [
    { field: 'id', headerName: 'ID', width: 50, headerAlign: 'center' },
    { field: 'name', headerName: 'Name', width: 50, headerAlign: 'center' },
    { field: 'email', headerName: 'Email', width: 125, headerAlign: 'center' },
    { field: 'opt1', headerName: 'Optional 1', width: 100 },
    { field: 'opt2', headerName: 'Optional 2', width: 100 },
    { field: 'opt3', headerName: 'Optional 3', width: 100 },
  ];

  const filteredUsers = (!usersLoading && users)
    ? users.filter((user) =>
        user.user_name.toLowerCase().includes(searchUsers.toLowerCase()) ||
        user.user_id.toLowerCase().includes(searchUsers.toLowerCase())
      )
    : [];

  const rows = filteredUsers.map((user) => ({
    id: user.user_id,
    name: user.user_name,
    email: user.user_email,
    opt1: users.optional_info?.[0]?.opt1 || 'N/A',
    opt2: users.optional_info?.[0]?.opt2 || 'N/A',
    opt3: users.optional_info?.[0]?.opt3 || 'N/A',
  }));

  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 2,
    }}>
      {(!usersLoading) ? (
        <>
          <TextField
          label="Search users"
          variant="outlined"
          value={searchUsers}
          onChange={(e) => setSearchUsers(e.target.value)} 
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

export default UsersGrid;
