import React from "react";
import { Save, Paperclip, X, Plus } from "lucide-react";

export default function CreateInvoiceForm() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h1 className="text-3xl font-black text-[#0F172A] dark:text-white mb-1 tracking-tight">Nouvelle Facture</h1>
            <p className="text-[#526e9c] text-sm font-medium">Créez et envoyez une nouvelle facture à votre client.</p>
         </div>
      </div>

      <div className="rounded-3xl bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl border border-[#526e9c]/20 shadow-xl overflow-hidden">
        <form className="p-6 md:p-8 space-y-8">
          
          {/* Section: Client Info */}
          <div className="space-y-4">
             <h3 className="text-lg font-black text-[#0F172A] dark:text-white border-b border-[#526e9c]/10 pb-2">Informations du Client</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                   <label className="text-xs font-bold text-[#526e9c] uppercase tracking-wider">Sélectionner un Client</label>
                   <select className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 focus:border-[#18adf2] transition-all outline-none appearance-none">
                      <option>Sélectionnez...</option>
                      <option>Nexus Tech IT</option>
                      <option>Groupe OCP</option>
                      <option>Maroc Telecom</option>
                   </select>
                </div>
                <div className="space-y-1.5">
                   <label className="text-xs font-bold text-[#526e9c] uppercase tracking-wider">ICE (Identifiant Commun de l'Entreprise)</label>
                   <input type="text" placeholder="Entrez le numéro ICE..." className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white placeholder-[#526e9c]/50 focus:ring-2 focus:ring-[#18adf2]/50 focus:border-[#18adf2] transition-all outline-none" />
                </div>
             </div>
          </div>

           {/* Section: Invoice Details */}
           <div className="space-y-4">
             <h3 className="text-lg font-black text-[#0F172A] dark:text-white border-b border-[#526e9c]/10 pb-2">Détails de la Facture</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1.5">
                   <label className="text-xs font-bold text-[#526e9c] uppercase tracking-wider">Date d'émission</label>
                   <input type="date" className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 focus:border-[#18adf2] transition-all outline-none" />
                </div>
                <div className="space-y-1.5">
                   <label className="text-xs font-bold text-[#526e9c] uppercase tracking-wider">Date d'échéance</label>
                   <input type="date" className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 focus:border-[#18adf2] transition-all outline-none" />
                </div>
                <div className="space-y-1.5">
                   <label className="text-xs font-bold text-[#526e9c] uppercase tracking-wider">N° de Commande (Optionnel)</label>
                   <input type="text" placeholder="EX: PO-2026-99" className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white placeholder-[#526e9c]/50 focus:ring-2 focus:ring-[#18adf2]/50 focus:border-[#18adf2] transition-all outline-none" />
                </div>
             </div>
          </div>

          {/* Section: Articles */}
          <div className="space-y-4">
             <h3 className="text-lg font-black text-[#0F172A] dark:text-white border-b border-[#526e9c]/10 pb-2">Articles</h3>
             <div className="border border-[#526e9c]/20 rounded-2xl overflow-hidden bg-white/30 dark:bg-[#080C16]/30">
                <table className="w-full text-left">
                   <thead className="bg-[#526e9c]/5 border-b border-[#526e9c]/20 text-[11px] uppercase tracking-widest text-[#526e9c]">
                     <tr>
                       <th className="p-4 font-bold w-1/2">Description</th>
                       <th className="p-4 font-bold w-24">Qté</th>
                       <th className="p-4 font-bold">Prix Unitaire</th>
                       <th className="p-4 font-bold text-right pr-4">Total</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-[#526e9c]/10">
                     <tr className="hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
                       <td className="p-4">
                         <input type="text" placeholder="Design UX/UI - Application Web" className="w-full px-3 py-2.5 rounded-lg border border-[#526e9c]/10 bg-white/50 dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 outline-none" />
                       </td>
                       <td className="p-4">
                         <input type="number" defaultValue={1} className="w-full px-3 py-2.5 rounded-lg border border-[#526e9c]/10 bg-white/50 dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 outline-none text-center" />
                       </td>
                       <td className="p-4">
                         <div className="relative">
                            <input type="text" defaultValue="15000" className="w-full pl-3 pr-10 py-2.5 rounded-lg border border-[#526e9c]/10 bg-white/50 dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#18adf2]/50 outline-none block" />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#526e9c]">MAD</span>
                         </div>
                       </td>
                       <td className="p-4 text-right font-black text-[#0F172A] dark:text-white">15 000,00 MAD</td>
                     </tr>
                   </tbody>
                </table>
             </div>
             
             <button type="button" className="flex items-center gap-2 text-sm font-bold text-[#18adf2] hover:text-[#221ab7] transition-colors bg-[#18adf2]/10 hover:bg-[#18adf2]/20 px-4 py-2.5 rounded-xl border border-[#18adf2]/20 w-fit">
                <Plus size={16} /> Ajouter une ligne
             </button>
          </div>

          <div className="h-[1px] bg-[#526e9c]/10 !my-10"></div>

          <div className="flex flex-col md:flex-row justify-between gap-6">
             <div className="w-full md:w-1/2 space-y-4">
                <div className="space-y-1.5">
                   <label className="text-xs font-bold text-[#526e9c] uppercase tracking-wider">Notes pour le client</label>
                   <textarea rows="3" placeholder="Merci pour votre confiance..." className="w-full px-4 py-3 rounded-xl border border-[#526e9c]/20 bg-white dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white placeholder-[#526e9c]/50 focus:ring-2 focus:ring-[#18adf2]/50 focus:border-[#18adf2] transition-all outline-none resize-none"></textarea>
                </div>
             </div>

             <div className="w-full md:w-1/3 p-6 rounded-2xl bg-[#526e9c]/5 border border-[#526e9c]/10">
                <div className="space-y-3">
                   <div className="flex justify-between text-sm text-[#526e9c] font-medium">
                      <span>Sous-total</span>
                      <span>15 000,00 MAD</span>
                   </div>
                   <div className="flex justify-between text-sm text-[#526e9c] font-medium">
                      <span>TVA (20%)</span>
                      <span>3 000,00 MAD</span>
                   </div>
                   <div className="h-[1px] bg-[#526e9c]/20 my-2"></div>
                   <div className="flex justify-between text-lg font-black text-[#0F172A] dark:text-white">
                      <span>Total TTC</span>
                      <span>18 000,00 MAD</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-[#526e9c]/10">
             <button type="button" className="px-6 py-3 rounded-xl font-bold text-[#526e9c] bg-[#526e9c]/10 hover:bg-[#526e9c]/20 transition-colors flex items-center justify-center gap-2">
                <X size={18} /> Annuler
             </button>
             <button type="button" className="px-6 py-3 rounded-xl font-bold text-[#0F172A] dark:text-white bg-white/50 dark:bg-white/5 border border-[#526e9c]/20 hover:bg-white dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                <Paperclip size={18} /> Enregistrer Brouillon
             </button>
             <button type="button" className="bg-gradient-to-r from-[#221ab7] to-[#18adf2] text-white px-8 py-3 rounded-xl font-bold shadow-[0_0_20px_rgba(24,173,242,0.3)] hover:shadow-[#18adf2]/50 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                <Save size={18} /> Créer la Facture
             </button>
          </div>

        </form>
      </div>
    </div>
  );
}
