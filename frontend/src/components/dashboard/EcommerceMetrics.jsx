import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight, TrendingUp, AlertCircle, Banknote, DollarSign, ArrowRight } from 'lucide-react';

export default function EcommerceMetrics({ stats }) {
  const metrics = [
    {
      title: "Chiffre d'Affaires",
      value: `${(stats?.total_revenue || 0).toLocaleString('fr-MA')} MAD`,
      change: "+12.5%",
      isPositive: true,
      icon: <TrendingUp size={24} className="text-[#18adf2]" />,
      bgIcon: "bg-[#18adf2]/10",
      path: "/dashboard/statistiques"
    },
    {
      title: "Factures Totales",
      value: stats?.invoice_count || 0,
      change: "+5.2%",
      isPositive: true,
      icon: <Banknote size={24} className="text-[#221ab7]" />,
      bgIcon: "bg-[#221ab7]/10",
      path: "/dashboard/factures"
    },
    {
      title: "En attente de paiement",
      value: `${(stats?.pending_amount || 0).toLocaleString('fr-MA')} MAD`,
      change: "-2.4%",
      isPositive: false,
      icon: <AlertCircle size={24} className="text-amber-500" />,
      bgIcon: "bg-amber-500/10",
      path: "/dashboard/factures?filter=attente"
    },
    {
      title: "Solde Net Réel",
      value: `${((stats?.total_revenue || 0) - (stats?.pending_amount || 0)).toLocaleString('fr-MA')} MAD`,
      change: "+8.2%",
      isPositive: true,
      icon: <DollarSign size={24} className="text-emerald-500" />,
      bgIcon: "bg-emerald-500/10",
      path: "/dashboard/paiements"
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
      {metrics.map((item, index) => {
        const isBadMetric = item.title === 'Factures en Retard';
        const changeClass = item.isPositive 
            ? (isBadMetric ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500') 
            : (isBadMetric ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500');

        return (
          <Link to={item.path || "#"} key={index} className="block rounded-3xl bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl border border-[#526e9c]/20 p-6 shadow-xl group hover:border-[#18adf2]/50 hover:shadow-2xl hover:-translate-y-1 cursor-pointer transition-all duration-300 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#18adf2]/0 rounded-full blur-3xl group-hover:bg-[#18adf2]/10 transition-all duration-500 pointer-events-none" />

            <div className="flex justify-between items-start relative z-10 mb-6">
                <div className={`flex items-center justify-center w-14 h-14 rounded-2xl ${item.bgIcon} group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <div className={`flex items-center gap-1 text-sm font-bold px-2.5 py-1 rounded-lg ${changeClass}`}>
                  {item.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {item.change}
                </div>
            </div>

            <div className="relative z-10">
              <span className="text-[11px] font-bold text-[#526e9c] uppercase tracking-wider block group-hover:text-[#18adf2] transition-colors duration-300">
                {item.title}
              </span>
              <h4 className="block w-full whitespace-nowrap text-3xl font-black text-[#0F172A] dark:text-white tracking-tight mt-2">
                {item.value}
              </h4>
            </div>

            <div className="mt-4 pt-4 border-t border-[#526e9c]/10 flex items-center gap-2 text-xs font-bold text-[#526e9c] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:text-[#18adf2] transition-all duration-300 relative z-10">
               <span>Voir détails</span>
               <ArrowRight size={14} />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
