import React, { useState, useEffect } from 'react';
import { User, Building, Save, Camera, CreditCard, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    nom: '',
    email: '',
    type_entreprise: '',
  });
  const [recentPayment, setRecentPayment] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get('/settings');
        const data = response.data.data;
        setSettings({
          nom: data.user.nom || '',
          email: data.user.email || '',
          type_entreprise: data.user.type_entreprise || '',
        });
        setRecentPayment(data.recent_payment);
      } catch (error) {
        console.error("Failed to fetch settings", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchSettings();
    }
  }, [token]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await api.put('/settings', settings);
      // Optional: Show toast success
    } catch (error) {
      console.error("Failed to update settings", error);
    } finally {
      setIsSaving(false);
    }
  };

  const isPro = user?.statut_abonnement === 'actif';

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="animate-spin text-[#18adf2]" size={32} /></div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h1 className="text-3xl font-black text-[#0F172A] dark:text-white mb-1 tracking-tight">Paramètres</h1>
            <p className="text-[#526e9c] text-sm font-medium">Gérez votre profil et les informations légales de votre entreprise.</p>
         </div>
         <button onClick={handleSave} disabled={isSaving} className="bg-gradient-to-r from-[#221ab7] to-[#18adf2] text-white px-6 py-2.5 rounded-xl font-bold shadow-[0_0_20px_rgba(24,173,242,0.3)] hover:shadow-[#18adf2]/50 transition-all flex items-center gap-2 disabled:opacity-70">
            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} Sauvegarder
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Profile Card Summary */}
         <div className="lg:col-span-1 space-y-6">
            <div className="rounded-3xl bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl border border-[#526e9c]/20 p-6 shadow-xl flex flex-col items-center text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#18adf2]/10 rounded-full blur-3xl pointer-events-none" />
               <div className="relative mb-4 group cursor-pointer">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#221ab7] to-[#18adf2] p-1">
                     <div className="w-full h-full rounded-full bg-white dark:bg-[#0F172A] overflow-hidden flex items-center justify-center text-4xl font-bold text-[#221ab7] uppercase">
                        {settings.nom ? settings.nom.charAt(0) : 'U'}
                     </div>
                  </div>
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <Camera className="text-white" size={24} />
                  </div>
               </div>
               <h3 className="text-xl font-black text-[#0F172A] dark:text-white">{settings.nom}</h3>
               <p className="text-[#526e9c] text-sm font-medium">{settings.type_entreprise || 'Entreprise'}</p>
               <div className="mt-6 w-full flex justify-center gap-2 text-xs font-bold">
                  {isPro ? (
                    <span className="bg-[#18adf2]/10 text-[#18adf2] px-3 py-1.5 rounded-lg border border-[#18adf2]/20">Pro Plan</span>
                  ) : (
                    <span className="bg-[#526e9c]/10 text-[#526e9c] px-3 py-1.5 rounded-lg border border-[#526e9c]/20">Free Plan</span>
                  )}
               </div>
            </div>

            {/* Billing Summary */}
            <div className="rounded-3xl bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl border border-[#526e9c]/20 p-6 shadow-xl relative overflow-hidden">
               <h3 className="text-lg font-black text-[#0F172A] dark:text-white flex items-center gap-2 mb-4">
                  <CreditCard className="text-[#221ab7]" size={20} /> Abonnement & Facturation
               </h3>
               {isPro ? (
                 <div className="space-y-4">
                   <div className="flex justify-between items-center text-sm">
                     <span className="text-[#526e9c] font-medium">Prochain paiement</span>
                     <span className="font-bold text-[#0F172A] dark:text-white">
                       {user?.date_renouvellement ? new Date(user.date_renouvellement).toLocaleDateString('fr-FR') : 'N/A'}
                     </span>
                   </div>
                   {recentPayment && (
                     <div className="flex justify-between items-center text-sm pt-4 border-t border-[#526e9c]/10">
                       <span className="text-[#526e9c] font-medium">Dernier paiement</span>
                       <span className="font-bold text-emerald-500">{recentPayment.montant} MAD</span>
                     </div>
                   )}
                 </div>
               ) : (
                 <div className="space-y-4">
                   <p className="text-sm text-[#526e9c]">Vous êtes sur la version gratuite. Passez à la version Pro pour un accès illimité.</p>
                   <button 
                     onClick={() => navigate('/checkout')}
                     className="w-full bg-[#18adf2] text-white py-2 rounded-xl font-bold shadow-lg hover:shadow-[#18adf2]/50 transition-all"
                   >
                     Passer à la version PRO
                   </button>
                 </div>
               )}
            </div>
         </div>

         {/* Forms */}
         <div className="lg:col-span-2 space-y-6">
            {/* Informations de l'Entreprise Form */}
            <div className="rounded-3xl bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl border border-[#526e9c]/20 p-6 md:p-8 shadow-xl">
               <h3 className="text-lg font-black text-[#0F172A] dark:text-white flex items-center gap-2 mb-6 border-b border-[#526e9c]/10 pb-4">
                  <Building className="text-[#221ab7]" size={20} /> Informations de l'Entreprise
               </h3>
               <form className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                     <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#526e9c] uppercase tracking-wider">Raison Sociale</label>
                        <input 
                          type="text" 
                          value={settings.type_entreprise}
                          onChange={(e) => setSettings({...settings, type_entreprise: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white/50 dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 focus:border-[#18adf2] outline-none transition-all" 
                        />
                     </div>
                  </div>
                  {/* Additional enterprise fields omitted for brevity, can be expanded later */}
               </form>
            </div>

            {/* Informations Personnelles */}
            <div className="rounded-3xl bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl border border-[#526e9c]/20 p-6 md:p-8 shadow-xl">
               <h3 className="text-lg font-black text-[#0F172A] dark:text-white flex items-center gap-2 mb-6 border-b border-[#526e9c]/10 pb-4">
                  <User className="text-[#18adf2]" size={20} /> Informations Personnelles
               </h3>
               <form className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                     <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#526e9c] uppercase tracking-wider">Nom Complet</label>
                        <input 
                          type="text" 
                          value={settings.nom} 
                          onChange={(e) => setSettings({...settings, nom: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white/50 dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 focus:border-[#18adf2] outline-none transition-all" 
                        />
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#526e9c] uppercase tracking-wider">Email de connexion</label>
                        <input 
                          type="email" 
                          value={settings.email}
                          onChange={(e) => setSettings({...settings, email: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white/50 dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 focus:border-[#18adf2] outline-none transition-all" 
                        />
                     </div>
                  </div>
               </form>
            </div>

         </div>
      </div>
    </div>
  );
}
