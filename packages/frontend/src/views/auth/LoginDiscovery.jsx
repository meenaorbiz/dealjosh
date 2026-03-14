import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this
import { api } from '../../api/client'; 
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import TextField from '../../components/ui/TextField';

const LoginDiscovery = () => {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleDiscovery = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.get(`/public/discover?mobile=${mobile}`);
      const { status } = response.data;

      if (status === 'NEW_USER') {
        // Use navigate instead of window.location
        navigate('/register', { state: { mobile } }); 
      } else if (status === 'EXISTING_USER') {
        // Pass the mobile number so VerifyOTP knows where to send the code
        navigate('/verify-otp', { state: { mobile } });
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
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 font-display">
          Welcome to DealJosh
        </h2>
        <form onSubmit={handleDiscovery} className="space-y-4">
          <Input
            label="Mobile Number"
            type="tel"
            placeholder="Enter 10-digit mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
            required
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
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