import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AppTheme from './styles/AppTheme';
import LoginPage from './pages/login_page'
import HomePage from './pages/home_page'
import DeviceHistoryPage from './pages/device_history_page'
import AdminPage from './pages/admin_panel'

function App() {
  return (
    <ThemeProvider theme={AppTheme}>
      <CssBaseline enableColorScheme />
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/device_history" element={<DeviceHistoryPage/>} />
        <Route path="/admin" element={<AdminPage/>} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
