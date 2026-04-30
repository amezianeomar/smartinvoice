import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap, X, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UpgradeModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#080C16]/80 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white dark:bg-[#0F172A] rounded-3xl shadow-2xl border border-[#526e9c]/20 overflow-hidden"
        >
          {/* Header Glow */}
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#18adf2]/20 to-transparent pointer-events-none" />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-[#526e9c] hover:text-[#0F172A] dark:hover:text-white transition-colors z-10 bg-white/10 dark:bg-black/10 backdrop-blur-md p-1.5 rounded-full"
          >
            <X size={20} />
          </button>

          <div className="p-8 pb-6 flex flex-col items-center text-center relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#221ab7] to-[#18adf2] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(24,173,242,0.4)]">
              <ShieldCheck size={32} className="text-white" />
            </div>

            <h2 className="text-2xl font-black text-[#0F172A] dark:text-white mb-2 tracking-tight">
              Limite Quotidienne Atteinte
            </h2>
            <p className="text-[#526e9c] text-sm mb-6">
              Vous avez atteint votre limite de création. Veuillez patienter 24 heures ou passer à la version Pro pour un accès illimité.
            </p>

            <div className="w-full bg-[#526e9c]/5 rounded-2xl p-4 mb-8 text-left border border-[#526e9c]/10">
              <h3 className="text-xs font-bold text-[#0F172A] dark:text-white uppercase tracking-wider mb-3">
                Avantages de SI-PRO
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-[#526e9c] font-medium">
                  <CheckCircle2 size={16} className="text-[#18adf2]" />
                  Création de factures illimitée
                </li>
                <li className="flex items-center gap-2 text-sm text-[#526e9c] font-medium">
                  <CheckCircle2 size={16} className="text-[#18adf2]" />
                  Accès aux Statistiques Avancées
                </li>
                <li className="flex items-center gap-2 text-sm text-[#526e9c] font-medium">
                  <CheckCircle2 size={16} className="text-[#18adf2]" />
                  Personnalisation avancée
                </li>
              </ul>
            </div>

            <button 
              onClick={() => {
                onClose();
                navigate('/checkout');
              }}
              className="w-full bg-gradient-to-r from-[#221ab7] to-[#18adf2] text-white rounded-xl py-3.5 font-bold shadow-[0_0_20px_rgba(24,173,242,0.3)] hover:shadow-[#18adf2]/50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
            >
              <Zap size={18} />
              Passer à la version PRO
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onClose}
              className="w-full mt-3 py-3 text-sm font-bold text-[#526e9c] hover:text-[#0F172A] dark:hover:text-white transition-colors"
            >
              Plus tard
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
