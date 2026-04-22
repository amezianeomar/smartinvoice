import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Edit2, Trash2, Eye, FileText, CheckCircle, Clock, AlertCircle, Plus } from 'lucide-react';
import { EmptyState, TableSkeleton } from '../components/ui/States';

export default function FacturesList() {
  const [searchTerm, setSearchTerm] = useState("");

  const invoices = [
    { id: "FAC-2026-001", client: "Nexus Tech IT", date: "12 Avr 2026", echeance: "12 Mai 2026", montant: "12 500,00 MAD", status: "Payée" },
    { id: "FAC-2026-002", client: "Groupe OCP", date: "10 Avr 2026", echeance: "10 Mai 2026", montant: "450 000,00 MAD", status: "Payée" },
    { id: "FAC-2026-003", client: "Maroc Telecom", date: "05 Avr 2026", echeance: "05 Mai 2026", montant: "24 300,00 MAD", status: "En attente" },
    { id: "FAC-2026-004", client: "Agence Digitale", date: "28 Mar 2026", echeance: "28 Avr 2026", montant: "8 400,00 MAD", status: "En retard" },
    { id: "FAC-2026-005", client: "Startup XYZ", date: "15 Mar 2026", echeance: "15 Avr 2026", montant: "15 000,00 MAD", status: "Payée" },
    { id: "FAC-2026-006", client: "Royal Air Maroc", date: "02 Mar 2026", echeance: "02 Avr 2026", montant: "89 000,00 MAD", status: "En attente" },
  ];

  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading then empty state or data
  useEffect(() => {
     const timer = setTimeout(() => {
        setIsLoading(false);
     }, 2000); // 2 second skeleton presentation
     return () => clearTimeout(timer);
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Payée": return { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-emerald-500/20", icon: <CheckCircle size={14} /> };
      case "En attente": return { bg: "bg-amber-500/10", text: "text-amber-500", border: "border-amber-500/20", icon: <Clock size={14} /> };
      case "En retard": return { bg: "bg-red-500/10", text: "text-red-500", border: "border-red-500/20", icon: <AlertCircle size={14} /> };
      default: return { bg: "bg-[#526e9c]/10", text: "text-[#526e9c]", border: "border-[#526e9c]/20" };
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h1 className="text-3xl font-black text-[#0F172A] dark:text-white mb-1 tracking-tight">Mes Factures</h1>
            <p className="text-[#526e9c] text-sm font-medium">Gérez, filtrez et exportez toutes vos factures envoyées.</p>
         </div>
      </div>

      <div className="rounded-3xl bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl border border-[#526e9c]/20 shadow-xl overflow-hidden flex flex-col min-h-[600px]">
        {/* Toolbar */}
        <div className="p-4 md:p-6 border-b border-[#526e9c]/10 gap-4 flex flex-col md:flex-row justify-between items-center bg-white/30 dark:bg-black/10">
          <div className="relative w-full md:w-96 group">
             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#526e9c] transition-colors group-focus-within:text-[#18adf2]"><Search size={18} /></span>
             <input type="text" placeholder="Rechercher par N°, Client..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white/50 dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white placeholder-[#526e9c]/70 focus:ring-2 focus:ring-[#18adf2]/50 focus:border-[#18adf2] transition-all outline-none" />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
             <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white dark:bg-[#0F172A]/50 text-[#526e9c] hover:text-[#0F172A] dark:hover:text-white transition-colors text-sm font-bold shadow-sm">
                <Filter size={18} /> Filtrer
             </button>
             <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#18adf2]/30 bg-[#18adf2]/10 text-[#18adf2] hover:bg-[#18adf2]/20 transition-colors text-sm font-bold shadow-sm">
                <Download size={18} /> Exporter (CSV)
             </button>
          </div>
        </div>

        {/* Data Table Area */}
        <div className="overflow-x-auto flex-1 flex flex-col">
          {isLoading ? (
             <TableSkeleton />
          ) : invoices.length === 0 ? (
             <div className="flex-1 flex items-center justify-center">
                <EmptyState 
                   icon={FileText} 
                   title="Aucune Facture" 
                   description="Vous n'avez pas encore généré de factures. Commencez à facturer vos clients dès maintenant." 
                   actionText="Nouvelle Facture"
                   actionIcon={Plus}
                />
             </div>
          ) : (
          <table className="w-full text-left whitespace-nowrap min-w-[900px]">
             <thead>
                <tr className="bg-[#526e9c]/5 text-[11px] uppercase tracking-widest text-[#526e9c] border-b border-[#526e9c]/20">
                   <th className="px-6 py-4 font-bold">N° Facture</th>
                   <th className="px-6 py-4 font-bold">Client</th>
                   <th className="px-6 py-4 font-bold">Création</th>
                   <th className="px-6 py-4 font-bold">Échéance</th>
                   <th className="px-6 py-4 font-bold">Montant TTC</th>
                   <th className="px-6 py-4 font-bold">Statut</th>
                   <th className="px-6 py-4 font-bold text-center">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-[#526e9c]/10">
                {invoices.map((inv, idx) => {
                   const status = getStatusStyle(inv.status);
                   return (
                      <tr key={idx} className="hover:bg-[#526e9c]/5 transition-colors group">
                         <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-xl bg-[#526e9c]/10 flex items-center justify-center text-[#526e9c] group-hover:bg-[#18adf2]/10 group-hover:text-[#18adf2] transition-colors"><FileText size={18}/></div>
                               <span className="font-bold text-[#0F172A] dark:text-white truncate">{inv.id}</span>
                            </div>
                         </td>
                         <td className="px-6 py-4 text-[#526e9c] font-medium">{inv.client}</td>
                         <td className="px-6 py-4 text-[#526e9c] text-sm">{inv.date}</td>
                         <td className="px-6 py-4 text-[#526e9c] text-sm">{inv.echeance}</td>
                         <td className="px-6 py-4 font-black text-[#0F172A] dark:text-white">{inv.montant}</td>
                         <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border ${status.bg} ${status.text} ${status.border}`}>
                               {status.icon} {inv.status}
                            </span>
                         </td>
                         <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                               <button className="p-2 text-[#526e9c] hover:bg-[#221ab7]/10 hover:text-[#221ab7] rounded-lg transition-colors" title="Visualiser"><Eye size={18} /></button>
                               <button className="p-2 text-[#526e9c] hover:bg-emerald-500/10 hover:text-emerald-500 rounded-lg transition-colors" title="Télécharger PDF"><Download size={18} /></button>
                               <button className="p-2 text-[#526e9c] hover:bg-[#18adf2]/10 hover:text-[#18adf2] rounded-lg transition-colors" title="Éditer"><Edit2 size={18} /></button>
                               <button className="p-2 text-[#526e9c] hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors" title="Supprimer"><Trash2 size={18} /></button>
                            </div>
                         </td>
                      </tr>
                   );
                })}
             </tbody>
          </table>
          )}
        </div>
        
        {/* Pagination */}
        {!isLoading && invoices.length > 0 && (
        <div className="p-4 border-t border-[#526e9c]/10 flex items-center justify-between text-sm text-[#526e9c]">
           <span>Affichant 1 à {invoices.length} sur {invoices.length} factures</span>
           <div className="flex gap-2">
              <button className="px-3 py-1 rounded-md border border-[#526e9c]/20 hover:bg-[#526e9c]/10 transition-colors" disabled>Précédent</button>
              <button className="px-3 py-1 rounded-md border border-[#526e9c]/20 bg-[#18adf2]/10 text-[#18adf2] font-bold">1</button>
              <button className="px-3 py-1 rounded-md border border-[#526e9c]/20 hover:bg-[#526e9c]/10 transition-colors" disabled>Suivant</button>
           </div>
        </div>
        )}

      </div>
    </div>
  );
}
