import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function ResendConfirmationModal({ isOpen, onClose, onConfirm, invoice }) {
  const { t } = useLanguage();
  if (!isOpen || !invoice) return null;

  const sentDate = invoice.date_emission 
    ? new Date(invoice.date_emission).toLocaleDateString('fr-FR')
    : 'inconnue';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white dark:bg-[#131B2C] shadow-2xl border border-[#526e9c]/20"
        >
          <div className="p-6 sm:p-8">
             <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 mb-6">
               <AlertTriangle className="h-8 w-8 text-amber-500" />
             </div>
             <h3 className="text-xl font-black text-center text-[#0F172A] dark:text-white mb-3">
               {t('modals.warning')}
             </h3>
             <p className="text-[#526e9c] text-center mb-8 font-medium">
               {t('modals.resendWarning').split('{date}')[0]}
               <span className="font-bold text-[#0F172A] dark:text-white">{sentDate}</span>
               {t('modals.resendWarning').split('{date}')[1]}
             </p>
             
             <div className="flex flex-col-reverse sm:flex-row gap-3">
               <button
                 type="button"
                 onClick={onClose}
                 className="flex-1 rounded-xl px-4 py-3 text-sm font-bold text-[#526e9c] hover:bg-[#526e9c]/10 transition-colors"
               >
                 {t('modals.cancel')}
               </button>
               <button
                 type="button"
                 onClick={onConfirm}
                 className="flex-1 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all"
               >
                 {t('modals.confirm')}
               </button>
             </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#526e9c] hover:bg-[#526e9c]/10 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
