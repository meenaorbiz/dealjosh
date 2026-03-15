import React from 'react';

/**
 * PlanBadge Atom
 * * @param {string} planName - The name of the plan from PostgreSQL (e.g., 'NORMAL', 'PREMIUM')
 * @param {string} className - Optional extra tailwind classes for positioning
 */
const PlanBadge = ({ planName = 'NORMAL', className = "" }) => {
  // Normalize the name to uppercase for comparison safety
  const normalizedPlan = planName?.toUpperCase();
  const isPremium = normalizedPlan === 'PREMIUM';

  return (
    <div 
      className={`
        inline-flex items-center justify-center
        px-3 py-1 rounded-full 
        text-[10px] font-black uppercase tracking-[0.15em] 
        transition-all duration-300 ease-in-out shadow-sm
        ${isPremium 
          ? 'bg-gradient-to-r from-[#D48806] to-[#FFA500] text-white border border-[#D48806]/20 animate-in fade-in zoom-in' 
          : 'bg-slate-100 text-slate-500 border border-slate-200'}
        ${className}
      `}
    >
      {/* Visual Indicator for Premium */}
      {isPremium && (
        <svg 
          className="w-3 h-3 mr-1.5 text-white fill-current" 
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
      
      {isPremium ? 'Premium Merchant' : 'Normal'}
    </div>
  );
};

export default PlanBadge;