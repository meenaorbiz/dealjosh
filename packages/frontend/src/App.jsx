import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MobileLayout from './components/MobileLayout';
import LoginDiscovery from './views/auth/LoginDiscovery';
import VerifyOTP from './views/auth/VerifyOTP';
import RegisterStore from './views/onboarding/RegisterStore';

function App() {
  return (
    <Router>
      <MobileLayout>
        <Routes>
          {/* Default to Login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<LoginDiscovery />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          
          {/* Onboarding Routes */}
          <Route path="/register" element={<RegisterStore />} />
          
          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </MobileLayout>
    </Router>
  );
}

export default App;