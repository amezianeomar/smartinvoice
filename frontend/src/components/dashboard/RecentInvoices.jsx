import React from 'react';
import { MoreHorizontal, FileText } from 'lucide-react';

export default function RecentInvoices() {
  const invoices = [
    { id: "FAC-2026-001", client: "Nexus Tech IT", date: "12 Avr 2026", montant: "12 500,00 MAD", status: "Payée" },
    { id: "FAC-2026-002", client: "Groupe OCP", date: "10 Avr 2026", montant: "450 000,00 MAD", status: "Payée" },
    { id: "FAC-2026-003", client: "Maroc Telecom", date: "05 Avr 2026", montant: "24 300,00 MAD", status: "En attente" },
    { id: "FAC-2026-004", client: "Agence Digitale", date: "28 Mar 2026", montant: "8 400,00 MAD", status: "En retard" },
    { id: "FAC-2026-005", client: "Startup XYZ", date: "15 Mar 2026", montant: "15 000,00 MAD", status: "Payée" },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Payée": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "En attente": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "En retard": return "bg-red-500/10 text-red-500 border-red-500/20";
      default: return "bg-[#526e9c]/10 text-[#526e9c] border-[#526e9c]/20";
    }
  };

  return (
    <div className="rounded-3xl bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl border border-[#526e9c]/20 p-6 md:p-8 shadow-xl relative overflow-hidden">
      {/* Mesh glow */}
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-[#221ab7]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div>
           <h3 className="text-xl font-black text-[#0F172A] dark:text-white tracking-tight">Factures Récentes</h3>
           <p className="text-[#526e9c] text-sm">Les 5 dernières factures générées</p>
        </div>
        <button className="text-sm font-bold text-[#18adf2] hover:text-[#221ab7] transition-colors bg-[#18adf2]/10 hover:bg-[#18adf2]/20 px-4 py-2 rounded-xl">
          Voir tout
        </button>
      </div>

      <div className="overflow-x-auto relative z-10">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-[#526e9c]/20 text-[11px] uppercase tracking-widest text-[#526e9c]">
              <th className="pb-4 font-bold pl-2">N° Facture</th>
              <th className="pb-4 font-bold">Client</th>
              <th className="pb-4 font-bold">Date</th>
              <th className="pb-4 font-bold">Montant</th>
              <th className="pb-4 font-bold">Statut</th>
              <th className="pb-4 font-bold text-right pr-2">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#526e9c]/10">
            {invoices.map((invoice, index) => (
              <tr key={index} className="hover:bg-white/40 dark:hover:bg-white/5 transition-colors group">
                <td className="py-4 pl-2">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#526e9c]/10 flex items-center justify-center text-[#526e9c] group-hover:bg-[#18adf2]/10 group-hover:text-[#18adf2] transition-colors">
                         <FileText size={18} />
                      </div>
                      <span className="font-bold text-[#0F172A] dark:text-white">{invoice.id}</span>
                   </div>
                </td>
                <td className="py-4 text-[#526e9c] font-medium">{invoice.client}</td>
                <td className="py-4 text-[#526e9c] text-sm">{invoice.date}</td>
                <td className="py-4 font-black text-[#0F172A] dark:text-white">{invoice.montant}</td>
                <td className="py-4">
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${getStatusStyle(invoice.status)}`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="py-4 text-right pr-2">
                  <button className="p-2 text-[#526e9c] hover:text-[#18adf2] hover:bg-[#18adf2]/10 rounded-xl transition-colors inline-block">
                    <MoreHorizontal size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
