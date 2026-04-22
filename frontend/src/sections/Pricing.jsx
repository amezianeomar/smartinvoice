import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button, SpotlightCard } from '../components/ui';
import { Link } from 'react-router-dom';

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-32 px-6 max-w-7xl mx-auto z-20">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
          Prêt à passer au <br/>
          <span className="text-[#221ab7] dark:text-[#18adf2]">niveau supérieur ?</span>
        </h2>
        <p className="text-[#526e9c] dark:text-[#94A3B8]">Choisissez le plan qui correspond à la taille de votre entreprise.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        
        {/* PLAN 1: STARTER */}
        <SpotlightCard className="p-10 rounded-[2.5rem] bg-white dark:bg-[#131B2C] border border-[#526e9c]/10 flex flex-col transition-transform duration-500 hover:scale-105 shadow-xl">
          <h4 className="font-bold text-xl mb-2">Starter</h4>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-5xl font-black">0</span>
            <span className="text-[#526e9c] font-bold">DH/mois</span>
          </div>
          <p className="text-sm text-[#526e9c] mb-8">Parfait pour les freelances qui débutent.</p>
          <ul className="space-y-4 mb-10 flex-1">
            {['5 Factures / mois', '1 Utilisateur', 'TVA Automatique', 'Support par Email'].map((feat) => (
              <li key={feat} className="flex items-center gap-3 text-sm font-medium">
                <CheckCircle2 size={18} className="text-emerald-500" /> {feat}
              </li>
            ))}
          </ul>
          <Link to="/register"><Button variant="outline" className="w-full py-4 text-base">Commencer Gratuitement</Button></Link>
        </SpotlightCard>

        {/* PLAN 2: PROFESSIONAL (The "Featured" One) */}
        <SpotlightCard className="relative p-12 rounded-[2.5rem] bg-[#221ab7] dark:bg-[#5048e5] text-white flex flex-col scale-100 md:scale-110 shadow-2xl shadow-[#221ab7]/40 z-10 border border-white/10">
          <div className="absolute top-0 right-10 -translate-y-1/2 bg-[#18adf2] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Plus Populaire</div>
          <h4 className="font-bold text-xl mb-2">Professional</h4>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-5xl font-black">299</span>
            <span className="opacity-70 font-bold">DH/mois</span>
          </div>
          <p className="text-sm opacity-80 mb-8">Tout ce dont une PME a besoin pour scaler.</p>
          <ul className="space-y-4 mb-10 flex-1">
            {['Factures Illimitées', '5 Utilisateurs', 'CRM Clients Avancé', 'Rapports Fiscaux', 'Support 24/7'].map((feat) => (
              <li key={feat} className="flex items-center gap-3 text-sm font-bold">
                <CheckCircle2 size={18} className="text-[#18adf2]" /> {feat}
              </li>
            ))}
          </ul>
          <Link to="/register"><Button className="w-full py-4 text-base bg-white dark:bg-white text-[#221ab7] dark:text-[#5048e5] hover:scale-105 hover:bg-gray-50 transition-transform shadow-xl border-none">Essai Gratuit de 14 Jours</Button></Link>
        </SpotlightCard>

        {/* PLAN 3: ENTERPRISE */}
        <SpotlightCard className="p-10 rounded-[2.5rem] bg-white dark:bg-[#131B2C] border border-[#526e9c]/10 flex flex-col transition-transform duration-500 hover:scale-105 shadow-xl">
          <h4 className="font-bold text-xl mb-2">Business</h4>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-5xl font-black">899</span>
            <span className="text-[#526e9c] font-bold">DH/mois</span>
          </div>
          <p className="text-sm text-[#526e9c] mb-8">Pour les grandes structures et franchises.</p>
          <ul className="space-y-4 mb-10 flex-1">
            {['Utilisateurs Illimités', 'Multi-Sociétés', 'API Accès Complet', 'Gestionnaire Dédié'].map((feat) => (
              <li key={feat} className="flex items-center gap-3 text-sm font-medium">
                <CheckCircle2 size={18} className="text-emerald-500" /> {feat}
              </li>
            ))}
          </ul>
          <Link to="/register"><Button variant="outline" className="w-full py-4 text-base">Contacter la Vente</Button></Link>
        </SpotlightCard>

      </div>
    </section>
  );
}