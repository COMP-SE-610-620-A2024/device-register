import Box from '@mui/material/Box';
import { useFetchData } from '../components/shared/fetch_data';
import UsersGrid from '../components/admin_view_components/users_data_grid';

function AdminView() {
  const { data: users, loading: usersLoading, error: usersError } 
  = useFetchData('users');

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
          href="/events"
          target="_self"
          rel="noopener noreferrer"
        >
          Device History
        </a>
      </Box>
      <UsersGrid 
        users={users} 
        usersLoading={usersLoading} 
      />
    </div>
  )
}
  
export default AdminView;