import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegistration } from '../../hooks/useRegistration';
import { api } from '../../api/client';
import { Button } from '../../components/ui/Button';
import TextField from '../../components/ui/TextField';
import BrandHeader from '../../components/ui/BrandHeader';
import MoolMantra from '../../components/ui/MoolMantra';

const RegisterStore = () => {
  const navigate = useNavigate();
  const { registerStore, loading, error } = useRegistration();
  
  // Master Data States
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [coords, setCoords] = useState(null);
  
  // Form State mapped to PostgreSQL Schema
  const [formData, setFormData] = useState({
    name: '',
    state_id: '',
    city_id: '',
    pincode: '',
    area: '',
    landmark: '',
    address: ''
  });

  // 1. Initial Load: States & GPS
  useEffect(() => {
    // Fetch states from public master data
    api.get('/public/states').then(res => setStates(res.data));

    // Point 4: Location resolve using lat-long
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.error("GPS access denied", err)
      );
    }
  }, []);

  // 2. Cascading City Load
  useEffect(() => {
    if (formData.state_id) {
      api.get(`/public/cities?state_id=${formData.state_id}`).then(res => setCities(res.data));
    } else {
      setCities([]);
    }
  }, [formData.state_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Point 5: Save merchant details in DB via the hook
      await registerStore(formData, coords);
      navigate('/dashboard');
    } catch (err) {
      // Error handled by hook state
    }
  };

  return (
    <div className="flex flex-col h-full w-full py-6 px-6 overflow-y-auto animate-in fade-in duration-700">
      {/* Point 11: Premium Badge at Top Right */}
      <BrandHeader subtitle="Store Setup" plan="PREMIUM" />
      
      <div className="my-6">
        <MoolMantra />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 pb-10">
        <TextField 
          label="BUSINESS NAME" 
          placeholder="e.g. Josh Electronics" 
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
          required
        />

        {/* State & City Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">State</label>
            <select 
              className="dj-input text-sm h-11 bg-white border-gray-200"
              value={formData.state_id}
              onChange={e => setFormData({...formData, state_id: e.target.value, city_id: ''})}
              required
            >
              <option value="">Select</option>
              {states.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">City</label>
            <select 
              className="dj-input text-sm h-11 bg-white border-gray-200"
              disabled={!cities.length}
              value={formData.city_id}
              onChange={e => setFormData({...formData, city_id: e.target.value})}
              required
            >
              <option value="">Select</option>
              {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>

        {/* GPS Logic Card */}
        <div className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex items-center gap-4">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${coords ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600 animate-pulse'}`}>
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
             </svg>
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-black text-gray-500 uppercase">GPS resolve</p>
            <p className="text-[11px] text-gray-400 italic">
              {coords ? `Coordinates Locked: ${coords.lat.toFixed(3)}, ${coords.lng.toFixed(3)}` : "Acquiring shop location..."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <TextField 
            label="PINCODE" 
            type="number" 
            value={formData.pincode}
            onChange={e => setFormData({...formData, pincode: e.target.value.slice(0,6)})}
            required
          />
          <TextField 
            label="AREA/LOCALITY" 
            value={formData.area}
            onChange={e => setFormData({...formData, area: e.target.value})}
            required
          />
        </div>

        <TextField 
          label="LANDMARK (OPTIONAL)" 
          value={formData.landmark}
          onChange={e => setFormData({...formData, landmark: e.target.value})}
        />

        <TextField 
          label="DETAILED ADDRESS" 
          placeholder="Shop No, Building Name, Street"
          value={formData.address}
          onChange={e => setFormData({...formData, address: e.target.value})}
          required
        />

        {error && <p className="text-red-500 text-[10px] font-bold text-center uppercase tracking-tighter">{error}</p>}

        <Button 
          type="submit" 
          variant="primary"
          loading={loading} 
          disabled={!coords || !formData.city_id}
          className="w-full mt-4"
        >
          Launch My Store
        </Button>
      </form>
    </div>
  );
};

export default RegisterStore;