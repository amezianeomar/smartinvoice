import React from 'react';
import { User, Building, Lock, Save, Camera } from 'lucide-react';

export default function Settings() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h1 className="text-3xl font-black text-[#0F172A] dark:text-white mb-1 tracking-tight">Paramètres</h1>
            <p className="text-[#526e9c] text-sm font-medium">Gérez votre profil et les informations légales de votre entreprise.</p>
         </div>
         <button className="bg-gradient-to-r from-[#221ab7] to-[#18adf2] text-white px-6 py-2.5 rounded-xl font-bold shadow-[0_0_20px_rgba(24,173,242,0.3)] hover:shadow-[#18adf2]/50 transition-all flex items-center gap-2">
            <Save size={18} /> Sauvegarder
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Profile Card Summary */}
         <div className="lg:col-span-1 space-y-6">
            <div className="rounded-3xl bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl border border-[#526e9c]/20 p-6 shadow-xl flex flex-col items-center text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#18adf2]/10 rounded-full blur-3xl pointer-events-none" />
               <div className="relative mb-4 group cursor-pointer">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#221ab7] to-[#18adf2] p-1">
                     <div className="w-full h-full rounded-full bg-white dark:bg-[#0F172A] overflow-hidden flex items-center justify-center text-4xl font-bold text-[#221ab7]">
                        A
                     </div>
                  </div>
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <Camera className="text-white" size={24} />
                  </div>
               </div>
               <h3 className="text-xl font-black text-[#0F172A] dark:text-white">Amine Tazi</h3>
               <p className="text-[#526e9c] text-sm font-medium">Administrateur</p>
               <div className="mt-6 w-full flex justify-center gap-2 text-xs font-bold">
                  <span className="bg-[#18adf2]/10 text-[#18adf2] px-3 py-1.5 rounded-lg border border-[#18adf2]/20">Pro Plan</span>
                  <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1.5 rounded-lg border border-emerald-500/20">Vérifié</span>
               </div>
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
                        <input type="text" defaultValue="Smart Invoice SARL" className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white/50 dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 focus:border-[#18adf2] outline-none transition-all" />
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#526e9c] uppercase tracking-wider">Secteur d'Activité</label>
                        <input type="text" defaultValue="Services Numériques" className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white/50 dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 focus:border-[#18adf2] outline-none transition-all" />
                     </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                     <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#526e9c] uppercase tracking-wider">ICE</label>
                        <input type="text" defaultValue="001122334400010" className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white/50 dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 focus:border-[#18adf2] outline-none transition-all" />
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#526e9c] uppercase tracking-wider">Patente</label>
                        <input type="text" defaultValue="35789123" className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white/50 dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 focus:border-[#18adf2] outline-none transition-all" />
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#526e9c] uppercase tracking-wider">Taux TVA Défaut</label>
                        <select className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white/50 dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 focus:border-[#18adf2] outline-none transition-all appearance-none">
                           <option>20%</option>
                           <option>14%</option>
                           <option>10%</option>
                           <option>Exonéré</option>
                        </select>
                     </div>
                  </div>
                  <div className="space-y-1.5">
                     <label className="text-xs font-bold text-[#526e9c] uppercase tracking-wider">Adresse du Siège</label>
                     <input type="text" defaultValue="Casablanca Nearshore, Sidi Maarouf" className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white/50 dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 focus:border-[#18adf2] outline-none transition-all" />
                  </div>
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
                        <input type="text" defaultValue="Amine Tazi" className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white/50 dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 focus:border-[#18adf2] outline-none transition-all" />
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#526e9c] uppercase tracking-wider">Email de connexion</label>
                        <input type="email" defaultValue="amine@smartinvoice.ma" className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white/50 dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 focus:border-[#18adf2] outline-none transition-all" />
                     </div>
                  </div>
               </form>
            </div>

         </div>
      </div>
    </div>
  );
}
