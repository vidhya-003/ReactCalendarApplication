import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';  // Import HomePage component
import AdminDashboard from './components/AdminModule/AdminDashboard';
import UserDashboard from './components/UserModule/UserDashboard';
import CommunicationMethodManagement from './components/AdminModule/CommunicationMethodManagement';
import UserModule from './components/UserModule/UserModule';
import Notifications from './components/UserModule/Notifications';
import CalendarView from './components/UserModule/CalendarView';


const Routing = () => {
  return (
    <div>
      <Router>
      <div className="App">
        {/* Routing Setup */}
        <Routes>
          {/* HomePage - The starting page */}
          <Route path="/" element={<HomePage />} />

          {/* Dashboard Page */}
          <Route path="/admin/" element={<AdminDashboard />} />
          {/* <Route path="/admin/" element={<CompanyManagement/>} /> */}
          <Route path="/admin/communication-methods" element={<CommunicationMethodManagement/>} />

          <Route path="/user/" element={<UserModule/>} />
          <Route path="/user/dashboard" element={<UserDashboard/>} />
          <Route path="/user/calendar" element={<CalendarView/>} />
          <Route path="/user/notifications" element={<Notifications/>} />
        </Routes>
      </div>
    </Router>
    </div>
  )
}

export default Routing
