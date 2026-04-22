import React from 'react';
import { TrendingUp, TrendingDown, Activity, PieChart, BarChart3, ArrowUpRight } from 'lucide-react';
import MonthlySalesChart from '../components/dashboard/MonthlySalesChart';

export default function Statistiques() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="mb-6">
         <h1 className="text-3xl font-black text-[#0F172A] dark:text-white mb-1 tracking-tight">Statistiques Avancées</h1>
         <p className="text-[#526e9c] text-sm font-medium">Analysez vos performances financières et l'état de votre trésorerie.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="rounded-3xl bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl border border-[#526e9c]/20 p-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#18adf2]/10 rounded-full blur-3xl" />
            <div className="w-12 h-12 rounded-xl bg-[#18adf2]/10 flex items-center justify-center text-[#18adf2] mb-4"><TrendingUp size={24}/></div>
            <h4 className="text-sm font-bold text-[#526e9c] uppercase tracking-wider">Croissance Annuelle</h4>
            <div className="mt-2 flex items-end justify-between">
               <span className="text-3xl font-black text-[#0F172A] dark:text-white">+24.5%</span>
               <span className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md"><ArrowUpRight size={14}/> 4.2%</span>
            </div>
         </div>

         <div className="rounded-3xl bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl border border-[#526e9c]/20 p-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#221ab7]/10 rounded-full blur-3xl" />
            <div className="w-12 h-12 rounded-xl bg-[#221ab7]/10 flex items-center justify-center text-[#221ab7] mb-4"><Activity size={24}/></div>
            <h4 className="text-sm font-bold text-[#526e9c] uppercase tracking-wider">Délai Moyen de Paiement</h4>
            <div className="mt-2 flex items-end justify-between">
               <span className="text-3xl font-black text-[#0F172A] dark:text-white">18 Jours</span>
               <span className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md"><ArrowUpRight size={14}/> -2 Jours</span>
            </div>
         </div>

         <div className="rounded-3xl bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl border border-[#526e9c]/20 p-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl" />
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 mb-4"><TrendingDown size={24}/></div>
            <h4 className="text-sm font-bold text-[#526e9c] uppercase tracking-wider">Taux d'Impayés</h4>
            <div className="mt-2 flex items-end justify-between">
               <span className="text-3xl font-black text-[#0F172A] dark:text-white">3.2%</span>
               <span className="flex items-center gap-1 text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded-md"><ArrowUpRight size={14}/> +0.5%</span>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 flex min-h-[400px]">
            <MonthlySalesChart />
         </div>

         {/* Custom CSS Pie Chart representation */}
         <div className="lg:col-span-1 rounded-3xl bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl border border-[#526e9c]/20 p-6 shadow-xl flex flex-col items-center justify-center relative overflow-hidden">
            <h3 className="text-lg font-black text-[#0F172A] dark:text-white absolute top-6 left-6">Répartition Statuts</h3>
            
            <div className="relative w-48 h-48 mt-8">
               {/* Pure CSS Conic Gradient Pie Chart */}
               <div className="w-full h-full rounded-full" style={{
                  background: `conic-gradient(
                     #10b981 0% 65%, 
                     #f59e0b 65% 85%, 
                     #ef4444 85% 100%
                  )`
               }}></div>
               {/* Inner circle for donut hole */}
               <div className="absolute inset-0 m-auto w-32 h-32 bg-[#F8FAFC] dark:bg-[#080C16] rounded-full flex flex-col items-center justify-center shadow-inner">
                  <span className="text-2xl font-black text-[#0F172A] dark:text-white">342</span>
                  <span className="text-[10px] text-[#526e9c] uppercase font-bold text-center leading-tight mt-1">Factures<br/>Générées</span>
               </div>
            </div>

            <div className="w-full mt-8 space-y-3">
               <div className="flex justify-between items-center text-sm font-bold">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500"></div><span className="text-[#526e9c]">Payées</span></div>
                  <span className="text-[#0F172A] dark:text-white">65%</span>
               </div>
               <div className="flex justify-between items-center text-sm font-bold">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-500"></div><span className="text-[#526e9c]">En attente</span></div>
                  <span className="text-[#0F172A] dark:text-white">20%</span>
               </div>
               <div className="flex justify-between items-center text-sm font-bold">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div><span className="text-[#526e9c]">En retard</span></div>
                  <span className="text-[#0F172A] dark:text-white">15%</span>
               </div>
            </div>
         </div>
      </div>

      {/* New Element: Line Chart for Revenue Evolution */}
      <div className="rounded-3xl bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl border border-[#526e9c]/20 p-6 md:p-8 shadow-xl relative overflow-hidden">
         <div className="flex justify-between items-center mb-8">
            <div>
               <h3 className="text-xl font-black text-[#0F172A] dark:text-white tracking-tight">Évolution du Chiffre d'Affaires</h3>
               <p className="text-[#526e9c] text-sm">Vue globale sur les 12 derniers mois (en MAD)</p>
            </div>
            <div className="p-2 rounded-xl bg-[#526e9c]/5 font-bold text-sm text-[#0F172A] dark:text-white border border-[#526e9c]/10">
               +15% ce mois-ci
            </div>
         </div>

         <div className="w-full h-[250px] relative">
            {/* Background Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0">
               {[...Array(4)].map((_, i) => (
                 <div key={i} className="flex items-center gap-4">
                    <span className="text-xs text-[#526e9c] w-12 text-right">{(300 - i * 100)}K</span>
                    <div className="w-full border-t border-[#526e9c]/10 border-dashed"></div>
                 </div>
               ))}
               <div className="flex items-center gap-4">
                  <span className="text-xs text-[#526e9c] w-12 text-right">0K</span>
                  <div className="w-full border-t border-[#526e9c]/20"></div>
               </div>
            </div>

            {/* SVG Line Chart */}
            <div className="absolute inset-0 left-16 bottom-0 z-10 flex items-end">
               <svg 
                  className="w-full h-full overflow-visible" 
                  preserveAspectRatio="none" 
                  viewBox="0 0 1000 250"
               >
                  {/* Glow/Shadow Line */}
                  <path 
                     d="M0,200 C100,180 200,220 300,150 C400,80 500,190 600,100 C700,10 800,90 900,40 C950,20 1000,0 1000,0" 
                     fill="none" 
                     stroke="rgba(24,173,242,0.3)" 
                     strokeWidth="10" 
                     strokeLinecap="round" 
                     strokeLinejoin="round" 
                     className="transform translate-y-2 blur-sm"
                  />
                  {/* Main Line */}
                  <path 
                     d="M0,200 C100,180 200,220 300,150 C400,80 500,190 600,100 C700,10 800,90 900,40 C950,20 1000,0 1000,0" 
                     fill="none" 
                     stroke="url(#gradient-line)" 
                     strokeWidth="4" 
                     strokeLinecap="round" 
                     strokeLinejoin="round" 
                     className="drop-shadow-lg"
                  />
                  <defs>
                     <linearGradient id="gradient-line" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#221ab7" />
                        <stop offset="100%" stopColor="#18adf2" />
                     </linearGradient>
                  </defs>

                  {/* Data Points */}
                  <circle cx="300" cy="150" r="6" fill="#18adf2" stroke="#fff" strokeWidth="2" className="drop-shadow-md hover:r-[8px] transition-all cursor-pointer" />
                  <circle cx="600" cy="100" r="6" fill="#18adf2" stroke="#fff" strokeWidth="2" className="drop-shadow-md hover:r-[8px] transition-all cursor-pointer" />
                  <circle cx="900" cy="40" r="6" fill="#18adf2" stroke="#fff" strokeWidth="2" className="drop-shadow-md hover:r-[8px] transition-all cursor-pointer" />
               </svg>
            </div>
         </div>

         {/* X Axis Labels */}
         <div className="absolute bottom-2 left-16 right-0 flex justify-between px-4 text-[10px] font-bold text-[#526e9c] uppercase tracking-wider">
            <span>Jan</span>
            <span>Fev</span>
            <span>Mar</span>
            <span>Avr</span>
            <span>Mai</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aou</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
         </div>
      </div>

    </div>
  );
}
