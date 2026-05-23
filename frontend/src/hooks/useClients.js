import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export default function useClients() {
  const queryClient = useQueryClient();

  const { data: clients = [], isLoading, error, refetch: fetchClients } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const res = await api.get('/clients');
      return res.data?.data || [];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await api.post('/clients', payload);
      return res.data?.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['clients'] }),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await api.put(`/clients/${id}`, payload);
      return res.data?.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['clients'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/clients/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['clients'] }),
  });

  const updateClient = useCallback(
    (id, payload) => updateMutation.mutateAsync({ id, payload }),
    [updateMutation]
  );

  return {
    clients,
    isLoading,
    error: error ? (error.response?.data?.message || 'Impossible de charger les clients.') : '',
    fetchClients,
    createClient: createMutation.mutateAsync,
    updateClient,
    deleteClient: deleteMutation.mutateAsync,
  };
}