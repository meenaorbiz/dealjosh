import React from 'react';
import BrandLogo from './BrandLogo';  // Just './' because they are neighbors
import PlanBadge from './PlanBadge';  // Just './' because they are neighbors

const BrandHeader = ({ subtitle, plan }) => (
  <header className="dj-brand-header flex justify-between items-center pr-4">
    <div className="dj-logo-link flex items-center no-underline">
      <div className="flex-shrink-0 p-1">
        <img 
          src="/logo.svg" 
          alt="DealJosh Logo" 
          className="w-12 h-12 object-contain drop-shadow-md"
        />
      </div>

      <div className="ml-2 flex flex-col justify-center leading-tight">
        <BrandLogo size="text-[1.4rem]" />
        <span className="text-[0.65rem] font-bold text-gray-500 tracking-[0.25em] uppercase">
          {subtitle || 'Merchant Portal'}
        </span>
      </div>
    </div>

    {/* Fixed: Changed prop from 'plan' to 'planName' to match PlanBadge */}
    {plan && (
      <div className="animate-in fade-in slide-in-from-right-2 duration-500">
        <PlanBadge planName={plan} />
      </div>
    )}
  </header>
);

export default BrandHeader;