import React, { useState, useEffect } from 'react';
import { CreditCard, Loader2, ArrowUpRight, Calendar } from 'lucide-react';
import api from '../services/api';

export default function AdminSettings() {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLedger = async () => {
      try {
        const response = await api.get('/admin/ledger');
        if (response.data.success) {
          setPayments(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch ledger", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLedger();
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="animate-spin text-[#18adf2]" size={32} /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-[#0F172A] dark:text-white mb-1 tracking-tight flex items-center gap-3">
          <CreditCard className="text-[#221ab7]" size={32} />
          Grand Livre Financier
        </h1>
        <p className="text-[#526e9c] text-sm font-medium">Historique complet de toutes les transactions sur la plateforme.</p>
      </div>

      <div className="bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl rounded-3xl border border-[#526e9c]/20 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#526e9c]/10 bg-[#526e9c]/5">
                <th className="px-6 py-4 text-xs font-bold text-[#526e9c] uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-4 text-xs font-bold text-[#526e9c] uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-[#526e9c] uppercase tracking-wider">Client</th>
                <th className="px-6 py-4 text-xs font-bold text-[#526e9c] uppercase tracking-wider">Abonnement</th>
                <th className="px-6 py-4 text-xs font-bold text-[#526e9c] uppercase tracking-wider text-right">Montant</th>
                <th className="px-6 py-4 text-xs font-bold text-[#526e9c] uppercase tracking-wider text-center">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#526e9c]/10">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-[#526e9c]/5 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs text-[#526e9c] bg-[#526e9c]/10 px-2 py-1 rounded">
                      #TXN-{payment.id.toString().padStart(5, '0')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-[#526e9c] font-medium">
                      <Calendar size={14} />
                      {new Date(payment.date_transaction).toLocaleString('fr-FR', {
                        day: '2-digit', month: '2-digit', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#221ab7] to-[#18adf2] p-0.5">
                        <div className="w-full h-full rounded-full bg-white dark:bg-[#0F172A] flex items-center justify-center font-bold text-[#221ab7] text-xs uppercase">
                          {payment.user?.nom ? payment.user.nom.charAt(0) : 'U'}
                        </div>
                      </div>
                      <p className="text-sm font-bold text-[#0F172A] dark:text-white">{payment.user?.nom || 'Utilisateur inconnu'}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-[#0F172A] dark:text-white capitalize">
                      {payment.abonnement}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-black text-emerald-500 flex items-center justify-end gap-1">
                      {payment.montant} MAD <ArrowUpRight size={14} />
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                      payment.statut === 'payé'
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                    }`}>
                      {payment.statut}
                    </span>
                  </td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-[#526e9c]">
                    Aucune transaction trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
