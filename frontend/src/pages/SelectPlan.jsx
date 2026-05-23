import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Loader2, Zap } from 'lucide-react';
import api from '../services/api';
import { useLanguage } from '../context/LanguageContext';

export default function SelectPlan() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectPlan = async (plan) => {
    setIsLoading(plan);
    try {
      await api.post('/select-plan', { abonnement: plan });
      if (plan === 'pro') {
        navigate('/checkout');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Plan selection error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} 
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[radial-gradient(ellipse_at_center,_rgba(34,26,183,0.15)_0%,_transparent_60%)] rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(ellipse_at_center,_rgba(24,173,242,0.15)_0%,_transparent_60%)] rounded-full blur-[120px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#18adf2] text-sm font-bold mb-6"
          >
            <Zap size={16} /> {t('selectPlan.step')}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            {t('selectPlan.title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-[#94A3B8] max-w-2xl mx-auto"
          >
            {t('selectPlan.subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Free Plan */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[#0F172A]/60 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-8 sm:p-10 flex flex-col hover:border-white/20 transition-colors"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-black text-white mb-2">{t('selectPlan.free.title')}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-white">{t('selectPlan.free.price')}</span>
                <span className="text-[#94A3B8]">{t('selectPlan.free.period')}</span>
              </div>
              <p className="mt-4 text-[#94A3B8]">{t('selectPlan.free.desc')}</p>
            </div>
            
            <ul className="space-y-4 mb-10 flex-grow">
              {Object.keys(t('selectPlan.free'))
                .filter(key => key.startsWith('f'))
                .map(key => (
                  <Feature key={key} text={t(`selectPlan.free.${key}`)} />
                ))}
            </ul>
            
            <button 
              onClick={() => handleSelectPlan('gratuit')}
              disabled={isLoading}
              className="w-full py-4 rounded-xl font-bold text-white border-2 border-white/10 hover:bg-white/5 transition-all flex justify-center items-center gap-2"
            >
              {isLoading === 'gratuit' ? <Loader2 className="animate-spin" size={20} /> : t('selectPlan.free.btn')}
            </button>
          </motion.div>

          {/* Pro Plan */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-b from-[#1E293B] to-[#0F172A] backdrop-blur-xl rounded-[2.5rem] border-2 border-[#18adf2]/50 p-8 sm:p-10 flex flex-col relative shadow-[0_0_50px_rgba(24,173,242,0.15)]"
          >
            {/* Popular Badge */}
            <div className="absolute top-0 right-10 -translate-y-1/2">
              <span className="bg-gradient-to-r from-[#221ab7] to-[#18adf2] text-white text-xs font-black uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg">
                {t('selectPlan.pro.badge')}
              </span>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-black text-white mb-2">{t('selectPlan.pro.title')}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-white">{t('selectPlan.pro.price')}</span>
                <span className="text-[#94A3B8]">{t('selectPlan.pro.period')}</span>
              </div>
              <p className="mt-4 text-[#18adf2] font-semibold">{t('selectPlan.pro.desc')}</p>
            </div>
            
            <ul className="space-y-4 mb-10 flex-grow">
              {Object.keys(t('selectPlan.pro'))
                .filter(key => key.startsWith('f'))
                .map(key => (
                  <Feature key={key} text={t(`selectPlan.pro.${key}`)} highlight />
                ))}
            </ul>
            
            <button 
              onClick={() => handleSelectPlan('pro')}
              disabled={isLoading}
              className="w-full py-4 rounded-xl font-black text-white bg-gradient-to-r from-[#221ab7] to-[#18adf2] hover:opacity-90 transition-all shadow-[0_0_30px_rgba(24,173,242,0.4)] flex justify-center items-center gap-2 hover:scale-[1.02]"
            >
              {isLoading === 'pro' ? <Loader2 className="animate-spin" size={20} /> : t('selectPlan.pro.btn')}
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

function Feature({ text, highlight }) {
  return (
    <li className="flex items-start gap-3">
      <div className={`mt-0.5 rounded-full p-0.5 ${highlight ? 'bg-[#18adf2]/20 text-[#18adf2]' : 'bg-white/10 text-white/60'}`}>
        <Check size={14} strokeWidth={3} />
      </div>
      <span className={`${highlight ? 'text-white font-medium' : 'text-[#94A3B8]'}`}>{text}</span>
    </li>
  );
}
