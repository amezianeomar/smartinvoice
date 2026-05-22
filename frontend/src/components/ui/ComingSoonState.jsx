import React from 'react';
import { Rocket } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function ComingSoonState({ featureName }) {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
      <div className="w-full max-w-lg rounded-3xl bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl border border-[#526e9c]/20 p-8 md:p-12 shadow-2xl flex flex-col items-center text-center relative overflow-hidden group">
        
        {/* Fancy background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#18adf2]/10 rounded-full blur-[60px] group-hover:bg-[#18adf2]/20 transition-all duration-700" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#221ab7]/10 rounded-full blur-[60px] group-hover:bg-[#221ab7]/20 transition-all duration-700" />

        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#221ab7]/10 to-[#18adf2]/10 flex items-center justify-center mb-8 border border-[#18adf2]/20 relative z-10 shadow-[0_0_30px_rgba(24,173,242,0.15)]">
           <Rocket size={40} className="text-[#18adf2] group-hover:-translate-y-2 group-hover:scale-110 transition-all duration-500" />
        </div>
        
        <h2 className="text-3xl font-black text-[#0F172A] dark:text-white mb-4 relative z-10 tracking-tight">
          {featureName} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#221ab7] to-[#18adf2]">V2.0</span>
        </h2>
        
        <p className="text-[#526e9c] text-base leading-relaxed font-medium max-w-md relative z-10 mb-8">
          {t('comingSoon.description').replace('{feature}', featureName)}
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#526e9c]/5 border border-[#526e9c]/10 relative z-10">
          <div className="w-2 h-2 rounded-full bg-[#18adf2] animate-pulse"></div>
          <span className="text-xs font-bold text-[#526e9c] uppercase tracking-wider">{t('comingSoon.roadmap')}</span>
        </div>

      </div>
    </div>
  );
}
