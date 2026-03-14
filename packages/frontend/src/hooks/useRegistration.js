import { useState, useEffect } from 'react';
import { api } from '../api/client'; // Your axios/fetch wrapper

export const useRegistration = (userMobile) => {
  const [formData, setFormData] = useState({
    owner_name: '', store_name: '', category_id: '', 
    branch_name: '', lat: null, lng: null, address: ''
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load Categories from DB
  useEffect(() => {
    api.get('/public/categories').then(res => setCategories(res.data));
  }, []);

  // Load Draft
  useEffect(() => {
    const draft = localStorage.getItem(`dj_draft_${userMobile}`);
    if (draft) setFormData(JSON.parse(draft));
  }, [userMobile]);

  const updateField = (name, value) => {
    const next = { ...formData, [name]: value };
    setFormData(next);
    localStorage.setItem(`dj_draft_${userMobile}`, JSON.stringify(next));
  };

  const detectGPS = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          updateField('lat', pos.coords.latitude);
          updateField('lng', pos.coords.longitude);
          resolve();
        },
        (err) => reject(err)
      );
    });
  };

  return { formData, categories, updateField, detectGPS, loading, setLoading };
};