import React from 'react';
import BrandHeader from './BrandHeader';

const MobileLayout = ({ children }) => {
  return (
    <div className="mobile-layout">
      <BrandHeader />
      <main>{children}</main>
    </div>
  );
};

export default MobileLayout;