import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRegistration } from '../../hooks/useRegistration';
import { Button } from '../../components/ui/Button';
import TextField from '../../components/ui/TextField';

const RegisterStore = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { registerStore, loading, error: apiError } = useRegistration();
  
  // Get the mobile number passed from LoginDiscovery
  const initialMobile = location.state?.mobile || '';

  const [formData, setFormData] = useState({
    storeName: '',
    ownerName: '',
    mobile: initialMobile,
    category: '',
    address: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.storeName) newErrors.storeName = 'Store name is required';
    if (!formData.ownerName) newErrors.ownerName = 'Owner name is required';
    if (!formData.category) newErrors.category = 'Please select a category';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await registerStore(formData);
      // On success, move to OTP verification or Dashboard
      navigate('/verify-otp', { state: { mobile: formData.mobile } });
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-full py-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Register Store</h2>
        <p className="text-gray-500">Tell us about your business</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <TextField
          label="Store Name"
          name="storeName"
          placeholder="e.g. Josh General Store"
          value={formData.storeName}
          onChange={handleChange}
          error={errors.storeName}
        />

        <TextField
          label="Owner Name"
          name="ownerName"
          placeholder="Enter full name"
          value={formData.ownerName}
          onChange={handleChange}
          error={errors.ownerName}
        />

        <TextField
          label="Mobile Number"
          name="mobile"
          value={formData.mobile}
          disabled={true} // Locked since it was verified/entered earlier
          className="bg-gray-100 cursor-not-allowed"
        />

        <div className="flex flex-col w-full mb-4">
          <label className="mb-1 text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Category</option>
            <option value="grocery">Grocery</option>
            <option value="restaurant">Restaurant</option>
            <option value="electronics">Electronics</option>
            <option value="other">Other</option>
          </select>
          {errors.category && <span className="text-xs text-red-500 mt-1">{errors.category}</span>}
        </div>

        <TextField
          label="Business Address"
          name="address"
          placeholder="Enter full address"
          value={formData.address}
          onChange={handleChange}
        />

        {apiError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {apiError}
          </div>
        )}

        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 shadow-md"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register Store'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterStore;