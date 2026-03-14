import React from 'react';
import { useLocation } from 'react-router-dom';
import BrandHeader from './BrandHeader';
import BottomNav from './BottomNav';

const MobileLayout = ({ children }) => {
  const location = useLocation();
  
  // Hide bottom nav on auth/onboarding pages
  const hideNavPaths = ['/login', '/register', '/verify-otp'];
  const shouldShowNav = !hideNavPaths.includes(location.pathname);

  return (
    <div id="root">
      <div className="mobile-layout">
        <BrandHeader />
        
        <main className={shouldShowNav ? 'pb-20' : ''}>
          {children}
        </main>

        {shouldShowNav && <BottomNav />}
      </div>
    </div>
  );
};

export default MobileLayout;