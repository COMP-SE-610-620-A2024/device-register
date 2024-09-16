import Box from '@mui/material/Box';
import { useFetchData } from '../services/fetch_data';
import UsersDataGrid from '../components/users_data_grid_searchable';

function AdminPage() {
  const { data: users, loading: usersLoading, error: usersError } 
  = useFetchData('http://localhost:5000/users');

  return (
    <div>
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2 
      }}>
        <a
          className="App-link"
          href="/"
          target="_self"
          rel="noopener noreferrer"
        >
          Login
        </a>
        <a
          className="App-link"
          href="/home"
          target="_self"
          rel="noopener noreferrer"
        >
          Home
        </a>
        <a
          className="App-link"
          href="/device_history"
          target="_self"
          rel="noopener noreferrer"
        >
          Device History
        </a>
      </Box>
      <UsersDataGrid 
        users={users} 
        usersLoading={usersLoading} 
      />
    </div>
  )
}
  
export default AdminPage;