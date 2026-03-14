import { useState } from 'react';
import { api } from '../api/client';

export const useRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerStore = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/merchant/register', formData);
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