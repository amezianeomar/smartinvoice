import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useInvoices from '../hooks/useInvoices';
import useClients from '../hooks/useClients';
import { useAuth } from '../context/AuthContext';
import InvoicePreview from '../components/invoices/InvoicePreview';
import { useLanguage } from '../context/LanguageContext';

function toInputDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toISOString().slice(0, 10);
}

export default function EditInvoice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { fetchInvoice, updateInvoice } = useInvoices();
  const { clients, isLoading: isClientsLoading } = useClients();
  const { user } = useAuth();
  const defaultTva = useMemo(() => {
    if (!user?.taux_tva_defaut) return 20;
    if (user.taux_tva_defaut === 'Exonéré') return 0;
    const parsed = parseFloat(user.taux_tva_defaut);
    return isNaN(parsed) ? 20 : parsed;
  }, [user?.taux_tva_defaut]);

  const [invoice, setInvoice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Form State
  const [form, setForm] = useState({
    client_id: '',
    numero: '',
    date_emission: '',
    date_echeance: '',
    statut: '',
    notes: '',
  });
  
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadInvoice = async () => {
      try {
        const data = await fetchInvoice(id);
        setInvoice(data);
        setForm({
          client_id: data.client_id || '',
          numero: data.numero || '',
          date_emission: toInputDate(data.date_emission),
          date_echeance: toInputDate(data.date_echeance),
          statut: data.statut || 'brouillon',
          notes: data.notes || '',
        });
        setItems(
          (data.invoice_items || []).map((item) => ({
            id: item.id || Math.random().toString(36).substr(2, 9),
            designation: item.designation,
            quantite: item.quantite,
            prix_unitaire: item.prix_unitaire,
            taux_tva: item.taux_tva !== null ? item.taux_tva : defaultTva,
          }))
        );
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur lors du chargement de la facture.');
      } finally {
        setIsLoading(false);
      }
    };
    loadInvoice();
  }, [id, fetchInvoice]);

  // Derived totals
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

  // Derived live state for preview
  const liveState = useMemo(() => {
    if (!invoice) return null;
    const selectedClient = clients.find(c => String(c.id) === String(form.client_id)) || invoice.client;
    
    return {
      ...invoice,
      client: selectedClient,
      numero: form.numero,
      date_emission: form.date_emission,
      date_echeance: form.date_echeance,
      statut: form.statut,
      notes: form.notes,
      total_ht: totals.subtotal,
      total_tva: totals.tva,
      total_ttc: totals.ttc,
      invoice_items: items.map(i => ({
        ...i,
        montant_ligne: (Number(i.quantite) || 0) * (Number(i.prix_unitaire) || 0)
      }))
    };
  }, [invoice, form, items, totals, clients]);

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      { id: Math.random().toString(36).substr(2, 9), designation: '', quantite: 1, prix_unitaire: 0, taux_tva: defaultTva },
    ]);
  };

  const handleRemoveItem = (idToRemove) => {
    setItems((prev) => prev.filter((item) => item.id !== idToRemove));
  };

  const handleItemChange = (idToChange, field, value) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== idToChange) return item;
        return {
          ...item,
          [field]: field === 'designation' ? value : Number(value),
        };
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    const validItems = items.filter((item) => item.designation.trim() && Number(item.quantite) > 0);

    if (!form.client_id) return setSubmitError('Veuillez sélectionner un client.');
    if (validItems.length === 0) return setSubmitError('Ajoutez au moins une ligne valide.');

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

      await updateInvoice(id, payload);
      navigate(`/dashboard/factures/${id}`);
    } catch (err) {
      if (err.response?.data?.error_code === 'INCOMPLETE_PROFILE') {
        setShowProfileModal(true);
      } else {
        setSubmitError(err.response?.data?.message || 'Erreur lors de la mise à jour de la facture.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 size={48} className="text-[#18adf2] animate-spin mb-4" />
        <p className="text-[#526e9c] font-bold animate-pulse">Chargement pour édition...</p>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="max-w-4xl mx-auto p-12 rounded-3xl bg-red-500/10 border border-red-500/20 text-center">
        <h2 className="text-xl font-black text-red-500 mb-4">Facture introuvable</h2>
        <p className="text-red-400 mb-8">{error}</p>
        <button onClick={() => navigate('/dashboard/factures')} className="flex items-center gap-2 mx-auto px-6 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600">
          <ArrowLeft size={18} /> Retour aux factures
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto">
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

      {/* Top Action Bar */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <button 
              onClick={() => navigate(`/dashboard/factures/${id}`)}
              className="flex items-center gap-2 text-[#526e9c] hover:text-[#0F172A] dark:hover:text-white transition-colors mb-2 text-sm font-bold"
            >
              <ArrowLeft size={16} /> Annuler
            </button>
            <h1 className="text-3xl font-black text-[#0F172A] dark:text-white mb-1 tracking-tight">Modifier Facture</h1>
         </div>
         <div>
            <button 
               onClick={handleSubmit}
               disabled={isSubmitting}
               className="bg-gradient-to-r from-[#221ab7] to-[#18adf2] text-white px-8 py-3 rounded-xl font-bold shadow-[0_0_20px_rgba(24,173,242,0.3)] hover:shadow-[#18adf2]/50 transition-all hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-70"
            >
               {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} Enregistrer
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
        {/* LEFT COLUMN - FORM */}
        <div className="rounded-3xl bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl border border-[#526e9c]/20 shadow-xl p-6 md:p-8">
          <form className="space-y-8">
            
            {/* Client & Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#526e9c] uppercase tracking-wider">Client</label>
                <select
                  value={form.client_id}
                  onChange={(e) => setForm({ ...form, client_id: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 outline-none appearance-none"
                >
                  {isClientsLoading && <option value="">Chargement...</option>}
                  {clients.map((c) => <option key={c.id} value={c.id}>{c.nom}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#526e9c] uppercase tracking-wider">Numéro</label>
                <input
                  type="text"
                  value={form.numero}
                  onChange={(e) => setForm({ ...form, numero: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 outline-none"
                />
              </div>
            </div>

            {/* Dates & Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#526e9c] uppercase tracking-wider">Émission</label>
                <input
                  type="date"
                  value={form.date_emission}
                  onChange={(e) => setForm({ ...form, date_emission: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#526e9c] uppercase tracking-wider">Échéance</label>
                <input
                  type="date"
                  value={form.date_echeance}
                  onChange={(e) => setForm({ ...form, date_echeance: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#526e9c] uppercase tracking-wider">Statut</label>
                <select
                  value={form.statut}
                  onChange={(e) => setForm({ ...form, statut: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 outline-none appearance-none uppercase"
                >
                  <option value="brouillon">Brouillon</option>
                  <option value="envoyee">Envoyée</option>
                  <option value="payee">Payée</option>
                </select>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-4">
              <h3 className="text-sm font-black text-[#0F172A] dark:text-white border-b border-[#526e9c]/10 pb-2 uppercase tracking-wider">Lignes de la Facture</h3>
              
              <div className="space-y-3">
                <AnimatePresence>
                  {items.map((item, index) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, height: 0, scale: 0.95 }}
                      animate={{ opacity: 1, height: 'auto', scale: 1 }}
                      exit={{ opacity: 0, height: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-3 bg-[#526e9c]/5 p-3 rounded-2xl border border-[#526e9c]/10"
                    >
                      <input
                        type="text"
                        placeholder="Description"
                        value={item.designation}
                        onChange={(e) => handleItemChange(item.id, 'designation', e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl border border-[#526e9c]/20 bg-white dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 outline-none"
                      />
                      <input
                        type="number"
                        placeholder="Qté"
                        min="1"
                        value={item.quantite}
                        onChange={(e) => handleItemChange(item.id, 'quantite', e.target.value)}
                        className="w-20 px-3 py-2 rounded-xl border border-[#526e9c]/20 bg-white dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 outline-none text-center"
                      />
                      <div className="relative w-32">
                        <input
                          type="number"
                          placeholder="Prix"
                          min="0"
                          step="0.01"
                          value={item.prix_unitaire}
                          onChange={(e) => handleItemChange(item.id, 'prix_unitaire', e.target.value)}
                          className="w-full pl-3 pr-10 py-2 rounded-xl border border-[#526e9c]/20 bg-white dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 outline-none"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#526e9c]">MAD</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 text-[#526e9c] hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <button 
                type="button" 
                onClick={handleAddItem}
                className="flex items-center gap-2 text-sm font-bold text-[#18adf2] hover:text-[#221ab7] transition-colors bg-[#18adf2]/10 hover:bg-[#18adf2]/20 px-4 py-2.5 rounded-xl border border-[#18adf2]/20 w-fit"
              >
                <Plus size={16} /> Ajouter une ligne
              </button>
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#526e9c] uppercase tracking-wider">Notes pour le client</label>
              <textarea 
                rows="3" 
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white placeholder-[#526e9c]/50 focus:ring-2 focus:ring-[#18adf2]/50 outline-none resize-none"
              ></textarea>
            </div>

            {submitError && <p className="text-sm font-bold text-red-500 p-4 bg-red-500/10 rounded-xl">{submitError}</p>}
          </form>
        </div>

        {/* RIGHT COLUMN - LIVE PREVIEW */}
        <div className="sticky top-6">
          <div className="rounded-3xl bg-slate-200/50 dark:bg-black/20 backdrop-blur-xl border border-[#526e9c]/20 shadow-xl overflow-hidden p-2">
             <div className="bg-[#18adf2]/10 py-2 px-4 text-xs font-bold text-[#18adf2] uppercase tracking-widest text-center border-b border-[#18adf2]/20 mb-2 rounded-t-2xl">
               Aperçu en Direct
             </div>
             {/* Scale down the preview so it fits nicely in the column */}
             <div className="origin-top relative overflow-hidden" style={{ height: '850px' }}>
                <div className="transform scale-[0.65] origin-top-left w-[153%] absolute top-0 left-0">
                  <InvoicePreview invoice={liveState} />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
