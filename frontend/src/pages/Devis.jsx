import React from 'react';
import { EmptyState } from '../components/ui/States';
import { Receipt, Plus } from 'lucide-react';

export default function Devis() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col min-h-[calc(100vh-8rem)]">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h1 className="text-3xl font-black text-[#0F172A] dark:text-white mb-1 tracking-tight">Mes Devis</h1>
            <p className="text-[#526e9c] text-sm font-medium">Gérez vos propositions commerciales avant de les convertir en factures.</p>
         </div>
      </div>

      <div className="rounded-3xl bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl border border-[#526e9c]/20 shadow-xl overflow-hidden flex-1 flex flex-col items-center justify-center">
         <EmptyState 
            icon={Receipt} 
            title="Aucun Devis" 
            description="Créez et envoyez des devis professionnels à vos prospects. Une fois acceptés, transformez-les en factures en un clic." 
            actionText="Nouveau Devis"
            actionIcon={Plus}
         />
      </div>
    </div>
  );
}
