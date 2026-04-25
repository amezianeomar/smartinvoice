import React, { useMemo, useState } from 'react';
import { Search, UserPlus, Mail, Phone, MapPin, MoreHorizontal, Building2, Users, Loader2 } from 'lucide-react';
import { EmptyState, TableSkeleton } from '../components/ui/States';
import useClients from '../hooks/useClients';

export default function ClientsList() {
   const [searchTerm, setSearchTerm] = useState('');
   const [showCreateForm, setShowCreateForm] = useState(false);
   const [isSaving, setIsSaving] = useState(false);
   const [createError, setCreateError] = useState('');
   const [form, setForm] = useState({
      nom: '',
      email: '',
      telephone: '',
      adresse: '',
   });

   const { clients, isLoading, error, createClient } = useClients();

   const filteredClients = useMemo(() => {
      const q = searchTerm.trim().toLowerCase();
      if (!q) {
         return clients;
      }

      return clients.filter((client) => {
         return [client.nom, client.email, client.telephone, client.adresse]
            .filter(Boolean)
            .some((value) => String(value).toLowerCase().includes(q));
      });
   }, [clients, searchTerm]);

   const handleCreateClient = async (event) => {
      event.preventDefault();

      if (!form.nom.trim()) {
         setCreateError('Le nom du client est obligatoire.');
         return;
      }

      setIsSaving(true);
      setCreateError('');

      try {
         await createClient({
            nom: form.nom.trim(),
            email: form.email.trim() || null,
            telephone: form.telephone.trim() || null,
            adresse: form.adresse.trim() || null,
         });

         setForm({ nom: '', email: '', telephone: '', adresse: '' });
         setShowCreateForm(false);
      } catch (err) {
         setCreateError(err.response?.data?.message || 'Impossible de creer ce client.');
      } finally {
         setIsSaving(false);
      }
   };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h1 className="text-3xl font-black text-[#0F172A] dark:text-white mb-1 tracking-tight">Mes Clients</h1>
            <p className="text-[#526e9c] text-sm font-medium">Annuaire de vos clients B2B, informations légales et contacts.</p>
         </div>
             <button
                  type="button"
                  onClick={() => setShowCreateForm((prev) => !prev)}
                  className="bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] px-5 py-2.5 rounded-xl font-bold shadow-lg hover:bg-[#221ab7] dark:hover:bg-[#18adf2] transition-colors flex items-center gap-2"
             >
            <UserPlus size={18} /> Nouveau Client
         </button>
      </div>

         {showCreateForm && (
            <form
               onSubmit={handleCreateClient}
               className="mb-6 rounded-2xl border border-[#526e9c]/20 bg-white/70 dark:bg-[#131B2C]/70 p-4 md:p-6"
            >
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                     type="text"
                     placeholder="Nom du client"
                     value={form.nom}
                     onChange={(e) => setForm((prev) => ({ ...prev, nom: e.target.value }))}
                     className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white placeholder-[#526e9c]/70 focus:ring-2 focus:ring-[#18adf2]/50 focus:border-[#18adf2] transition-all outline-none"
                  />
                  <input
                     type="email"
                     placeholder="Email"
                     value={form.email}
                     onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                     className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white placeholder-[#526e9c]/70 focus:ring-2 focus:ring-[#18adf2]/50 focus:border-[#18adf2] transition-all outline-none"
                  />
                  <input
                     type="text"
                     placeholder="Telephone"
                     value={form.telephone}
                     onChange={(e) => setForm((prev) => ({ ...prev, telephone: e.target.value }))}
                     className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white placeholder-[#526e9c]/70 focus:ring-2 focus:ring-[#18adf2]/50 focus:border-[#18adf2] transition-all outline-none"
                  />
                  <input
                     type="text"
                     placeholder="Adresse"
                     value={form.adresse}
                     onChange={(e) => setForm((prev) => ({ ...prev, adresse: e.target.value }))}
                     className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white placeholder-[#526e9c]/70 focus:ring-2 focus:ring-[#18adf2]/50 focus:border-[#18adf2] transition-all outline-none"
                  />
               </div>

               {createError && <p className="mt-3 text-sm text-red-500">{createError}</p>}

               <div className="mt-4 flex justify-end gap-3">
                  <button
                     type="button"
                     onClick={() => setShowCreateForm(false)}
                     className="px-4 py-2.5 rounded-xl font-bold text-[#526e9c] bg-[#526e9c]/10 hover:bg-[#526e9c]/20 transition-colors"
                  >
                     Annuler
                  </button>
                  <button
                     type="submit"
                     disabled={isSaving}
                     className="px-4 py-2.5 rounded-xl font-bold text-white bg-[#0F172A] hover:bg-[#221ab7] transition-colors disabled:opacity-60 flex items-center gap-2"
                  >
                     {isSaving && <Loader2 size={16} className="animate-spin" />} Ajouter
                  </button>
               </div>
            </form>
         )}

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
          ) : error ? (
             <div className="p-6 text-red-500 text-sm font-medium">{error}</div>
          ) : filteredClients.length === 0 ? (
             <div className="flex-1 flex items-center justify-center">
                <EmptyState 
                   icon={Users} 
                   title="Aucun Client Trouve" 
                   description="Aucun resultat ne correspond a votre recherche. Ajoutez un client ou modifiez le filtre." 
                   actionText="Ajouter un Client"
                   actionIcon={UserPlus}
                />
             </div>
          ) : (
          <table className="w-full text-left whitespace-nowrap min-w-[1000px]">
             <thead>
                <tr className="bg-[#526e9c]/5 text-[11px] uppercase tracking-widest text-[#526e9c] border-b border-[#526e9c]/20">
                   <th className="px-6 py-4 font-bold">Entreprise</th>
                   <th className="px-6 py-4 font-bold">Email</th>
                   <th className="px-6 py-4 font-bold">Telephone</th>
                   <th className="px-6 py-4 font-bold">Adresse</th>
                   <th className="px-6 py-4 font-bold text-center">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-[#526e9c]/10">
                {filteredClients.map((cli) => (
                   <tr key={cli.id} className="hover:bg-[#526e9c]/5 transition-colors group">
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
                      <td className="px-6 py-4 text-[#526e9c] text-sm">
                         <span className="flex items-center gap-1.5"><Mail size={13}/> {cli.email || '-'}</span>
                      </td>
                      <td className="px-6 py-4 text-[#526e9c] text-sm">
                         <span className="flex items-center gap-1.5"><Phone size={13}/> {cli.telephone || '-'}</span>
                      </td>
                      <td className="px-6 py-4 text-[#526e9c] text-sm max-w-xs truncate">
                         <span className="flex items-center gap-1.5"><MapPin size={13}/> {cli.adresse || '-'}</span>
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
