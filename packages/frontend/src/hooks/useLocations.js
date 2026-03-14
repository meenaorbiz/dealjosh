import { useState, useEffect } from 'react';
import { api } from '../api/client';

export const useLocations = (selectedStateId) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Fetch States once on mount
  useEffect(() => {
    api.get('/public/states')
      .then(res => setStates(res.data))
      .catch(err => console.error("States load failed", err));
  }, []);

  // Fetch Cities whenever the selected state changes
  useEffect(() => {
    if (!selectedStateId) {
      setCities([]);
      return;
    }
    api.get(`/public/cities?state_id=${selectedStateId}`)
      .then(res => setCities(res.data))
      .catch(err => console.error("Cities load failed", err));
  }, [selectedStateId]);

  return { states, cities };
};