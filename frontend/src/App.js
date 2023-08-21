import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Pages/HomePage';
import LoginPage from './components/Pages/LoginPage';
import SignUpPage from './components/Pages/SignUpPage';
import UserDashboard from './components/Pages/UserDashboard';
import AdminHomepage from './components/Pages/AdminHomepage';
import AdminLoginPage from './components/Pages/AdminLoginPage';
import AdminDashboardPage from './components/Pages/AdminDashboardPage';
import AdminUserEdit from './components/Admin/AdminDashboard/AdminUserEdit';
import { AdminAuth, Auth } from './components/authentication/Auth';


function App() {
       

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/admin" element={<AdminHomepage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        
        {/* Protected routes */}
        <Route element={<Auth />}>
          <Route path="/userDashboard" element={<UserDashboard />} />
          </Route>

          {/* Admin routes */}
          
          <Route element={<AdminAuth />} >
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/useredit" element={<AdminUserEdit />} />
       </Route>
      </Routes>
    </Router>
  );
}

export default App;
