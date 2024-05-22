import { Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import ResetPassword from '../ResetPassword/ResetPassword';
import ChangePassword from '../ChangePassword/ChangePassword';
import ViewProfile from '../CoordinatorProfile/ViewProfile';
import EditProfile from '../CoordinatorProfile/EditProfile';
import StudentsRegistration from '../StudentsRegistration/StudentsRegistration';
import AddStudentsFile from '../../../components/AddStudentsFile/AddStudentsFile';
import ViewAppliedStudents from '../StudentsRegistration/AppliedStudents/ViewAppliedStudents';
import VerifyAppliedStudents from '../StudentsRegistration/AppliedStudents/VerifyAppliedStudents';
import ViewTemporarilyEnrolledStudents from '../StudentsRegistration/TemporaryEnrolledStudents/ViewTemporarilyEnrolledStudents';
import VerifyTemporarilyEnrolledStudents from '../StudentsRegistration/TemporaryEnrolledStudents/VerifyTemporarilyEnrolledStudents';
import ActualEnrolledStudents from '../StudentsRegistration/ActualEnrolledStudents/ActualEnrolledStudents';
import ViewStudents from '../Dashboard/ViewStudents/ViewStudents';
import RemoveStudent from '../Dashboard/ViewStudents/RemoveStudent';
import ViewSupervisors from '../Dashboard/ViewSupervisors/ViewSupervisors';
import AddSupervisor from '../Dashboard/ViewSupervisors/AddSupervisor';
import RemoveSupervisor from '../Dashboard/ViewSupervisors/RemoveSupervisor';
import ViewSupervisorProfile from '../Dashboard/ViewSupervisors/ViewSupervisorProfile';
import ViewPanelMembers from '../Dashboard/ViewPanelMembers/ViewPanelMembers';
import AddPanelMember from '../Dashboard/ViewPanelMembers/AddPanelMember';
import RemovePanelMember from '../Dashboard/ViewPanelMembers/RemovePanelMember';
import ViewPanelMemberProfile from '../Dashboard/ViewPanelMembers/ViewPanelMemberProfile';
import CoordinatorSidebar from '../../../components/Sidebar/CoordinatorSidebar';
import ViewFYPGroups from '../Dashboard/ViewFYPGroups/ViewFYPGroups';
import ViewGroupDetails from '../Dashboard/ViewFYPGroups/ViewGroupDetails';
import ViewGroupSupervisorProfile from '../Dashboard/ViewFYPGroups/ViewGroupSupervisorProfile';
import ViewGroupMemberProfile from '../Dashboard/ViewFYPGroups/ViewGroupMemberProfile';
import GroupFormation from '../GroupFormation/GroupFormation';
import ViewStudentProfile from '../Dashboard/ViewStudents/ViewStudentProfile';

export default function CoordinatorRoutes() {
  const location = useLocation();
  // const { pathname } = useLocation();
  // const userIdMatch = pathname.match(/\/Dashboard\/(\d+)/);
  // const userid = userIdMatch ? userIdMatch[1] : null;

  // Define routes where the sidebar should not be displayed
  const excludeSidebarRoutes = [
    '/coordinator/Login',
    '/coordinator/ResetPassword'
  ];

  // Check if the current route should exclude the sidebar
  //const showSidebar = !excludeSidebarRoutes.includes(location.pathname);
  const showSidebar = !excludeSidebarRoutes.some(route => location.pathname.includes(route));

  return (
    <div className="row">
      {showSidebar && (
        <div className="col-md-3">
          <CoordinatorSidebar />
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
          <Route path="/StudentsRegistration" element={<StudentsRegistration />} />
          <Route path="/AddStudentsFile" element={<AddStudentsFile />} />
          <Route path="/ViewAppliedStudents" element={<ViewAppliedStudents />} />
          <Route path="/VerifyAppliedStudents" element={<VerifyAppliedStudents />} />
          <Route path="/ViewTemporarilyEnrolledStudents" element={<ViewTemporarilyEnrolledStudents />} />
          <Route path="/VerifyTemporarilyEnrolledStudents" element={<VerifyTemporarilyEnrolledStudents />} />
          <Route path="/ActualEnrolledStudents" element={<ActualEnrolledStudents />} />
          <Route path="/ViewStudents" element={<ViewStudents />} />
          <Route path="/RemoveStudent" element={<RemoveStudent />} />
          <Route path='/ViewStudentProfile' element={< ViewStudentProfile />} />
          <Route path='/ViewFYPGroups' element={<ViewFYPGroups />} />
          <Route path='/ViewGroupDetails' element={<ViewGroupDetails />} />
          <Route path="/ViewGroupSupervisorProfile" element={<ViewGroupSupervisorProfile/>} />
          <Route path='/ViewGroupMemberProfile' element={<ViewGroupMemberProfile/>} />
          <Route path='/GroupFormation' element={<GroupFormation />} />
          <Route path="/ViewSupervisors" element={<ViewSupervisors />} />
          <Route path="/AddSupervisor" element={<AddSupervisor />} />
          <Route path="/RemoveSupervisor" element={<RemoveSupervisor />} />
          <Route path="/ViewSupervisorProfile" element={<ViewSupervisorProfile/>} />
          <Route path="/ViewPanelMembers" element={<ViewPanelMembers />} />
          <Route path="/AddPanelMember" element={<AddPanelMember />} />
          <Route path="/RemovePanelMember" element={<RemovePanelMember />} />
          <Route path='/ViewPanelMemberProfile' element={<ViewPanelMemberProfile/>}/>
        </Routes>
      </div>
    </div>
  );
}