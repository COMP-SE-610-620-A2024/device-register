import Box from '@mui/material/Box';

function Admin_view() {
  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2 
    }}>
      <LinkButton href="/" text="Login" />
      <LinkButton href="/home" text="Home" />
      <LinkButton href="/events" text="Device History" />
    </Box>
  )
}
  
export default Admin_view;
