import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout & Components
import MobileLayout from './components/MobileLayout';

// Auth Views
import LoginDiscovery from './views/auth/LoginDiscovery';
import VerifyOTP from './views/auth/VerifyOTP';

// Onboarding Views
import RegisterStore from './views/onboarding/RegisterStore';

// Styles - Using index.css for the Brand Design
import './index.css'; 

function App() {
  return (
    <Router>
      <MobileLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginDiscovery />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/register" element={<RegisterStore />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </MobileLayout>
    </Router>
  );
}

export default App;