import { createTheme } from '@mui/material/styles';

const AppTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1c86e9', // Light blue
    },
    secondary: {
      main: '#f48fb1', // Pinkish
    },
  },
});

export default AppTheme;