import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button, SpotlightCard } from '../components/ui';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Pricing() {
  const { t } = useLanguage();
  return (
    <section id="pricing" className="relative py-20 md:py-32 px-4 md:px-6 max-w-7xl mx-auto z-20">
      <div className="text-center mb-12 md:mb-20">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
          {t('pricing.title1')} <br className="md:hidden" />
          <span className="text-[#221ab7] dark:text-[#18adf2]">{t('pricing.title2')}</span>
        </h2>
        <p className="text-sm md:text-base text-[#526e9c] dark:text-[#94A3B8] max-w-lg mx-auto">{t('pricing.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        
        {/* PLAN 1: STARTER */}
        <SpotlightCard className="p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white dark:bg-[#131B2C] border border-[#526e9c]/10 flex flex-col transition-transform duration-500 hover:scale-105 shadow-xl">
          <h4 className="font-bold text-xl mb-2">{t('pricing.starter.name')}</h4>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-4xl md:text-5xl font-black">0</span>
            <span className="text-[#526e9c] font-bold">{t('pricing.month')}</span>
          </div>
          <p className="text-xs md:text-sm text-[#526e9c] mb-8">{t('pricing.starter.desc')}</p>
          <ul className="space-y-4 mb-10 flex-1">
            {[t('pricing.starter.f1'), t('pricing.starter.f2'), t('pricing.starter.f3'), t('pricing.starter.f4')].map((feat) => (
              <li key={feat} className="flex items-center gap-3 text-xs md:text-sm font-medium">
                <CheckCircle2 size={16} className="text-emerald-500 md:w-[18px] md:h-[18px]" /> {feat}
              </li>
            ))}
          </ul>
          <Link to="/register"><Button variant="outline" className="w-full py-3 md:py-4 text-sm md:text-base">{t('pricing.starter.btn')}</Button></Link>
        </SpotlightCard>

        {/* PLAN 2: PROFESSIONAL (The "Featured" One) */}
        <div className="relative flex flex-col scale-100 md:scale-110 z-10 mt-8 md:mt-0">
          <SpotlightCard className="p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] bg-[#221ab7] dark:bg-[#5048e5] text-white flex flex-col shadow-2xl shadow-[#221ab7]/40 border border-white/10 h-full">
            <h4 className="font-bold text-xl mb-2">{t('pricing.pro.name')}</h4>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl md:text-5xl font-black">299</span>
              <span className="opacity-70 font-bold">{t('pricing.month')}</span>
            </div>
            <p className="text-xs md:text-sm opacity-80 mb-8">{t('pricing.pro.desc')}</p>
            <ul className="space-y-4 mb-10 flex-1">
              {[t('pricing.pro.f1'), t('pricing.pro.f2'), t('pricing.pro.f3'), t('pricing.pro.f4'), t('pricing.pro.f5')].map((feat) => (
                <li key={feat} className="flex items-center gap-3 text-xs md:text-sm font-bold">
                  <CheckCircle2 size={16} className="text-[#18adf2] md:w-[18px] md:h-[18px]" /> {feat}
                </li>
              ))}
            </ul>
            <Link to="/register"><Button className="w-full py-3 md:py-4 text-sm md:text-base !bg-white dark:!bg-white !text-[#221ab7] dark:!text-[#5048e5] hover:scale-105 hover:!bg-gray-50 transition-transform shadow-xl border-none">{t('pricing.pro.btn')}</Button></Link>
          </SpotlightCard>
          
          {/* Badge moved outside SpotlightCard to avoid overflow-hidden crop */}
          <div className="absolute top-0 right-6 md:right-10 -translate-y-1/2 bg-[#18adf2] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg pointer-events-none">
            {t('pricing.pro.badge')}
          </div>
        </div>

        {/* PLAN 3: ENTERPRISE */}
        <SpotlightCard className="p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white dark:bg-[#131B2C] border border-[#526e9c]/10 flex flex-col transition-transform duration-500 hover:scale-105 shadow-xl mt-8 md:mt-0">
          <h4 className="font-bold text-xl mb-2">{t('pricing.business.name')}</h4>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-4xl md:text-5xl font-black">899</span>
            <span className="text-[#526e9c] font-bold">{t('pricing.month')}</span>
          </div>
          <p className="text-xs md:text-sm text-[#526e9c] mb-8">{t('pricing.business.desc')}</p>
          <ul className="space-y-4 mb-10 flex-1">
            {[t('pricing.business.f1'), t('pricing.business.f2'), t('pricing.business.f3'), t('pricing.business.f4')].map((feat) => (
              <li key={feat} className="flex items-center gap-3 text-xs md:text-sm font-medium">
                <CheckCircle2 size={16} className="text-emerald-500 md:w-[18px] md:h-[18px]" /> {feat}
              </li>
            ))}
          </ul>
          <Link to="/register"><Button variant="outline" className="w-full py-3 md:py-4 text-sm md:text-base">{t('pricing.business.btn')}</Button></Link>
        </SpotlightCard>

      </div>
    </section>
  );
}