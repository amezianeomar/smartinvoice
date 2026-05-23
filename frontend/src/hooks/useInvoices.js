import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export default function useInvoices() {
  const queryClient = useQueryClient();

  const { data: invoices = [], isLoading, error, refetch: fetchInvoices } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      const res = await api.get('/invoices');
      return res.data?.data || [];
    },
  });

  const fetchInvoice = useCallback(async (id) => {
    const res = await api.get(`/invoices/${id}`);
    return res.data?.data;
  }, []);

  const createMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await api.post('/invoices', payload);
      return res.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await api.put(`/invoices/${id}`, payload);
      return res.data?.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/invoices/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const downloadInvoicePdf = useCallback(async (invoice) => {
    const res = await api.get(`/invoices/${invoice.id}/pdf`, { responseType: 'blob' });
    const fileName = `facture_${invoice.numero || invoice.id}.pdf`;
    const blobUrl = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = blobUrl;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
  }, []);

  const viewInvoicePdf = useCallback(async (invoice) => {
    const res = await api.get(`/invoices/${invoice.id}/pdf`, { responseType: 'blob' });
    const blobUrl = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
    window.open(blobUrl, '_blank');
    setTimeout(() => window.URL.revokeObjectURL(blobUrl), 60000);
  }, []);

  const sendEmailMutation = useMutation({
    mutationFn: async (invoiceId) => {
      const res = await api.post(`/invoices/${invoiceId}/send-email`);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['invoices'] }),
  });

  return {
    invoices,
    isLoading,
    error: error ? (error.response?.data?.message || 'Impossible de charger les factures.') : '',
    fetchInvoices,
    fetchInvoice,
    createInvoice: createMutation.mutateAsync,
    updateInvoice: (id, payload) => updateMutation.mutateAsync({ id, payload }),
    deleteInvoice: deleteMutation.mutateAsync,
    downloadInvoicePdf,
    viewInvoicePdf,
    sendInvoiceEmail: sendEmailMutation.mutateAsync,
  };
}