import { useCallback, useEffect, useState } from 'react';
import api from '../services/api';

export default function useClients() {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchClients = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const res = await api.get('/clients');
      setClients(res.data?.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Impossible de charger les clients.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const createClient = useCallback(async (payload) => {
    const res = await api.post('/clients', payload);
    const newClient = res.data?.data;

    if (newClient) {
      setClients((prev) => [newClient, ...prev]);
    }

    return newClient;
  }, []);

  const updateClient = useCallback(async (id, payload) => {
    const res = await api.put(`/clients/${id}`, payload);
    const updated = res.data?.data;

    if (updated) {
      setClients((prev) => prev.map((client) => (client.id === id ? updated : client)));
    }

    return updated;
  }, []);

  const deleteClient = useCallback(async (id) => {
    await api.delete(`/clients/${id}`);
    setClients((prev) => prev.filter((client) => client.id !== id));
  }, []);

  return {
    clients,
    isLoading,
    error,
    fetchClients,
    createClient,
    updateClient,
    deleteClient,
  };
}