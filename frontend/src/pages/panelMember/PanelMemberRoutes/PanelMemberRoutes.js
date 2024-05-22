import { Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import ChangePassword from '../ChangePassword/ChangePassword';
import ResetPassword from '../ResetPassword/ResetPassword';
import CreateProfile from '../PanelMemberProfile/CreateProfile';
import ViewProfile from '../PanelMemberProfile/ViewProfile';
import EditProfile from '../PanelMemberProfile/EditProfile';
import PanelMemberSidebar from '../../../components/Sidebar/PanelMemberSidebar';

export default function PanelMemberRoutes() {

  const location = useLocation();
  const excludeSidebarRoutes = [
    '/panelMember/Login',
    '/panelMember/ResetPassword'
  ];

  const showSidebar = !excludeSidebarRoutes.some(route => location.pathname.includes(route));


  return (
    <div className="row">
      {showSidebar && (
        <div className="col-md-3">
          <PanelMemberSidebar />
        </div>
      )}
      <div className={showSidebar ? 'col-md-9' : 'col-md-12'}>
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/ResetPassword' element={<ResetPassword />} />
          <Route path="/Dashboard/:userid" element={<Dashboard />} />
          <Route path='/ChangePassword/:userid' element={<ChangePassword/>} />
          <Route path="/CreateProfile" element={<CreateProfile />} />
          <Route path="/ViewProfile/:userid" element={<ViewProfile />} />
          <Route path="/EditProfile/:userid" element={<EditProfile />} />
        </Routes>
      </div>
    </div>
  );
}