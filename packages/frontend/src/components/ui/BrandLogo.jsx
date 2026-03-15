import React from 'react';

/**
 * The single source of truth for the DealJosh brand wordmark.
 * Uses index.css variables for black and gold colors.
 */
const BrandLogo = ({ size = "text-[1.4rem]", className = "" }) => {
  return (
    <span className={`${size} font-[900] tracking-tighter text-[#1a1a1a] flex items-center whitespace-nowrap ${className}`}>
      DEAL<span className="text-[#D48806] ml-[2px]">JOSH</span>
    </span>
  );
};

export default BrandLogo;