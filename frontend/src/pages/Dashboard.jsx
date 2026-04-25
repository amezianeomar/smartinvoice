import React from 'react';
import EcommerceMetrics from '../components/dashboard/EcommerceMetrics';
import MonthlySalesChart from '../components/dashboard/MonthlySalesChart';
import RecentInvoices from '../components/dashboard/RecentInvoices';
import { useDashboard } from '../hooks/useDashboard';
import { Loader2, RefreshCcw } from 'lucide-react';

export default function Dashboard() {
  const { data, isLoading, error, refresh } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 size={48} className="text-[#18adf2] animate-spin mb-4" />
        <p className="text-[#526e9c] font-bold animate-pulse">Chargement de vos données...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-12 rounded-3xl bg-red-500/10 border border-red-500/20 text-center">
        <h2 className="text-xl font-black text-red-500 mb-4">Oups ! Une erreur est survenue</h2>
        <p className="text-red-400 mb-8">{error}</p>
        <button 
          onClick={refresh}
          className="flex items-center gap-2 mx-auto px-6 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors"
        >
          <RefreshCcw size={18} /> Réessayer
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h1 className="text-3xl font-black text-[#0F172A] dark:text-white mb-1 tracking-tight">Aperçu Général</h1>
            <p className="text-[#526e9c] text-sm font-medium">Suivez l'évolution de vos factures et de votre trésorerie.</p>
         </div>
         <button className="bg-gradient-to-r from-[#221ab7] to-[#18adf2] text-white px-5 py-2.5 rounded-xl font-bold shadow-[0_0_20px_rgba(24,173,242,0.3)] hover:shadow-[#18adf2]/50 transition-all hover:scale-105 active:scale-95">
            + Nouvelle Facture
         </button>
      </div>
      
      <div className="space-y-6">
        <EcommerceMetrics stats={data} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="lg:col-span-2 flex min-h-[400px]">
              <MonthlySalesChart stats={data.monthly_stats} />
           </div>
           <div className="lg:col-span-1 flex">
              <div className="w-full rounded-3xl bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl border border-[#526e9c]/20 p-8 shadow-xl flex flex-col justify-center items-center text-center relative overflow-hidden group">
                 {/* Fancy background glow */}
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#18adf2]/10 rounded-full blur-3xl group-hover:bg-[#18adf2]/20 transition-all" />
                 <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#221ab7]/10 rounded-full blur-3xl group-hover:bg-[#221ab7]/20 transition-all" />

                 <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#221ab7]/20 to-[#18adf2]/20 flex items-center justify-center mb-6 border border-[#18adf2]/20 relative z-10">
                    <span className="text-4xl group-hover:scale-110 transition-transform duration-300">🚀</span>
                 </div>
                 <h3 className="text-xl font-black text-[#0F172A] dark:text-white mb-3 relative z-10 tracking-tight">Passez à la vitesse <span className="text-[#18adf2]">supérieure</span></h3>
                 <p className="text-[#526e9c] text-sm mb-8 max-w-[200px] relative z-10">Automatisez vos relances et encaissez vos factures 2x plus vite.</p>
                 <button className="w-full py-3.5 rounded-xl border-2 border-[#18adf2]/30 text-[#18adf2] font-bold hover:bg-[#18adf2]/10 transition-colors relative z-10">
                    Découvrir l'offre Pro
                 </button>
              </div>
           </div>
        </div>

        <RecentInvoices invoices={data.recent_activity} />
      </div>
    </>
  );
}
