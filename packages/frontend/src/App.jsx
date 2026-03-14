import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout & Components
import MobileLayout from './components/MobileLayout';

// Auth Views
import LoginDiscovery from './views/auth/LoginDiscovery';
import VerifyOTP from './views/auth/VerifyOTP';

// Onboarding Views
import RegisterStore from './views/onboarding/RegisterStore';

// Styles
import './App.css';

/**
 * DealJosh Merchant App
 * Handles routing for Auth and Onboarding flows.
 */
function App() {
  return (
    <Router>
      <MobileLayout>
        <Routes>
          {/* Default landing redirects to Login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Authentication Flow */}
          <Route path="/login" element={<LoginDiscovery />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          
          {/* Merchant Onboarding */}
          <Route path="/register" element={<RegisterStore />} />
          
          {/* Catch-all: Redirect unknown paths back to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </MobileLayout>
    </Router>
  );
}

export default App;