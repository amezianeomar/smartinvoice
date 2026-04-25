import React, { useMemo, useState } from 'react';
import { Search, Filter, Download, FileText, CheckCircle, Clock, AlertCircle, Plus } from 'lucide-react';
import { EmptyState, TableSkeleton } from '../components/ui/States';
import useInvoices from '../hooks/useInvoices';
import InvoiceActions from '../components/invoices/InvoiceActions';

export default function FacturesList() {
   const [searchTerm, setSearchTerm] = useState('');
   const [activeStatus, setActiveStatus] = useState('all');
   const [feedback, setFeedback] = useState('');
   const [busyInvoiceId, setBusyInvoiceId] = useState(null);

   const {
      invoices,
      isLoading,
      error,
      deleteInvoice,
      downloadInvoicePdf,
      sendInvoiceEmail,
   } = useInvoices();

   const normalizedStatus = (statut) => {
      const value = String(statut || '').toLowerCase();
      if (value === 'payee' || value === 'payée') return 'payee';
      if (value === 'envoyee' || value === 'envoyée') return 'envoyee';
      if (value === 'brouillon') return 'brouillon';
      return value;
   };

   const filteredInvoices = useMemo(() => {
      const q = searchTerm.trim().toLowerCase();

      return invoices.filter((invoice) => {
         const statusKey = normalizedStatus(invoice.statut);
         const statusOk = activeStatus === 'all' ? true : statusKey === activeStatus;
         const textOk = !q
            ? true
            : [invoice.numero, invoice.client?.nom, invoice.statut]
                  .filter(Boolean)
                  .some((value) => String(value).toLowerCase().includes(q));

         return statusOk && textOk;
      });
   }, [invoices, searchTerm, activeStatus]);

   const formatDate = (date) => {
      if (!date) return '-';
      return new Date(date).toLocaleDateString('fr-FR');
   };

   const formatMoney = (amount) => {
      const n = Number(amount || 0);
      return `${n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MAD`;
   };

   const handleDownload = async (invoice) => {
      setBusyInvoiceId(invoice.id);
      setFeedback('');

      try {
         await downloadInvoicePdf(invoice);
         setFeedback(`PDF de ${invoice.numero} telecharge.`);
      } catch (err) {
         setFeedback(err.response?.data?.message || 'Echec du telechargement PDF.');
      } finally {
         setBusyInvoiceId(null);
      }
   };

   const handleSendEmail = async (invoice) => {
      setBusyInvoiceId(invoice.id);
      setFeedback('');

      try {
         await sendInvoiceEmail(invoice.id);
         setFeedback(`Facture ${invoice.numero} envoyee par email.`);
      } catch (err) {
         setFeedback(err.response?.data?.message || 'Echec de l envoi email.');
      } finally {
         setBusyInvoiceId(null);
      }
   };

   const handleDelete = async (invoice) => {
      const shouldDelete = window.confirm(`Supprimer la facture ${invoice.numero} ?`);
      if (!shouldDelete) {
         return;
      }

      setBusyInvoiceId(invoice.id);
      setFeedback('');

      try {
         await deleteInvoice(invoice.id);
         setFeedback(`Facture ${invoice.numero} supprimee.`);
      } catch (err) {
         setFeedback(err.response?.data?.message || 'Echec de suppression.');
      } finally {
         setBusyInvoiceId(null);
      }
   };

  const getStatusStyle = (status) => {
      switch (normalizedStatus(status)) {
         case 'payee':
            return { bg: 'bg-emerald-500/10', text: 'text-emerald-500', border: 'border-emerald-500/20', icon: <CheckCircle size={14} />, label: 'Payee' };
         case 'envoyee':
            return { bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500/20', icon: <Clock size={14} />, label: 'Envoyee' };
         case 'brouillon':
            return { bg: 'bg-[#526e9c]/10', text: 'text-[#526e9c]', border: 'border-[#526e9c]/20', icon: <AlertCircle size={14} />, label: 'Brouillon' };
         default:
            return { bg: 'bg-[#526e9c]/10', text: 'text-[#526e9c]', border: 'border-[#526e9c]/20', icon: <AlertCircle size={14} />, label: status || 'N/A' };
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
             <button
                type="button"
                onClick={() => setActiveStatus((prev) => (prev === 'all' ? 'envoyee' : 'all'))}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white dark:bg-[#0F172A]/50 text-[#526e9c] hover:text-[#0F172A] dark:hover:text-white transition-colors text-sm font-bold shadow-sm"
             >
                <Filter size={18} /> Filtrer
             </button>
             <button type="button" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#18adf2]/30 bg-[#18adf2]/10 text-[#18adf2] hover:bg-[#18adf2]/20 transition-colors text-sm font-bold shadow-sm">
                <Download size={18} /> Exporter (CSV)
             </button>
          </div>
        </div>

        {(error || feedback) && (
          <div className={`px-6 py-3 text-sm font-medium ${error ? 'text-red-500' : 'text-emerald-500'}`}>
            {error || feedback}
          </div>
        )}

        {/* Data Table Area */}
        <div className="overflow-x-auto flex-1 flex flex-col">
          {isLoading ? (
             <TableSkeleton />
          ) : filteredInvoices.length === 0 ? (
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
                {filteredInvoices.map((inv) => {
                   const status = getStatusStyle(inv.statut);
                   return (
                      <tr key={inv.id} className="hover:bg-[#526e9c]/5 transition-colors group">
                         <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-xl bg-[#526e9c]/10 flex items-center justify-center text-[#526e9c] group-hover:bg-[#18adf2]/10 group-hover:text-[#18adf2] transition-colors"><FileText size={18}/></div>
                               <span className="font-bold text-[#0F172A] dark:text-white truncate">{inv.numero}</span>
                            </div>
                         </td>
                         <td className="px-6 py-4 text-[#526e9c] font-medium">{inv.client?.nom || '-'}</td>
                         <td className="px-6 py-4 text-[#526e9c] text-sm">{formatDate(inv.date_emission)}</td>
                         <td className="px-6 py-4 text-[#526e9c] text-sm">{formatDate(inv.date_echeance)}</td>
                         <td className="px-6 py-4 font-black text-[#0F172A] dark:text-white">{formatMoney(inv.total_ttc)}</td>
                         <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border ${status.bg} ${status.text} ${status.border}`}>
                               {status.icon} {status.label}
                            </span>
                         </td>
                         <td className="px-6 py-4">
                            <InvoiceActions
                              onDownload={() => handleDownload(inv)}
                              onSendEmail={() => handleSendEmail(inv)}
                              onDelete={() => handleDelete(inv)}
                              busy={busyInvoiceId === inv.id}
                            />
                         </td>
                      </tr>
                   );
                })}
             </tbody>
          </table>
          )}
        </div>
        
        {/* Pagination */}
        {!isLoading && filteredInvoices.length > 0 && (
        <div className="p-4 border-t border-[#526e9c]/10 flex items-center justify-between text-sm text-[#526e9c]">
           <span>Affichant 1 a {filteredInvoices.length} sur {invoices.length} factures</span>
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
