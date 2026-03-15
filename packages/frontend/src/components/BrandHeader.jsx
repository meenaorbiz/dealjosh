import React from 'react';

const BrandHeader = () => (
  <header className="dj-brand-header">
    <div className="dj-logo-link flex items-center no-underline w-full h-full">
      {/* 1. The New Rupee Shopping Bag Logo - Resized and Locked to Left */}
      <div className="flex-shrink-0 flex items-center justify-center p-1">
        <img 
          src="/logo.svg" 
          alt="DealJosh Logo" 
          className="w-12 h-12 object-contain drop-shadow-md"
        />
      </div>

      {/* 2. The Brand Name Text - Fixed Spacing and J-Factor */}
      <div className="ml-2 flex flex-col justify-center leading-tight">
        <span className="text-[1.4rem] font-[900] tracking-tighter text-[#1a1a1a] flex items-center whitespace-nowrap">
          DEAL<span className="text-[#D48806] ml-[2px]">JOSH</span>
        </span>
        <span className="text-[0.65rem] font-bold text-gray-500 tracking-[0.25em] uppercase">
          Merchant Portal
        </span>
      </div>
    </div>
  </header>
);

export default BrandHeader;