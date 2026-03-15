import { useState } from 'react';
import { api } from '../api/client';

export const useRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerStore = async (formData, coords) => {
    setLoading(true);
    setError(null);
    try {
      // Point 5: Save merchant + store details in DB
      const response = await api.post('/merchant/register', {
        ...formData,
        latitude: coords?.lat,
        longitude: coords?.lng
      });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { registerStore, loading, error };
};