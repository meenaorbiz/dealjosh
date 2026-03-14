import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../api/client';
import { Button } from '../../components/ui/Button';

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const mobile = location.state?.mobile;

  // Security: If someone tries to access this page without a mobile number, send them back
  useEffect(() => {
    if (!mobile) {
      navigate('/login');
    }
  }, [mobile, navigate]);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take the last character
    setOtp(newOtp);

    // Move to next field if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous field on backspace if current field is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length < 6) return;

    setLoading(true);
    setError('');

    try {
      // 1. Call backend to verify OTP
      const response = await api.post('/auth/verify-otp', {
        mobile,
        otp: otpString
      });

      // 2. Save the JWT token to LocalStorage
      localStorage.setItem('token', response.data.token);

      // 3. Navigate to the dashboard or onboarding
      navigate('/dashboard'); 
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Verify OTP
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Sent to +91 {mobile}
        </p>

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(el) => (inputRefs.current[index] = el)}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-xl font-bold border-2 rounded-lg focus:border-blue-500 focus:outline-none bg-gray-50"
              />
            ))}
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
            disabled={loading || otp.join('').length < 6}
          >
            {loading ? 'Verifying...' : 'Verify & Login'}
          </Button>

          <div className="text-center">
            <button 
              type="button"
              onClick={() => navigate('/login')}
              className="text-sm text-blue-600 hover:underline"
            >
              Change Mobile Number
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;