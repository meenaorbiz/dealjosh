import React from 'react';
import BrandHeader from './BrandHeader';

/**
 * MobileLayout creates the DealJosh PWA "frame".
 * It uses the 'mobile-layout' class from index.css to constrain width to 430px
 * and centers it on the desktop screen.
 */
const MobileLayout = ({ children }) => {
  return (
    <div id="root">
      {/* The main mobile container defined in your CSS */}
      <div className="mobile-layout">
        
        {/* Fixed Brand Header at the top */}
        <BrandHeader />

        {/* Main content area. 
          The padding (top 80px, bottom 40px) is already handled 
          by the .mobile-layout class in your index.css 
        */}
        <main className="w-full">
          {children}
        </main>

        {/* Optional: Add a subtle bottom safe-area for iPhone/PWA feel */}
        <div className="h-4 w-full bg-transparent"></div>
      </div>
    </div>
  );
};

export default MobileLayout;