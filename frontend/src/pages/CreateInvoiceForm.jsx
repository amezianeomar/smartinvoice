import React, { useMemo, useState } from 'react';
import { Save, X, Plus, Trash2, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useClients from '../hooks/useClients';
import useInvoices from '../hooks/useInvoices';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

function toInputDate(date) {
   const d = new Date(date);
   return d.toISOString().slice(0, 10);
}

function generateInvoiceNumber() {
   const now = new Date();
   const yyyy = now.getFullYear();
   const mm = String(now.getMonth() + 1).padStart(2, '0');
   const dd = String(now.getDate()).padStart(2, '0');
   const rand = String(Math.floor(Math.random() * 900) + 100);
   return `FAC-${yyyy}${mm}${dd}-${rand}`;
}

export default function CreateInvoiceForm() {
   const navigate = useNavigate();
   const { t } = useLanguage();
   const { clients, isLoading: isClientsLoading, error: clientsError } = useClients();
   const { createInvoice } = useInvoices();
   const { user } = useAuth();

   const defaultTva = useMemo(() => {
      if (!user?.taux_tva_defaut) return 20;
      if (user.taux_tva_defaut === 'Exonéré') return 0;
      const parsed = parseFloat(user.taux_tva_defaut);
      return isNaN(parsed) ? 20 : parsed;
   }, [user?.taux_tva_defaut]);

   const [isSubmitting, setIsSubmitting] = useState(false);
   const [submitMessage, setSubmitMessage] = useState('');
   const [submitError, setSubmitError] = useState('');
   const [form, setForm] = useState({
      client_id: '',
      numero: generateInvoiceNumber(),
      date_emission: toInputDate(new Date()),
      date_echeance: toInputDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
      statut: 'brouillon',
      notes: '',
   });
   const [items, setItems] = useState([
      {
         designation: '',
         quantite: 1,
         prix_unitaire: 0,
         taux_tva: defaultTva,
      },
   ]);

   const [showProfileModal, setShowProfileModal] = useState(false);

   const totals = useMemo(() => {
      let tva = 0;
      const subtotal = items.reduce((sum, item) => {
         const qty = Number(item.quantite) || 0;
         const price = Number(item.prix_unitaire) || 0;
         const lineTotal = qty * price;
         tva += lineTotal * ((Number(item.taux_tva) || 0) / 100);
         return sum + lineTotal;
      }, 0);

      const ttc = subtotal + tva;

      return { subtotal, tva, ttc };
   }, [items]);

   const formatMoney = (value) => {
      return `${Number(value || 0).toLocaleString('fr-FR', {
         minimumFractionDigits: 2,
         maximumFractionDigits: 2,
      })} MAD`;
   };

   const handleAddItem = () => {
      setItems((prev) => [
         ...prev,
         { designation: '', quantite: 1, prix_unitaire: 0, taux_tva: defaultTva },
      ]);
   };

   const handleRemoveItem = (index) => {
      setItems((prev) => {
         if (prev.length === 1) {
            return prev;
         }
         return prev.filter((_, i) => i !== index);
      });
   };

   const handleItemChange = (index, field, value) => {
      setItems((prev) =>
         prev.map((item, i) => {
            if (i !== index) {
               return item;
            }
            return {
               ...item,
               [field]: field === 'designation' ? value : Number(value),
            };
         })
      );
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      setSubmitError('');
      setSubmitMessage('');

      const validItems = items.filter((item) => item.designation.trim() && Number(item.quantite) > 0);

      if (!form.client_id) {
         setSubmitError(t('createInvoice.errNoClient'));
         return;
      }

      if (validItems.length === 0) {
         setSubmitError(t('createInvoice.errNoItem'));
         return;
      }

      setIsSubmitting(true);

      try {
         const payload = {
            client_id: Number(form.client_id),
            numero: form.numero.trim(),
            date_emission: form.date_emission,
            date_echeance: form.date_echeance,
            statut: form.statut,
            notes: form.notes.trim(),
            items: validItems.map((item) => ({
               designation: item.designation.trim(),
               quantite: Number(item.quantite),
               prix_unitaire: Number(item.prix_unitaire),
               taux_tva: Number(item.taux_tva),
            })),
         };

         await createInvoice(payload);
         setSubmitMessage(t('createInvoice.successMsg'));
         setTimeout(() => navigate('/dashboard/factures'), 900);
      } catch (err) {
         if (err.response?.data?.error_code === 'INCOMPLETE_PROFILE') {
            setShowProfileModal(true);
            return;
         }

         const apiMessage = err.response?.data?.message;
         const details = err.response?.data?.errors || err.response?.data?.data;
         if (details && typeof details === 'object') {
            const firstError = Object.values(details)[0];
            if (Array.isArray(firstError) && firstError[0]) {
               setSubmitError(firstError[0]);
            } else {
               setSubmitError(apiMessage || t('createInvoice.errCreate'));
            }
         } else {
            setSubmitError(apiMessage || t('createInvoice.errCreate'));
         }
      } finally {
         setIsSubmitting(false);
      }
   };

  return (
    <div className="max-w-4xl mx-auto">
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
           <div className="bg-white dark:bg-[#0F172A] border border-red-500/30 shadow-2xl rounded-3xl p-8 max-w-md w-full animate-in fade-in zoom-in duration-200">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6 mx-auto">
                 <X size={32} className="text-red-500" />
              </div>
              <h2 className="text-2xl font-black text-center text-[#0F172A] dark:text-white mb-4">{t('modals.incompleteProfile.title')}</h2>
              <p className="text-center text-[#526e9c] mb-8">
                 {t('modals.incompleteProfile.message')}
              </p>
              <div className="flex gap-4">
                 <button onClick={() => setShowProfileModal(false)} className="flex-1 py-3 px-4 rounded-xl font-bold text-[#526e9c] bg-[#526e9c]/10 hover:bg-[#526e9c]/20 transition-colors">
                    {t('modals.incompleteProfile.closeBtn')}
                 </button>
                 <button onClick={() => navigate('/dashboard/parametres')} className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#221ab7] to-[#18adf2] shadow-[0_0_20px_rgba(24,173,242,0.3)] hover:-translate-y-1 transition-all">
                    {t('modals.incompleteProfile.settingsBtn')}
                 </button>
              </div>
           </div>
        </div>
      )}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h1 className="text-3xl font-black text-[#0F172A] dark:text-white mb-1 tracking-tight">{t('createInvoice.title')}</h1>
            <p className="text-[#526e9c] text-sm font-medium">{t('createInvoice.subtitle')}</p>
         </div>
      </div>

      <div className="rounded-3xl bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl border border-[#526e9c]/20 shadow-xl overflow-hidden">
      <form className="p-6 md:p-8 space-y-8" onSubmit={handleSubmit}>
          
          {/* Section: Client Info */}
          <div className="space-y-4">
             <h3 className="text-lg font-black text-[#0F172A] dark:text-white border-b border-[#526e9c]/10 pb-2">{t('createInvoice.clientInfo')}</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                   <label className="text-xs font-bold text-[#526e9c] uppercase tracking-wider">{t('createInvoice.selectClientLabel')}</label>
                   <select
                      value={form.client_id}
                      onChange={(e) => setForm((prev) => ({ ...prev, client_id: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 focus:border-[#18adf2] transition-all outline-none appearance-none"
                   >
                      <option value="">{t('createInvoice.selectPlaceholder')}</option>
                      {clients.map((client) => (
                        <option key={client.id} value={client.id}>{client.nom}</option>
                      ))}
                   </select>
                   {isClientsLoading && <p className="mt-1 text-xs text-[#526e9c]">{t('createInvoice.loadingClients')}</p>}
                   {clientsError && <p className="mt-1 text-xs text-red-500">{clientsError}</p>}
                </div>
                <div className="space-y-1.5">
                   <label className="text-xs font-bold text-[#526e9c] uppercase tracking-wider">{t('createInvoice.invoiceNumber')}</label>
                   <input
                     type="text"
                     value={form.numero}
                     onChange={(e) => setForm((prev) => ({ ...prev, numero: e.target.value }))}
                     className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white placeholder-[#526e9c]/50 focus:ring-2 focus:ring-[#18adf2]/50 focus:border-[#18adf2] transition-all outline-none"
                   />
                </div>
             </div>
          </div>

           {/* Section: Invoice Details */}
           <div className="space-y-4">
             <h3 className="text-lg font-black text-[#0F172A] dark:text-white border-b border-[#526e9c]/10 pb-2">{t('createInvoice.invoiceDetails')}</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1.5">
                   <label className="text-xs font-bold text-[#526e9c] uppercase tracking-wider">{t('createInvoice.issueDate')}</label>
                   <input
                     type="date"
                     value={form.date_emission}
                     onChange={(e) => setForm((prev) => ({ ...prev, date_emission: e.target.value }))}
                     className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 focus:border-[#18adf2] transition-all outline-none"
                   />
                </div>
                <div className="space-y-1.5">
                   <label className="text-xs font-bold text-[#526e9c] uppercase tracking-wider">{t('createInvoice.dueDate')}</label>
                   <input
                     type="date"
                     value={form.date_echeance}
                     onChange={(e) => setForm((prev) => ({ ...prev, date_echeance: e.target.value }))}
                     className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 focus:border-[#18adf2] transition-all outline-none"
                   />
                </div>
                <div className="space-y-1.5">
                   <label className="text-xs font-bold text-[#526e9c] uppercase tracking-wider">{t('createInvoice.status')}</label>
                   <select
                     value={form.statut}
                     onChange={(e) => setForm((prev) => ({ ...prev, statut: e.target.value }))}
                     className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 focus:border-[#18adf2] transition-all outline-none"
                   >
                     <option value="brouillon">{t('createInvoice.statusDraft')}</option>
                     <option value="envoyee">{t('createInvoice.statusSent')}</option>
                     <option value="payee">{t('createInvoice.statusPaid')}</option>
                   </select>
                </div>
             </div>
          </div>

          {/* Section: Articles */}
          <div className="space-y-4">
             <h3 className="text-lg font-black text-[#0F172A] dark:text-white border-b border-[#526e9c]/10 pb-2">{t('createInvoice.items')}</h3>
             <div className="border border-[#526e9c]/20 rounded-2xl overflow-hidden bg-white/30 dark:bg-[#080C16]/30">
                <table className="w-full text-left">
                   <thead className="bg-[#526e9c]/5 border-b border-[#526e9c]/20 text-[11px] uppercase tracking-widest text-[#526e9c]">
                     <tr>
                       <th className="p-4 font-bold w-1/2">{t('createInvoice.description')}</th>
                       <th className="p-4 font-bold w-24">{t('createInvoice.qty')}</th>
                       <th className="p-4 font-bold">{t('createInvoice.unitPrice')}</th>
                       <th className="p-4 font-bold text-right pr-4">{t('createInvoice.total')}</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-[#526e9c]/10">
                               {items.map((item, index) => {
                                  const lineTotal = (Number(item.quantite) || 0) * (Number(item.prix_unitaire) || 0);

                                  return (
                                     <tr key={index} className="hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
                                        <td className="p-4">
                                           <input
                                              type="text"
                                              placeholder={t('createInvoice.designationPlaceholder')}
                                              value={item.designation}
                                              onChange={(e) => handleItemChange(index, 'designation', e.target.value)}
                                              className="w-full px-3 py-2.5 rounded-lg border border-[#526e9c]/10 bg-white/50 dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 outline-none"
                                           />
                                        </td>
                                        <td className="p-4">
                                           <input
                                              type="number"
                                              min="1"
                                              value={item.quantite}
                                              onChange={(e) => handleItemChange(index, 'quantite', e.target.value)}
                                              className="w-full px-3 py-2.5 rounded-lg border border-[#526e9c]/10 bg-white/50 dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 outline-none text-center"
                                           />
                                        </td>
                                        <td className="p-4">
                                           <div className="relative">
                                                <input
                                                   type="number"
                                                   min="0"
                                                   step="0.01"
                                                    value={item.prix_unitaire}
                                                   onChange={(e) => handleItemChange(index, 'prix_unitaire', e.target.value)}
                                                   className="w-full pl-3 pr-10 py-2.5 rounded-lg border border-[#526e9c]/10 bg-white/50 dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 outline-none block"
                                                />
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#526e9c]">MAD</span>
                                           </div>
                                        </td>
                                        <td className="p-4 text-right font-black text-[#0F172A] dark:text-white">
                                           <div className="flex items-center justify-end gap-2">
                                              <span>{formatMoney(lineTotal)}</span>
                                              <button
                                                 type="button"
                                              onClick={() => handleRemoveItem(index)}
                                                 className="p-1.5 text-[#526e9c] hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
                                                 title={t('createInvoice.deleteLine')}
                                              >
                                                 <Trash2 size={16} />
                                              </button>
                                           </div>
                                        </td>
                                     </tr>
                                  );
                               })}
                   </tbody>
                </table>
             </div>
             
             <button 
                type="button" 
                onClick={handleAddItem}
                className="flex items-center gap-2 text-sm font-bold text-[#18adf2] hover:text-[#221ab7] transition-colors bg-[#18adf2]/10 hover:bg-[#18adf2]/20 px-4 py-2.5 rounded-xl border border-[#18adf2]/20 w-fit"
             >
                <Plus size={16} /> {t('createInvoice.addLine')}
             </button>
          </div>

          <div className="h-[1px] bg-[#526e9c]/10 !my-10"></div>

          <div className="flex flex-col md:flex-row justify-between gap-6">
             <div className="w-full md:w-1/2 space-y-4">
                <div className="space-y-1.5">
                   <label className="text-xs font-bold text-[#526e9c] uppercase tracking-wider">{t('createInvoice.notesLabel')}</label>
                   <textarea 
                      rows="3" 
                      placeholder={t('createInvoice.notesPlaceholder')} 
                      value={form.notes}
                      onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white placeholder-[#526e9c]/50 focus:ring-2 focus:ring-[#18adf2]/50 focus:border-[#18adf2] transition-all outline-none resize-none"
                    ></textarea>
                </div>
             </div>

             <div className="w-full md:w-1/3 p-6 rounded-2xl bg-[#526e9c]/5 border border-[#526e9c]/10">
                <div className="space-y-3">
                   <div className="flex justify-between text-sm text-[#526e9c] font-medium">
                      <span>{t('createInvoice.subtotal')}</span>
                      <span>{formatMoney(totals.subtotal)}</span>
                   </div>
                    <div className="flex justify-between text-sm text-[#526e9c] font-medium">
                       <span>
                          {(() => {
                             if (items.length === 0) return t('createInvoice.tax');
                             const rates = [...new Set(items.map(item => Number(item.taux_tva)))];
                             if (rates.length === 1) {
                                const rate = rates[0];
                                return rate === 0 ? t('createInvoice.taxExempt') : `${t('createInvoice.tax')} (${rate}%)`;
                             }
                             return t('createInvoice.tax');
                          })()}
                       </span>
                       <span>{formatMoney(totals.tva)}</span>
                    </div>
                   <div className="h-[1px] bg-[#526e9c]/20 my-2"></div>
                   <div className="flex justify-between text-lg font-black text-[#0F172A] dark:text-white">
                      <span>{t('createInvoice.totalTtc')}</span>
                      <span>{formatMoney(totals.ttc)}</span>
                   </div>
                   {(() => {
                      if (items.length > 0) {
                         const rates = [...new Set(items.map(item => Number(item.taux_tva)))];
                         if (rates.length === 1 && rates[0] === 0) {
                            return <p className="text-[11px] italic text-slate-500 font-medium text-right mt-2">{t('createInvoice.taxDisclaimer')}</p>;
                         }
                      }
                      return null;
                   })()}
                </div>
             </div>
          </div>

          {submitError && <p className="text-sm font-medium text-red-500">{submitError}</p>}
          {submitMessage && <p className="text-sm font-medium text-emerald-500">{submitMessage}</p>}

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-[#526e9c]/10">
             <button type="button" onClick={() => navigate('/dashboard/factures')} className="px-6 py-3 rounded-xl font-bold text-[#526e9c] bg-[#526e9c]/10 hover:bg-[#526e9c]/20 transition-colors flex items-center justify-center gap-2">
                <X size={18} /> {t('createInvoice.cancel')}
             </button>
             <button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-[#221ab7] to-[#18adf2] text-white px-8 py-3 rounded-xl font-bold shadow-[0_0_20px_rgba(24,173,242,0.3)] hover:shadow-[#18adf2]/50 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70">
                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} {t('createInvoice.createBtn')}
             </button>
          </div>

        </form>
      </div>
    </div>
  );
}
