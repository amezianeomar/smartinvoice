import React from 'react';
import { EmptyState } from '../components/ui/States';
import { Box, Plus } from 'lucide-react';

export default function Catalogue() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col min-h-[calc(100vh-8rem)]">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h1 className="text-3xl font-black text-[#0F172A] dark:text-white mb-1 tracking-tight">Catalogue Produits & Services</h1>
            <p className="text-[#526e9c] text-sm font-medium">Référencez vos articles pour facturer plus rapidement.</p>
         </div>
      </div>

      <div className="rounded-3xl bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl border border-[#526e9c]/20 shadow-xl overflow-hidden flex-1 flex flex-col items-center justify-center">
         <EmptyState 
            icon={Box} 
            title="Catalogue Vide" 
            description="Gagnez du temps en enregistrant vos produits, abonnements ou tarifs horaires. Ils seront directement accessibles lors de la création d'une facture." 
            actionText="Ajouter un Article"
            actionIcon={Plus}
         />
      </div>
    </div>
  );
}
