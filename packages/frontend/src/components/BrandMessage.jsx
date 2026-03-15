import React from 'react';

const BrandMessage = ({ className = "" }) => {
  return (
    <div className={`text-center mb-8 px-6 ${className}`}>
      {/* Title: व्यापार बढ़ाने का मूल मंत्र */}
      <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-tight mb-4">
        व्यापार बढ़ाने का <br /> मूल मंत्र —
      </h2>

      {/* Subtitle: ज्यादा Deals, ज्यादा ग्राहक, ज्यादा मुनाफा */}
      <p className="text-lg font-bold text-gray-600 leading-relaxed">
        <span className="dj-gold-text text-xl">ज्यादा Deals,</span> <br />
        ज्यादा ग्राहक, ज्यादा मुनाफा
      </p>
      
      {/* DealJosh Branding */}
      <div className="mt-4">
        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">With</span>
        <div className="text-2xl font-black tracking-tighter mt-1">
          <span className="text-[--dj-gold]">DEAL</span><span className="dj-gold-text">JOSH</span>
        </div>
      </div>
    </div>
  );
};

export default BrandMessage;