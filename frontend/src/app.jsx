import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import './styles/app.css';
import RegisterView from './views/device_register_view';
import DeviceInfoView from './views/device_info_view';
import EventView from './views/event_view';
import MoveView from './views/move_view';
import AdminView from "./views/admin_view"; // Assuming this will exist soon as well.
import LoginView from "./views/login_view";
import AddView from "./views/add_view";
import Device_manager_view from "./views/device_manager_view";

function App() {
  return (
      <Router basename="/">
        <Routes>
          <Route path="/" element={<RegisterView/>} />
          <Route path="/events" element={<EventView/>} />
          <Route path="/devices/:id" element={<DeviceInfoView/>} />
          <Route path="/devices/:id/move" element={<MoveView />} />
          <Route path="/admin" element={<AdminView/>} />
          <Route path="/login" element={<LoginView/>} />
          <Route path="/add" element={<AddView/>} />
          <Route path="/admin/manager" element={<Device_manager_view/>} />

        </Routes>
      </Router>
  );
}

export default App;