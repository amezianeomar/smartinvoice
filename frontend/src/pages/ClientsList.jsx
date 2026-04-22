import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Mail, Phone, MapPin, MoreHorizontal, Building2, Users } from 'lucide-react';
import { EmptyState, TableSkeleton } from '../components/ui/States';

export default function ClientsList() {
  const [searchTerm, setSearchTerm] = useState("");

  // We mock empty clients to demonstrate the animated Empty State!
  const clients = [];

  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading then empty state
  useEffect(() => {
     const timer = setTimeout(() => {
        setIsLoading(false);
     }, 2000); // 2 second skeleton presentation
     return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h1 className="text-3xl font-black text-[#0F172A] dark:text-white mb-1 tracking-tight">Mes Clients</h1>
            <p className="text-[#526e9c] text-sm font-medium">Annuaire de vos clients B2B, informations légales et contacts.</p>
         </div>
         <button className="bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] px-5 py-2.5 rounded-xl font-bold shadow-lg hover:bg-[#221ab7] dark:hover:bg-[#18adf2] transition-colors flex items-center gap-2">
            <UserPlus size={18} /> Nouveau Client
         </button>
      </div>

      <div className="rounded-3xl bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl border border-[#526e9c]/20 shadow-xl overflow-hidden min-h-[600px] flex flex-col">
        {/* Toolbar */}
        <div className="p-4 md:p-6 border-b border-[#526e9c]/10 gap-4 flex justify-between items-center bg-white/30 dark:bg-black/10">
          <div className="relative w-full md:w-96 group">
             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#526e9c] transition-colors group-focus-within:text-[#18adf2]"><Search size={18} /></span>
             <input type="text" placeholder="Rechercher par Entreprise, ICE, Contact..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white/50 dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white placeholder-[#526e9c]/70 focus:ring-2 focus:ring-[#18adf2]/50 focus:border-[#18adf2] transition-all outline-none" />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto flex-1 flex flex-col">
          {isLoading ? (
             <TableSkeleton />
          ) : clients.length === 0 ? (
             <div className="flex-1 flex items-center justify-center">
                <EmptyState 
                   icon={Users} 
                   title="Aucun Client" 
                   description="Votre base de données clients est vide. Ajoutez votre premier client pour commencer." 
                   actionText="Ajouter un Client"
                   actionIcon={UserPlus}
                />
             </div>
          ) : (
          <table className="w-full text-left whitespace-nowrap min-w-[1000px]">
             <thead>
                <tr className="bg-[#526e9c]/5 text-[11px] uppercase tracking-widest text-[#526e9c] border-b border-[#526e9c]/20">
                   <th className="px-6 py-4 font-bold">Entreprise</th>
                   <th className="px-6 py-4 font-bold">Contact Principal</th>
                   <th className="px-6 py-4 font-bold">Informations Légales</th>
                   <th className="px-6 py-4 font-bold">C.A. Généré</th>
                   <th className="px-6 py-4 font-bold">Statut</th>
                   <th className="px-6 py-4 font-bold text-center">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-[#526e9c]/10">
                {clients.map((cli, idx) => (
                   <tr key={idx} className="hover:bg-[#526e9c]/5 transition-colors group">
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#221ab7]/10 to-[#18adf2]/10 border border-[#18adf2]/20 flex items-center justify-center text-[#221ab7] dark:text-[#18adf2]">
                               <Building2 size={20}/>
                            </div>
                            <div>
                               <span className="font-bold text-[#0F172A] dark:text-white block">{cli.nom}</span>
                               <span className="text-[10px] text-[#526e9c] uppercase">{cli.id}</span>
                            </div>
                         </div>
                      </td>
                      <td className="px-6 py-4">
                         <span className="text-[#0F172A] dark:text-white font-medium block">{cli.contact}</span>
                         <div className="flex items-center gap-3 mt-1 text-[#526e9c]">
                            <span className="flex items-center gap-1 text-xs"><Mail size={12}/> {cli.email}</span>
                            <span className="flex items-center gap-1 text-xs"><Phone size={12}/> {cli.tel}</span>
                         </div>
                      </td>
                      <td className="px-6 py-4 text-[#526e9c] text-xs space-y-1">
                         <div className="flex items-center gap-2"><span className="font-bold w-6">ICE</span><span>{cli.ice}</span></div>
                         <div className="flex items-center gap-2"><span className="font-bold w-6">RC</span><span>{cli.rc}</span></div>
                      </td>
                      <td className="px-6 py-4 font-black text-[#0F172A] dark:text-white">{cli.ca}</td>
                      <td className="px-6 py-4">
                         <span className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-full ${cli.status === 'Actif' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-[#526e9c]/10 text-[#526e9c]'}`}>
                            {cli.status}
                         </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                         <button className="p-2 text-[#526e9c] hover:bg-[#18adf2]/10 hover:text-[#18adf2] rounded-lg transition-colors inline-block" title="Plus d'actions">
                            <MoreHorizontal size={20} />
                         </button>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
          )}
        </div>
        
      </div>
    </div>
  );
}
