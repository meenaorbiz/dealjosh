import React, { useState } from 'react';
import { api } from '../../api/client'; // Uses your established axios instance
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const LoginDiscovery = () => {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDiscovery = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Hit the discovery endpoint we verified earlier
      const response = await api.get(`/public/discover?mobile=${mobile}`);
      const { status, message } = response.data;

      if (status === 'NEW_USER') {
        console.log(message);
        // Redirect to Step 1 of Onboarding
        window.location.href = '/register'; 
      } else if (status === 'EXISTING_USER') {
        console.log(message);
        // Navigate to OTP screen
        window.location.href = '/verify-otp';
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome to DealJosh
        </h2>
        <form onSubmit={handleDiscovery} className="space-y-4">
          <Input
            label="Mobile Number"
            type="tel"
            placeholder="Enter 10-digit mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading || mobile.length < 10}
          >
            {loading ? 'Checking...' : 'Get Started'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginDiscovery;