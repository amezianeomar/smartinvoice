import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

/**
 * Custom hook to fetch dashboard statistics and recent activity
 */
export const useDashboard = () => {
  const { data, isLoading, error, refetch: refresh } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await api.get('/dashboard');
      const { total_invoices, total_revenue, pending_amount, recent_invoices, monthly_stats } = response.data.data;
      
      return {
        total_revenue: total_revenue,
        pending_amount: pending_amount || 0,
        invoice_count: total_invoices,
        recent_activity: recent_invoices,
        monthly_stats: monthly_stats || []
      };
    }
  });

  return {
    data,
    isLoading,
    error: error ? (error.response?.data?.message || "Erreur lors du chargement des statistiques") : null,
    refresh
  };
};

export default useDashboard;
