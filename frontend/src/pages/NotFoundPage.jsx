import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Ghost, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#030712] overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[radial-gradient(ellipse_at_center,_rgba(34,26,183,0.15)_0%,_transparent_70%)] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="relative"
        >
          <motion.div 
            animate={{ y: [0, -15, 0] }} 
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="text-[#18adf2] mb-8 drop-shadow-[0_0_30px_rgba(24,173,242,0.4)]"
          >
            <Ghost size={120} strokeWidth={1} />
          </motion.div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-7xl md:text-9xl font-black text-white tracking-tighter mb-4"
        >
          4<span className="text-[#18adf2]">0</span>4
        </motion.h1>

        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-bold text-white mb-4"
        >
          {t("notFound.title")}
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-[#94A3B8] text-lg mb-10"
        >
          {t("notFound.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link 
            to="/" 
            className="flex items-center gap-3 px-8 py-4 rounded-xl font-black text-white bg-gradient-to-r from-[#221ab7] to-[#18adf2] hover:opacity-90 transition-all shadow-[0_0_30px_rgba(24,173,242,0.4)] group"
          >
            <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
            {t("notFound.backHome")}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
