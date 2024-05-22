import { Routes, Route, useLocation } from 'react-router-dom';
import SupervisorSidebar from '../../../components/Sidebar/SupervisorSidebar';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import ChangePassword from '../ChangePassword/ChangePassword';
import ResetPassword from '../ResetPassword/ResetPassword';
import ViewProfile from '../SupervisorProfile/ViewProfile';
import EditProfile from '../SupervisorProfile/EditProfile';

export default function SupervisorRoutes() {

  const location = useLocation();
  const excludeSidebarRoutes = [
    '/supervisor/Login',
    '/supervisor/ResetPassword'
  ];

  const showSidebar = !excludeSidebarRoutes.some(route => location.pathname.includes(route));

  return (
    <div className="row">
      {showSidebar && (
        <div className="col-md-3">
          <SupervisorSidebar />
        </div>
      )}
      <div className={showSidebar ? 'col-md-9' : 'col-md-12'}>
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/ResetPassword' element={<ResetPassword />} />
          <Route path="/Dashboard/:userid" element={<Dashboard />} />
          <Route path='/ChangePassword/:userid' element={<ChangePassword />} />
          <Route path="/ViewProfile/:userid" element={<ViewProfile />} />
          <Route path="/EditProfile/:userid" element={<EditProfile />} />
        </Routes>
      </div>
    </div>
  );
}