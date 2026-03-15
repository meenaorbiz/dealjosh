import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../../api/client';
import { Button } from '../../components/ui/Button';
import TextField from '../../components/ui/TextField';
import BrandHeader from '../../components/ui/BrandHeader';
import BrandLogo from '../../components/ui/BrandLogo';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/public/verify-otp', { mobile: state.mobile, otp });
      localStorage.setItem('dj_token', response.data.token);
      if (state.status === 'NEW_USER') navigate('/register-store');
      else navigate('/dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full justify-around py-10 px-6 animate-in fade-in">
      <BrandHeader />
      <div className="text-center space-y-3">
        <h2 className="text-xl font-bold">Confirm it's you</h2>
        <p className="text-sm text-gray-500">
          Enter code sent by <BrandLogo size="text-xs" /> to <b>+91 {state?.mobile}</b>
        </p>
      </div>
      <form onSubmit={handleVerify} className="w-full space-y-8">
        <TextField label="OTP CODE" value={otp} onChange={(e) => setOtp(e.target.value.slice(0,6))} />
        <Button type="submit" loading={loading}>Verify & Continue</Button>
      </form>
    </div>
  );
};

export default VerifyOTP;