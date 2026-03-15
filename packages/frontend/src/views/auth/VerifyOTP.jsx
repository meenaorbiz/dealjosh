import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../../api/client';
import { Button } from '../../components/ui/Button';
import TextField from '../../components/ui/TextField';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  const mobile = location.state?.mobile;

  // Security check: bounce back if no mobile state found
  useEffect(() => {
    if (!mobile) navigate('/');
  }, [mobile, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/public/verify-otp', { mobile, otp });
      const { token, storeId } = response.data;

      localStorage.setItem('dj_token', token);

      if (storeId) {
        navigate('/dashboard');
      } else {
        navigate('/register-store');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid OTP. Try 123456 for testing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full justify-around py-10 px-6">
      {/* 1. Header Identity */}
      <div className="text-center">
        <div className="text-4xl font-[900] tracking-tighter inline-flex items-center">
          <span className="text-[#1a1a1a]">DEAL</span>
          <span className="dj-gold-text">JOSH</span>
        </div>
        <p className="text-[10px] font-bold text-gray-400 tracking-[0.4em] uppercase mt-2">
          Identity Verification
        </p>
      </div>

      {/* 2. Message Context */}
      <div className="text-center space-y-3">
        <h2 className="text-xl font-bold text-gray-800">Confirm it's you</h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          Enter the 6-digit code sent to <br/>
          <span className="text-gray-900 font-bold tracking-wider">+91 {mobile}</span>
        </p>
      </div>

      {/* 3. Form Section */}
      <div className="w-full">
        <form onSubmit={handleVerify} className="space-y-8">
          <TextField
            label="OTP CODE"
            type="number"
            placeholder="000000"
            value={otp}
            onChange={(e) => setOtp(e.target.value.slice(0, 6))}
            required
            error={error}
          />
          <Button 
            type="submit" 
            variant="primary" 
            loading={loading}
            disabled={otp.length < 6}
          >
            Verify & Continue
          </Button>
        </form>
        
        <button 
          onClick={() => navigate('/')}
          className="w-full mt-8 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] hover:text-[--dj-gold] transition-colors"
        >
          ← Change Mobile Number
        </button>
      </div>
    </div>
  );
};

export default VerifyOTP;