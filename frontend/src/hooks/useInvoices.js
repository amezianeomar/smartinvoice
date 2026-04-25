import { useCallback, useEffect, useState } from 'react';
import api from '../services/api';

export default function useInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchInvoices = useCallback(async (params = {}) => {
    setIsLoading(true);
    setError('');

    try {
      const res = await api.get('/invoices', { params });
      setInvoices(res.data?.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Impossible de charger les factures.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const fetchInvoice = useCallback(async (id) => {
    const res = await api.get(`/invoices/${id}`);
    return res.data?.data;
  }, []);

  const createInvoice = useCallback(async (payload) => {
    const res = await api.post('/invoices', payload);
    const created = res.data?.data;

    if (created) {
      setInvoices((prev) => [created, ...prev]);
    }

    return created;
  }, []);

  const deleteInvoice = useCallback(async (id) => {
    await api.delete(`/invoices/${id}`);
    setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
  }, []);

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

  const sendInvoiceEmail = useCallback(async (invoiceId) => {
    const res = await api.post(`/invoices/${invoiceId}/send-email`);

    setInvoices((prev) =>
      prev.map((invoice) =>
        invoice.id === invoiceId ? { ...invoice, statut: 'envoyee' } : invoice
      )
    );

    return res.data;
  }, []);

  return {
    invoices,
    isLoading,
    error,
    fetchInvoices,
    fetchInvoice,
    createInvoice,
    deleteInvoice,
    downloadInvoicePdf,
    sendInvoiceEmail,
  };
}