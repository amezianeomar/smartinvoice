import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, CreditCard, ShieldCheck, Activity, ArrowUpRight, Clock } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/dashboard-stats');
        setStats(response.data.data);
      } catch (err) {
        console.error("Failed to fetch admin stats:", err);
        setError("Impossible de charger les statistiques.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'admin') {
      fetchStats();
    }
  }, [user]);

  // Protect the route at the component level just in case
  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-[#0F172A] dark:text-white tracking-tight flex items-center gap-3">
            Administration
            <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-500 text-xs font-bold uppercase tracking-wider border border-purple-500/20">
              Super Admin
            </span>
          </h1>
          <p className="text-[#526e9c] mt-2">Vue d'ensemble de la plateforme SmartInvoice.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Total Users */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-[#0F172A]/80 backdrop-blur-xl p-6 rounded-3xl border border-[#526e9c]/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(24,173,242,0.05)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
            <Users size={48} className="text-blue-500" />
          </div>
          <div className="relative z-10">
            <p className="text-[#526e9c] font-bold text-sm uppercase tracking-wider mb-2">Utilisateurs Inscrits</p>
            {loading ? (
              <div className="h-10 w-24 bg-[#526e9c]/20 animate-pulse rounded-lg"></div>
            ) : (
              <h3 className="text-4xl font-black text-[#0F172A] dark:text-white">
                {stats?.total_users}
              </h3>
            )}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
        </motion.div>

        {/* Active Subscriptions */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-[#0F172A]/80 backdrop-blur-xl p-6 rounded-3xl border border-[#526e9c]/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(168,85,247,0.05)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
            <ShieldCheck size={48} className="text-purple-500" />
          </div>
          <div className="relative z-10">
            <p className="text-[#526e9c] font-bold text-sm uppercase tracking-wider mb-2">Abonnements Actifs</p>
            {loading ? (
              <div className="h-10 w-24 bg-[#526e9c]/20 animate-pulse rounded-lg"></div>
            ) : (
              <h3 className="text-4xl font-black text-[#0F172A] dark:text-white">
                {stats?.active_subscriptions}
              </h3>
            )}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        </motion.div>

        {/* Revenue */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-[#0F172A]/80 backdrop-blur-xl p-6 rounded-3xl border border-[#526e9c]/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(20,184,166,0.05)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
            <CreditCard size={48} className="text-teal-500" />
          </div>
          <div className="relative z-10">
            <p className="text-[#526e9c] font-bold text-sm uppercase tracking-wider mb-2">Revenu Total (DH)</p>
            {loading ? (
              <div className="h-10 w-32 bg-[#526e9c]/20 animate-pulse rounded-lg"></div>
            ) : (
              <h3 className="text-4xl font-black text-[#0F172A] dark:text-white flex items-center gap-2">
                {Number(stats?.total_revenue).toLocaleString('fr-MA')}
                <ArrowUpRight size={24} className="text-teal-500" />
              </h3>
            )}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-emerald-500"></div>
        </motion.div>
      </motion.div>

      {/* Recent Users Table Shell */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-[#0F172A]/80 backdrop-blur-xl rounded-3xl border border-[#526e9c]/10 shadow-lg overflow-hidden"
      >
        <div className="p-6 border-b border-[#526e9c]/10 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white flex items-center gap-2">
            <Activity size={20} className="text-[#18adf2]" />
            Derniers Inscrits
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#526e9c]/5 text-[#526e9c] text-xs uppercase tracking-wider">
                <th className="p-4 font-bold">Utilisateur</th>
                <th className="p-4 font-bold">Email</th>
                <th className="p-4 font-bold">Statut</th>
                <th className="p-4 font-bold">Date d'inscription</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#526e9c]/10 text-sm">
              {loading ? (
                // Skeleton Rows
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="p-4"><div className="h-4 bg-[#526e9c]/20 rounded w-32"></div></td>
                    <td className="p-4"><div className="h-4 bg-[#526e9c]/20 rounded w-48"></div></td>
                    <td className="p-4"><div className="h-6 bg-[#526e9c]/20 rounded-full w-20"></div></td>
                    <td className="p-4"><div className="h-4 bg-[#526e9c]/20 rounded w-24"></div></td>
                  </tr>
                ))
              ) : stats?.recent_users?.length > 0 ? (
                stats.recent_users.map((u) => (
                  <tr key={u.id} className="hover:bg-[#526e9c]/5 transition-colors">
                    <td className="p-4 font-semibold text-[#0F172A] dark:text-white">
                      {u.nom}
                      {u.role === 'admin' && (
                        <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-500 uppercase">
                          Admin
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-[#526e9c]">{u.email}</td>
                    <td className="p-4">
                      {u.statut_abonnement === 'actif' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          Actif ({u.abonnement})
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#526e9c]/10 text-[#526e9c] border border-[#526e9c]/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#526e9c]"></span>
                          Inactif
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-[#526e9c] flex items-center gap-2">
                      <Clock size={14} />
                      {new Date(u.created_at).toLocaleDateString('fr-FR', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-[#526e9c]">
                    Aucun utilisateur trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
