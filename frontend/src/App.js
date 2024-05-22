import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import StudentRoutes from './pages/student/StudentRoutes/StudentRoutes';
import CoordinatorRoutes from './pages/coordinator/CoordinatorRoutes/CoordinatorRoutes';
import SupervisorRoutes from './pages/supervisor/SupervisorRoutes/SupervisorRoutes';
import PanelMemberRoutes from './pages/panelMember/PanelMemberRoutes/PanelMemberRoutes';
import SelectUserPage from './pages/SelectUserPage';
import { CoordinatorProvider } from './context/CoordinatorContext';
import { StudentProvider } from './context/StudentContext';
import { SupervisorProvider } from './context/SupervisorContext';
import { PanelMemberProvider } from './context/PanelMemberContext';

function App() {
  return (
    <div className='app'>
      <Header />
      <BrowserRouter>
          <Routes>
            <Route path='*' element={<SelectUserPage />} />
            <Route path="student/*" element={<StudentProvider><StudentRoutes /></StudentProvider>} />
            <Route path="coordinator/*" element={<CoordinatorProvider><CoordinatorRoutes /></CoordinatorProvider>} />
            <Route path="supervisor/*" element={<SupervisorProvider><SupervisorRoutes /></SupervisorProvider>} />
            <Route path="panelMember/*" element={<PanelMemberProvider><PanelMemberRoutes /></PanelMemberProvider>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;