import React from 'react';

const BrandHeader = () => (
  <header className="dj-brand-header">
    <div className="dj-logo-link flex items-center no-underline w-full">
      {/* 1. The Logo Box */}
      <div className="flex-shrink-0 w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-sm mr-3">
        <span className="text-white font-black text-xl leading-none">D</span>
      </div>

      {/* 2. The Text - Forced to stay on one line */}
      <div className="flex items-center min-w-0 overflow-visible">
        <span className="dj-brand-name whitespace-nowrap text-xl tracking-tighter">
          DEAL<span className="dj-gold-text">JOSH</span>
        </span>
      </div>
    </div>
  </header>
);

export default BrandHeader;