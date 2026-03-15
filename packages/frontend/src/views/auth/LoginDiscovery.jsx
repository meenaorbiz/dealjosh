import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/client'; 
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
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
    /* h-full and justify-around spreads the content perfectly across the screen */
    <div className="flex flex-col h-full w-full justify-around py-10 px-6">
      
      {/* 1. TOP: The Brand Header */}
      <div className="text-center animate-in fade-in zoom-in duration-700">
        <div className="text-5xl font-[900] tracking-tighter inline-flex items-center">
          <span className="text-[#1a1a1a]">DEAL</span>
          <span className="dj-gold-text">JOSH</span>
        </div>
        <p className="text-[11px] font-bold text-gray-400 tracking-[0.4em] uppercase mt-2">
          Merchant Portal
        </p>
      </div>

      {/* 2. MIDDLE: The Mool Mantra & Formula */}
      <div className="text-center space-y-4">
        <h2 className="text-base font-bold text-gray-700 tracking-tight">
          व्यापार बढ़ाने का <span className="dj-gold-text text-xl ml-1">मूल मंत्र —</span>
        </h2>
        <div className="flex items-center justify-center gap-1 whitespace-nowrap text-[1rem] font-extrabold">
          <span className="dj-gold-text">ज्यादा Deals,</span>
          <span className="text-gray-900">ज्यादा ग्राहक,</span>
          <span className="dj-gold-text">ज्यादा मुनाफा</span>
        </div>
        <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-[--dj-gold] to-transparent mx-auto opacity-40"></div>
      </div>

      {/* 3. BOTTOM: The Login Form */}
      <div className="w-full">
        <form onSubmit={handleDiscovery} className="space-y-8">
          <Input
            label="MOBILE NUMBER"
            type="tel"
            placeholder="Enter 10-digit mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
            required
            error={error}
          />
          <Button 
            type="submit" 
            variant="primary" 
            loading={loading}
            disabled={mobile.length < 10}
          >
            Get Started
          </Button>
        </form>
        <p className="text-center text-[10px] text-gray-400 mt-8 tracking-widest uppercase">
          Verified Merchant Access
        </p>
      </div>
    </div>
  );
};

export default LoginDiscovery;