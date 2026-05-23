import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function InvoicePreview({ invoice }) {
  const { t } = useLanguage();

  if (!invoice) return null;

  const { client, user, invoice_items } = invoice;
  const items = invoice_items || [];

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('fr-FR');
  };

  const formatMoney = (amount) => {
    return Number(amount || 0).toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + ' MAD';
  };

  // Watermark logic equivalent to: !($invoice->user && strtolower($invoice->user->abonnement) === 'pro' && $invoice->user->remove_watermark)
  const isPro = user?.abonnement?.toLowerCase() === 'pro';
  const showWatermark = !(isPro && user?.remove_watermark);

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-white min-h-[1056px] shadow-2xl p-10 md:p-14 text-slate-700 font-sans overflow-hidden">
      
      {/* Watermark */}
      {showWatermark && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
          <div className="transform -rotate-45 text-[150px] font-black text-slate-900 opacity-[0.03] select-none tracking-tighter whitespace-nowrap">
            SI-PRO
          </div>
        </div>
      )}

      <div className="relative z-10 h-full flex flex-col">
        {/* Header section */}
        <div className="flex justify-between items-start mb-16">
          <div className="w-1/2">
            {user?.logo_url ? (
              <img src={user.logo_url} alt="Logo" className="max-w-[160px] max-h-[60px] object-contain" />
            ) : (
              <h1 className="m-0 text-3xl font-extrabold text-slate-900 tracking-tight">SmartInvoice</h1>
            )}
          </div>
          <div className="w-1/2 text-right">
            <h2 className="m-0 text-4xl font-light text-slate-400 tracking-[0.1em] uppercase">Facture</h2>
            <p className="mt-1 mb-6 text-lg font-bold text-slate-900">#{invoice.numero}</p>

            <table className="w-full mt-4 text-sm">
              <tbody>
                <tr>
                  <td className="text-right text-slate-500 py-1 pr-4">Date d'émission:</td>
                  <td className="text-right font-bold text-slate-900 w-[100px] py-1">{formatDate(invoice.date_emission)}</td>
                </tr>
                <tr>
                  <td className="text-right text-slate-500 py-1 pr-4">Date d'échéance:</td>
                  <td className="text-right font-bold text-slate-900 w-[100px] py-1">{formatDate(invoice.date_echeance)}</td>
                </tr>
                {['payee', 'payée'].includes(String(invoice.statut).toLowerCase()) && (
                  <tr>
                    <td className="text-right text-slate-500 py-3 pr-4">Statut:</td>
                    <td className="text-right py-3">
                      <span className="inline-block px-3 py-1 rounded border border-slate-300 bg-slate-50 text-slate-600 text-xs font-bold uppercase">
                        {invoice.statut}
                      </span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Billing Info */}
        <div className="grid grid-cols-2 gap-10 mb-16 text-sm">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400 border-b border-slate-200 pb-2 mb-3 font-bold">
              Émetteur
            </div>
            <div className="leading-relaxed text-slate-900">
              {user ? (
                <>
                  <strong className="block text-base mb-1">{user.nom || user.name}</strong>
                  <span className="text-slate-500 block mb-2">{user.email}</span>
                  {user.adresse_siege ? (
                    <span className="whitespace-pre-wrap block mb-2">{user.adresse_siege}</span>
                  ) : (
                    <span className="block mb-2">123 Rue de la Startup<br/>Casablanca, 20000</span>
                  )}
                  {user.ice && <span className="block text-slate-500 text-xs"><span className="font-bold">ICE:</span> {user.ice}</span>}
                  {user.patente && <span className="block text-slate-500 text-xs"><span className="font-bold">Patente:</span> {user.patente}</span>}
                </>
              ) : (
                <>
                  <strong className="block text-base mb-1">SmartInvoice Pro</strong>
                  <span className="text-slate-500 block mb-2">contact@smartinvoice.ma</span>
                  123 Rue de la Startup<br/>Casablanca, 20000
                </>
              )}
            </div>
          </div>
          
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400 border-b border-slate-200 pb-2 mb-3 font-bold">
              Facturé à
            </div>
            <div className="leading-relaxed text-slate-900">
              <strong className="block text-base mb-1">{client?.nom || 'Client'}</strong>
              {client?.email && <span className="text-slate-500 block mb-2">{client.email}</span>}
              {client?.adresse && <span className="block whitespace-pre-wrap mb-1">{client.adresse}</span>}
              {client?.telephone && <span><span className="text-slate-500">Tél:</span> {client.telephone}</span>}
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-12">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 border-b-2 border-slate-200">
                <th className="py-3 px-3 text-xs uppercase tracking-wider text-slate-500">Désignation</th>
                <th className="py-3 px-3 text-xs uppercase tracking-wider text-slate-500 text-right w-[15%]">Quantité</th>
                <th className="py-3 px-3 text-xs uppercase tracking-wider text-slate-500 text-right w-[20%]">Prix Unitaire</th>
                <th className="py-3 px-3 text-xs uppercase tracking-wider text-slate-500 text-right w-[20%]">Montant</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx} className="border-b border-slate-100 last:border-slate-200">
                  <td className="py-4 px-3 font-bold text-slate-900">{item.designation}</td>
                  <td className="py-4 px-3 text-right">{item.quantite}</td>
                  <td className="py-4 px-3 text-right">{formatMoney(item.prix_unitaire)}</td>
                  <td className="py-4 px-3 text-right font-bold text-slate-900">{formatMoney(item.montant_ligne)}</td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-slate-400 italic">Aucun article</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Totals & Notes */}
        <div className="flex justify-between items-start flex-grow">
          <div className="w-1/2 pr-10">
            {invoice.notes && (
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Notes</p>
                <p className="text-sm text-slate-700 whitespace-pre-wrap">{invoice.notes}</p>
              </div>
            )}
          </div>
          
          <div className="w-80">
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="py-2 px-3 text-slate-500 text-right">Total HT</td>
                  <td className="py-2 px-3 text-right font-bold text-slate-900">{formatMoney(invoice.total_ht)}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-slate-500 text-right">
                    {(() => {
                      if (items.length === 0) return 'TVA';
                      const rates = [...new Set(items.map(item => Number(item.taux_tva)))];
                      if (rates.length === 1) {
                        const rate = rates[0];
                        return rate === 0 ? 'TVA (Exonéré)' : `TVA (${rate}%)`;
                      }
                      return 'TVA';
                    })()}
                  </td>
                  <td className="py-2 px-3 text-right font-bold text-slate-900">{formatMoney(invoice.total_tva)}</td>
                </tr>
                <tr className="border-t-2 border-slate-200 text-base">
                  <td className="pt-4 px-3 text-slate-900 font-bold text-right">Total TTC</td>
                  <td className="pt-4 px-3 text-right font-black text-black">{formatMoney(invoice.total_ttc)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {(() => {
          const rates = [...new Set(items.map(item => Number(item.taux_tva || 0)))];
          const isInvoiceExonere = rates.length === 1 && rates[0] === 0;
          
          if (isInvoiceExonere) {
            return (
              <div className="mt-8 text-center">
                <span className="text-[11px] italic text-slate-500 font-medium">{t('createInvoice.taxDisclaimer')}</span>
              </div>
            );
          }
          return null;
        })()}

        {/* Footer */}
        <div className="pt-8 mt-12 border-t border-slate-200 text-center text-xs text-slate-400 pb-4">
          <p className="mb-1">Merci de votre confiance. En cas de retard de paiement, des pénalités pourront être appliquées.</p>
          <p className="text-slate-300">Généré par SmartInvoice Pro</p>
        </div>
      </div>
    </div>
  );
}
