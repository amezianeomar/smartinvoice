import React from 'react';

export default function MonthlySalesChart() {
  const chartData = [
    { month: 'Oct', sent: 120, paid: 90 },
    { month: 'Nov', sent: 150, paid: 130 },
    { month: 'Dec', sent: 110, paid: 85 },
    { month: 'Jan', sent: 180, paid: 160 },
    { month: 'Fev', sent: 220, paid: 110 },
    { month: 'Mar', sent: 240, paid: 200 },
  ];

  const maxValue = 250;

  return (
    <div className="w-full h-full rounded-3xl bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl border border-[#526e9c]/20 p-6 md:p-8 shadow-xl flex flex-col relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#18adf2]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 relative z-10">
        <div>
           <h3 className="text-xl font-black text-[#0F172A] dark:text-white tracking-tight">Flux de Trésorerie (6 Mois)</h3>
           <p className="text-[#526e9c] text-sm">Factures Envoyées vs Factures Payées</p>
        </div>
        <div className="flex items-center gap-4 text-sm font-bold bg-[#526e9c]/5 px-4 py-2 rounded-xl border border-[#526e9c]/10">
           <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#18adf2] shadow-[0_0_8px_rgba(24,173,242,0.6)]"></div>
              <span className="text-[#526e9c] dark:text-gray-300">Envoyées</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#221ab7] shadow-[0_0_8px_rgba(34,26,183,0.6)]"></div>
              <span className="text-[#526e9c] dark:text-gray-300">Payées</span>
           </div>
        </div>
      </div>

      <div className="flex-1 flex items-end justify-between relative min-h-[200px] mt-4 z-10">
         {/* Background Grid Lines */}
         <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-[30px] z-0">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-full border-t border-[#526e9c]/10 border-dashed"></div>
            ))}
         </div>

         {/* Bars */}
         {chartData.map((data, index) => {
            const hSent = (data.sent / maxValue) * 100;
            const hPaid = (data.paid / maxValue) * 100;
            return (
              <div key={index} className="relative flex-1 flex justify-center items-end group h-full pb-[30px] z-10 w-full pl-2">
                 <div className="flex items-end gap-1 sm:gap-2 w-full max-w-[50px] mx-auto h-full justify-center">
                    {/* Bar 1: Sent */}
                    <div 
                      className="relative group/bar w-1/2 max-w-[20px] bg-[#18adf2]/20 hover:bg-[#18adf2] rounded-t-lg transition-all duration-300 border border-[#18adf2]/10 hover:border-[#18adf2]" 
                      style={{ height: `${hSent}%` }}
                    >
                       <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/bar:opacity-100 bg-[#0F172A] text-white text-xs font-bold py-1.5 px-2.5 rounded-lg whitespace-nowrap transition-opacity pointer-events-none shadow-xl z-20">
                          {data.sent}K MAD
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#0F172A]"></div>
                       </div>
                    </div>
                    {/* Bar 2: Paid */}
                    <div 
                      className="relative group/bar w-1/2 max-w-[20px] bg-gradient-to-t from-[#221ab7] to-[#18adf2] hover:opacity-80 rounded-t-lg transition-all duration-300 shadow-[0_0_15px_rgba(34,26,183,0.4)]" 
                      style={{ height: `${hPaid}%` }}
                    >
                       <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/bar:opacity-100 bg-[#0F172A] text-white text-xs font-bold py-1.5 px-2.5 rounded-lg whitespace-nowrap transition-opacity pointer-events-none shadow-xl z-20">
                          {data.paid}K MAD
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#0F172A]"></div>
                       </div>
                    </div>
                 </div>
                 {/* X Axis Label */}
                 <div className="absolute bottom-0 text-[#526e9c] text-xs font-bold uppercase tracking-widest">{data.month}</div>
              </div>
            );
         })}
      </div>
    </div>
  );
}
