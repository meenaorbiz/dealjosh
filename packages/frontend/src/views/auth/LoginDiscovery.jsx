import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/client'; 
import { Button } from '../../components/ui/Button'; // Using your UI component
import { Input } from '../../components/ui/Input';   // Using your UI component
import BrandMessage from '../../components/BrandMessage';

const LoginDiscovery = () => {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleDiscovery = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.get(`/public/discover?mobile=${mobile}`);
      const { status } = response.data;

      if (status === 'NEW_USER') {
        navigate('/register', { state: { mobile } }); 
      } else if (status === 'EXISTING_USER') {
        navigate('/verify-otp', { state: { mobile } });
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-700">
      {/* Centralized Brand Logic */}
      <BrandMessage />

      <div className="px-6">
        <form onSubmit={handleDiscovery} className="space-y-6">
          <Input
            label="Mobile Number"
            type="tel"
            placeholder="Enter 10-digit mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
            required
            error={error} 
          />
          
          {/* Button uses the variant logic from your ui/Button.jsx */}
          <Button 
            type="submit" 
            variant="primary" 
            loading={loading}
            disabled={mobile.length < 10}
          >
            Get Started
          </Button>
        </form>
        
        <p className="text-center text-[10px] text-gray-400 mt-12 uppercase tracking-widest">
          Secure Login • DealJosh Merchant
        </p>
      </div>
    </div>
  );
};

export default LoginDiscovery;