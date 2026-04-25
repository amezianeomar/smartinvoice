import { useState, useEffect } from 'react';
import api from '../services/api';

/**
 * Custom hook to fetch dashboard statistics and recent activity
 */
export const useDashboard = () => {
  const [data, setData] = useState({
    total_revenue: 0,
    pending_amount: 0,
    invoice_count: 0,
    recent_activity: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/dashboard/stats');
      setData(response.data);
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
      setError(err.response?.data?.message || "Erreur lors du chargement des statistiques");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    data,
    isLoading,
    error,
    refresh: fetchDashboardData
  };
};
