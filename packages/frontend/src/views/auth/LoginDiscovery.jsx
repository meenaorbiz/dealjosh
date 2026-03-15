import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/client';
import { Button } from '../../components/ui/Button';
import TextField from '../../components/ui/TextField';
import BrandHeader from '../../components/ui/BrandHeader'; // <--- Check this path
import MoolMantra from '../../components/ui/MoolMantra';   // <--- Check this path

const LoginDiscovery = () => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Mobile, 2: OTP
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Timer Logic
  useEffect(() => {
    let interval = null;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendOTP = async () => {
    setLoading(true);
    try {
      // Points 1 & 9: Trigger Discovery + OTP Generation
      await api.get(`/public/discover?mobile=${mobile}`);
      setStep(2);
      setTimer(60);
      setCanResend(false);
    } catch (err) {
      console.error("Discovery failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    try {
      // Points 2 & 10: Verify 123456
      const res = await api.post('/public/verify-otp', { mobile, otp });
      localStorage.setItem('dj_token', res.data.token);
      
      // Point 6: Conditional Navigation
      if (res.data.status === 'NEW_USER') navigate('/register-store');
      else navigate('/dashboard');
    } catch (err) {
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full justify-around py-10 px-6 animate-in fade-in duration-500">
      <BrandHeader />
      
      {step === 1 && <MoolMantra />}

      <div className="w-full space-y-6">
        {/* Step 1: Mobile Input */}
        <TextField
          label="MOBILE NUMBER"
          placeholder="9999999999"
          value={mobile}
          disabled={step === 2}
          onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
        />

        {/* Step 2: Dynamic OTP Reveal */}
        {step === 2 && (
          <div className="animate-in slide-in-from-top-4 duration-500 space-y-4">
            <TextField
              label="ENTER OTP"
              placeholder="000000"
              autoComplete="one-time-code" // Point 10: Autoread
              value={otp}
              onChange={(e) => setOtp(e.target.value.slice(0, 6))}
            />
            
            <div className="flex justify-between items-center px-1">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                {timer > 0 ? `Resend in ${timer}s` : "Didn't get it?"}
              </span>
              <button
                type="button"
                disabled={!canResend}
                onClick={handleSendOTP}
                className={`text-[11px] font-black uppercase tracking-widest ${canResend ? 'dj-gold-text underline' : 'text-gray-300'}`}
              >
                Resend OTP
              </button>
            </div>
          </div>
        )}

        <Button 
          onClick={step === 1 ? handleSendOTP : handleVerify}
          loading={loading}
          disabled={step === 1 ? mobile.length < 10 : otp.length < 6}
        >
          {step === 1 ? "Get Started" : "Verify & Login"}
        </Button>

        {step === 2 && (
          <button 
            onClick={() => { setStep(1); setOtp(''); }}
            className="w-full text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center"
          >
            ← Change Mobile Number
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginDiscovery;