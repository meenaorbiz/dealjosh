import React from 'react';

const BrandMessage = ({ className = "" }) => {
  return (
    <div className={`text-center w-full animate-in fade-in duration-1000 ${className}`}>
      {/* 1. Brand Identity */}
      <div className="mb-6">
        <div className="text-4xl font-[900] tracking-tighter inline-flex items-center">
          <span className="text-[#1a1a1a]">DEAL</span>
          <span className="dj-gold-text">JOSH</span>
        </div>
        <div className="text-[10px] font-bold text-gray-400 tracking-[0.4em] uppercase mt-1">
          Merchant Portal
        </div>
      </div>

      {/* 2. Mool Mantra */}
      <h2 className="text-base font-bold text-gray-700 tracking-tight mb-4">
        व्यापार बढ़ाने का <span className="dj-gold-text text-xl ml-1">मूल मंत्र</span>
      </h2>

      {/* 3. Success Formula */}
      <div className="flex flex-col items-center px-2">
        <div className="flex items-center justify-center gap-1.5 whitespace-nowrap text-[1rem] font-extrabold">
          <span className="dj-gold-text">ज्यादा Deals,</span>
          <span className="text-gray-900">ज्यादा ग्राहक,</span>
          <span className="dj-gold-text">ज्यादा मुनाफा</span>
        </div>
        <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-[--dj-gold] to-transparent mt-3 opacity-40"></div>
      </div>
    </div>
  );
};

export default BrandMessage;