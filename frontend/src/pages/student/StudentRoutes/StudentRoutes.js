import { Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import ChangePassword from '../ChangePassword/ChangePassword';
import ResetPassword from '../ResetPassword/ResetPassword';
import ViewProfile from '../StudentProfile/ViewProfile';
import EditProfile from '../StudentProfile/EditProfile';
import StudentSidebar from '../../../components/Sidebar/StudentSidebar';
import GroupFormation from '../GroupFormation/GroupFormation';
import CreateGroup from '../GroupFormation/CreateGroup/CreateGroup';
import ViewGroupByLeader from '../GroupFormation/CreateGroup/ViewGroupByLeader' ;
import PracAPI from '../AP/PracAPI';
import SearchStudentByLeader from '../GroupFormation/SearchStudent/SearchStudentByLeader';
import ViewRequestsByStudent from '../GroupFormation/Requests/ViewRequestsByStudent';
import ViewPendingRequestByLeader from '../GroupFormation/Requests/ViewPendingRequestByLeader';
import EditGroupByLeader from '../GroupFormation/CreateGroup/EditGroupByLeader';
import ViewStudentProfileByLeader from '../GroupFormation/SearchStudent/ViewStudentProfileByLeader';
import ViewGroupByStudent from '../GroupFormation/Requests/ViewGroupByStudent';



export default function StudentRoutes() {

  const location = useLocation();
  const excludeSidebarRoutes = [
    '/student/Login',
    '/student/ResetPassword'
  ];

  const showSidebar = !excludeSidebarRoutes.some(route => location.pathname.includes(route));


  return (
    <div className='row'>
      {showSidebar && (
        <div className='col-md-3'>
          <StudentSidebar />
        </div>
      )}
      <div className={showSidebar ? 'col-md-9' : 'col-md-12'}>
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/ResetPassword' element={<ResetPassword />} />
          <Route path='/Dashboard/:userid' element={<Dashboard />} />
          <Route path='/ChangePassword/:userid' element={<ChangePassword />} />
          <Route path='/ViewProfile/:userid' element={<ViewProfile />} />
          <Route path='/EditProfile/:userid' element={<EditProfile />} />
          <Route path='/GroupFormation' element={<GroupFormation />} />
          <Route path='/CreateGroup' element={<CreateGroup />} />
          <Route path='/ViewGroupByLeader' element={<ViewGroupByLeader />} />
          <Route path='/PracAPI' element={<PracAPI />} />
          <Route path='/SearchStudentByLeader' element={<SearchStudentByLeader />} />
          <Route path='/ViewRequestsByStudent' element={<ViewRequestsByStudent />} />
          <Route path='/ViewPendingRequestByLeader' element={<ViewPendingRequestByLeader />} />
          <Route path='/EditGroupByLeader' element={<EditGroupByLeader />} />
          <Route path='/ViewStudentProfileByLeader' element={<ViewStudentProfileByLeader />} />
          <Route path='/ViewGroupByStudent' element={<ViewGroupByStudent />} />

        </Routes>
      </div>
    </div>
  );
}