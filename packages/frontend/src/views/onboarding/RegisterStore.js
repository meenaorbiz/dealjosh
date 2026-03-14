import React from 'react';
import { useRegistration } from '../../hooks/useRegistration';
import { Button } from '../../components/Button'; // Reusable Button
import { Input, Select } from '../../components/FormElements'; // SRP Components

const RegisterStoreView = () => {
  const userMobile = localStorage.getItem('user_mobile');
  const { formData, categories, updateField, detectGPS, loading, setLoading } = useRegistration(userMobile);

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/api/v1/merchant/register', formData);
      localStorage.removeItem(`dj_draft_${userMobile}`);
      // Navigate to success...
    } catch (err) {
      alert("Store details saved as draft. Please check GPS.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="onboarding-page">
      <form onSubmit={handleFinalSubmit}>
        <h3>Section 1: Brand</h3>
        <Input 
          label="Store Name" 
          value={formData.store_name} 
          onChange={(v) => updateField('store_name', v)} 
        />
        
        <Select 
          label="Category" 
          options={categories} // Dynamic from DB
          value={formData.category_id}
          onChange={(v) => updateField('category_id', v)}
        />

        <h3>Section 2: Location</h3>
        <Button 
          type="button" 
          variant="secondary" 
          onClick={detectGPS}
          label={formData.lat ? "✅ GPS Captured" : "📍 Detect Location"}
        />

        <Button 
          type="submit" 
          loading={loading} 
          disabled={!formData.lat}
          label="Complete Registration" 
        />
      </form>
    </div>
  );
};

export default RegisterStoreView;