import React from 'react';
import { Button }  from './ui/Button'; // Import from UI package
import { Input }   from './ui/Input';  // Import from UI package
import { Select }  from './ui/Select'; // Import from UI package

const RegistrationForm = ({ 
  formData, 
  categories, 
  updateField, 
  onDetectGPS, 
  onSubmit, 
  loading 
}) => {
  return (
    <form onSubmit={onSubmit} className="registration-form">
      {/* SECTION 1: MERCHANT & BRAND */}
      <div className="form-section">
        <header>
          <h3>1. Store Profile</h3>
          <p>This info is saved as you type.</p>
        </header>

        <Input 
          label="Owner Name" 
          value={formData.owner_name} 
          onChange={(val) => updateField('owner_name', val)} 
          placeholder="e.g. Meena Iyer"
        />

        <Input 
          label="Store Name" 
          value={formData.store_name} 
          onChange={(val) => updateField('store_name', val)} 
          placeholder="e.g. Josh Pharmacy"
        />

        <Select 
          label="Business Category"
          value={formData.category_id}
          options={categories} // Fetched from DB via Hook
          onChange={(val) => updateField('category_id', val)}
        />
      </div>

      <hr className="form-divider" />

      {/* SECTION 2: LOCATION & GPS */}
      <div className="form-section">
        <header>
          <h3>2. Store Location</h3>
          <p>Help users find you on the map.</p>
        </header>

        <Input 
          label="Branch Name" 
          value={formData.branch_name} 
          onChange={(val) => updateField('branch_name', val)} 
          placeholder="e.g. Main Branch / Kothrud"
        />

        <div className="gps-container">
          <Button 
            type="button" 
            variant="secondary" 
            onClick={onDetectGPS}
            label={formData.lat ? "✅ GPS Captured" : "📍 Auto-Detect Location"}
          />
          {formData.lat && (
             <small className="coords-text">
               Lat: {formData.lat.toFixed(4)} | Lng: {formData.lng.toFixed(4)}
             </small>
          )}
        </div>

        <Input 
          label="Full Address" 
          value={formData.address} 
          onChange={(val) => updateField('address', val)} 
          placeholder="Building, Street, Landmark..."
        />
      </div>

      <Button 
        type="submit" 
        loading={loading} 
        disabled={!formData.lat} 
        label="Register Store" 
        fullWidth 
      />
    </form>
  );
};

export default RegistrationForm;