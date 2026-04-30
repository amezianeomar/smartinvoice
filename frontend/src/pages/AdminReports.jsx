import React, { useState, useEffect } from 'react';
import { BarChart3, Loader2, TrendingUp, DollarSign } from 'lucide-react';
import api from '../services/api';

export default function AdminReports() {
  const [reports, setReports] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await api.get('/admin/reports');
        if (response.data.success) {
          setReports(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch reports", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReports();
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="animate-spin text-[#18adf2]" size={32} /></div>;
  }

  // Calculate MRR from the last month in the array (assuming sorted asc)
  const currentMrr = reports?.monthly?.length > 0 
    ? reports.monthly[reports.monthly.length - 1].total 
    : 0;

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-[#0F172A] dark:text-white mb-1 tracking-tight flex items-center gap-3">
          <BarChart3 className="text-[#18adf2]" size={32} />
          Rapports Financiers
        </h1>
        <p className="text-[#526e9c] text-sm font-medium">Analysez les revenus récurrents et la croissance de la plateforme.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* MRR Card */}
        <div className="bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl rounded-3xl border border-[#526e9c]/20 p-6 md:p-8 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#18adf2]/10 rounded-full blur-3xl pointer-events-none transition-transform group-hover:scale-150 duration-700" />
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-[#18adf2]/10 flex items-center justify-center border border-[#18adf2]/20">
              <TrendingUp className="text-[#18adf2]" size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#526e9c] uppercase tracking-wider">Revenu Mensuel (MRR)</h3>
            </div>
          </div>
          <div className="flex items-end gap-3 relative z-10">
            <span className="text-4xl md:text-5xl font-black text-[#0F172A] dark:text-white tracking-tighter">
              {Number(currentMrr).toLocaleString('fr-FR')} <span className="text-2xl text-[#18adf2]">MAD</span>
            </span>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl rounded-3xl border border-[#526e9c]/20 p-6 md:p-8 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none transition-transform group-hover:scale-150 duration-700" />
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <DollarSign className="text-emerald-500" size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#526e9c] uppercase tracking-wider">Revenu Total Généré</h3>
            </div>
          </div>
          <div className="flex items-end gap-3 relative z-10">
            <span className="text-4xl md:text-5xl font-black text-[#0F172A] dark:text-white tracking-tighter">
              {Number(reports?.total || 0).toLocaleString('fr-FR')} <span className="text-2xl text-emerald-500">MAD</span>
            </span>
          </div>
        </div>
      </div>

      {/* Monthly Chart Shell */}
      <div className="bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl rounded-3xl border border-[#526e9c]/20 p-6 md:p-8 shadow-xl">
         <h3 className="text-lg font-black text-[#0F172A] dark:text-white mb-6">Évolution des Revenus</h3>
         
         <div className="h-64 flex items-end gap-4">
           {reports?.monthly?.map((m) => {
             // Calculate relative height percentage
             const max = Math.max(...reports.monthly.map(x => x.total));
             const height = max > 0 ? (m.total / max) * 100 : 0;
             return (
               <div key={m.month} className="flex-1 flex flex-col items-center gap-2 group">
                 <div className="w-full relative bg-[#18adf2]/10 rounded-t-xl group-hover:bg-[#18adf2]/20 transition-colors flex items-end justify-center pb-2" style={{ height: `${Math.max(height, 5)}%` }}>
                    <span className="text-[10px] font-bold text-[#18adf2] opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6">
                      {m.total} MAD
                    </span>
                 </div>
                 <span className="text-xs font-medium text-[#526e9c]">{m.month}</span>
               </div>
             )
           })}
           {(!reports?.monthly || reports.monthly.length === 0) && (
             <div className="w-full h-full flex items-center justify-center text-[#526e9c] text-sm">
               Pas assez de données pour afficher le graphique.
             </div>
           )}
         </div>
      </div>
    </div>
  );
}
