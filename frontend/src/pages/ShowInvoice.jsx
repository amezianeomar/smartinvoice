import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Edit, Loader2 } from 'lucide-react';
import useInvoices from '../hooks/useInvoices';
import InvoicePreview from '../components/invoices/InvoicePreview';

export default function ShowInvoice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchInvoice, downloadInvoicePdf } = useInvoices();
  const [invoice, setInvoice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const loadInvoice = async () => {
      try {
        const data = await fetchInvoice(id);
        setInvoice(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur lors du chargement de la facture.');
      } finally {
        setIsLoading(false);
      }
    };
    loadInvoice();
  }, [id, fetchInvoice]);

  const handleDownload = async () => {
    if (!invoice) return;
    setIsDownloading(true);
    try {
      await downloadInvoicePdf(invoice);
    } catch (err) {
      console.error('Download failed:', err);
      alert('Erreur lors du téléchargement PDF');
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 size={48} className="text-[#18adf2] animate-spin mb-4" />
        <p className="text-[#526e9c] font-bold animate-pulse">Chargement de la facture...</p>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="max-w-4xl mx-auto p-12 rounded-3xl bg-red-500/10 border border-red-500/20 text-center">
        <h2 className="text-xl font-black text-red-500 mb-4">Facture introuvable</h2>
        <p className="text-red-400 mb-8">{error}</p>
        <button 
          onClick={() => navigate('/dashboard/factures')}
          className="flex items-center gap-2 mx-auto px-6 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors"
        >
          <ArrowLeft size={18} /> Retour aux factures
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Top Action Bar */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <button 
              onClick={() => navigate('/dashboard/factures')}
              className="flex items-center gap-2 text-[#526e9c] hover:text-[#0F172A] dark:hover:text-white transition-colors mb-2 text-sm font-bold"
            >
              <ArrowLeft size={16} /> Retour à la liste
            </button>
            <h1 className="text-3xl font-black text-[#0F172A] dark:text-white mb-1 tracking-tight">Facture #{invoice.numero}</h1>
            <p className="text-[#526e9c] text-sm font-medium">Créée le {new Date(invoice.created_at).toLocaleDateString('fr-FR')}</p>
         </div>
         <div className="flex items-center gap-3">
            {!['payee', 'payée'].includes(String(invoice.statut).toLowerCase()) && (
              <button 
                 onClick={() => navigate(`/dashboard/factures/${invoice.id}/edit`)}
                 className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-[#526e9c]/20 bg-white dark:bg-[#0F172A]/50 text-[#526e9c] hover:text-[#0F172A] dark:hover:text-white hover:border-[#18adf2]/50 transition-all font-bold shadow-sm"
              >
                 <Edit size={18} /> Modifier
              </button>
            )}
            <button 
               onClick={handleDownload}
               disabled={isDownloading}
               className="bg-gradient-to-r from-[#221ab7] to-[#18adf2] text-white px-5 py-2.5 rounded-xl font-bold shadow-[0_0_20px_rgba(24,173,242,0.3)] hover:shadow-[#18adf2]/50 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
            >
               {isDownloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
               Télécharger PDF
            </button>
         </div>
      </div>

      {/* Invoice Document Canvas */}
      <div className="rounded-3xl bg-slate-200/50 dark:bg-black/20 backdrop-blur-xl border border-[#526e9c]/20 shadow-xl overflow-x-auto p-4 md:p-8">
        <div className="min-w-[800px]">
          <InvoicePreview invoice={invoice} />
        </div>
      </div>
    </div>
  );
}
