import React, { useState, useEffect } from 'react';
import { api } from '../../api/client';
import { Button } from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    // Retrieve the mobile number stored during the Discovery phase
    const savedMobile = localStorage.getItem('temp_dj_mobile');
    if (!savedMobile) {
      window.location.href = '/login';
    } else {
      setMobile(savedMobile);
    }

    // Simple resend timer logic
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/public/verify-otp', {
        mobile: mobile,
        otp: otp
      });

      // On success, store the token for the interceptor
      const { token } = response.data;
      localStorage.setItem('dj_token', token);
      localStorage.removeItem('temp_dj_mobile');

      // Redirect to the merchant dashboard or home
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setTimer(30);
    try {
      await api.get(`/public/discover?mobile=${mobile}`);
    } catch (err) {
      setError('Failed to resend OTP');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Verify Mobile
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Enter the 6-digit code sent to +91 {mobile}
        </p>
        
        <form onSubmit={handleVerify} className="space-y-6">
          <Input
            label="One-Time Password"
            type="text"
            placeholder="000000"
            value={otp}
            onChange={(val) => setOtp(val)}
            required
          />

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <Button 
            label="Verify & Login"
            type="submit" 
            fullWidth={true}
            loading={loading}
            disabled={otp.length !== 6}
          />

          <div className="text-center">
            {timer > 0 ? (
              <p className="text-sm text-gray-500">Resend code in {timer}s</p>
            ) : (
              <button 
                type="button"
                onClick={handleResend}
                className="text-sm text-blue-600 font-medium hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;