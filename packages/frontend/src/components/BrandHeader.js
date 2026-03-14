import React from 'react';
import { Link } from 'react-router-dom';

const BrandHeader = () => {
  return (
    <header className="dj-brand-header">
      <Link to="/" className="dj-logo-link">
        
        {/* --- D J B A G - S V G - S Y M B O L --- */}
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 100 100" 
          className="dj-symbol"
        >
          {/* DEFINITIONS FOR GRADIENTS & GLOWS */}
          <defs>
            <linearGradient id="djBagGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#D48806', stopOpacity: 1 }} /> {/* Deep Gold */}
              <stop offset="100%" style={{ stopColor: '#F2994A', stopOpacity: 1 }} /> {/* Vibrant Orange */}
            </linearGradient>
            
            <filter id="djGlow">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* THE 'D' (The Bag Structure) */}
          <path 
            d="M20 30 V80 H60 C80 80, 90 70, 90 55 S80 30, 60 30 Z" 
            fill="url(#djBagGradient)" 
            filter="url(#djGlow)"
          />
          
          {/* THE 'J' (The Bag Handle) */}
          <path 
            d="M45 30 V20 C45 10, 55 10, 55 20 V60 C55 70, 45 70, 45 60" 
            fill="none" 
            stroke="white" 
            strokeWidth="6" 
            strokeLinecap="round"
          />

          {/* THE CURRENCY SYMBOL (Optional, adding a '$' context) */}
          <text x="60" y="60" fontSize="24" fontWeight="bold" fill="white" textAnchor="middle">₹</text>
        </svg>
        
        {/* --- D E A L J O S H - B R A N D - N A M E --- */}
        <span className="dj-brand-name">
          DEAL<span className="dj-gold-text">JOSH</span>
        </span>
      </Link>
    </header>
  );
};

export default BrandHeader;