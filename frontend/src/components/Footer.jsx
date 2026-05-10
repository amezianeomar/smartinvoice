import React from 'react';
import { ArrowRight, Globe, MessageCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative pt-32 pb-10 border-t border-[#526e9c]/10 bg-white/50 dark:bg-[#080C16]/50 backdrop-blur-md z-10">
      
      {/* ================================================== */}
      {/* 1. THE PREMIUM CALL TO ACTION (Linear/Vercel Style) */}
      {/* ================================================== */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 mb-20 md:mb-32">
        <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-[#080C16] border border-[#526e9c]/20 p-8 md:p-24 text-center flex flex-col items-center shadow-2xl group">

          {/* Animated Glowing Orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#18adf2] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#5048e5] rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />

          {/* High-Tech Grid Mask (Fades out at the edges) */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#526e9c15_1px,transparent_1px),linear-gradient(to_bottom,#526e9c15_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

          {/* Content Layer (Glassmorphism) */}
          <div className="relative z-10 flex flex-col items-center">
            
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-bold mb-8 backdrop-blur-md shadow-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              {t('footer.ctaBadge')}
            </div>

            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-4 md:mb-6 leading-[1.1] max-w-3xl">
              {t('footer.ctaTitle1')} <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#18adf2] to-[#5048e5]">{t('footer.ctaTitle2')}</span>
            </h2>

            <p className="text-[#94A3B8] text-sm md:text-xl mb-8 md:mb-12 max-w-2xl leading-relaxed">
              {t('footer.ctaDesc')}
            </p>

            {/* Premium Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
              <Link to="/register" className="px-6 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-black text-white bg-gradient-to-r from-[#221ab7] to-[#18adf2] hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(24,173,242,0.6)] flex items-center justify-center gap-2 md:gap-3 group/btn text-sm md:text-base">
                {t('footer.ctaBtn1')}
                <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-2 md:w-5 md:h-5" />
              </Link>
              <Link to="/register" className="px-6 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-bold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-md flex items-center justify-center text-sm md:text-base">
                {t('footer.ctaBtn2')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* 2. FOOTER LINKS                                  */}
      {/* ================================================== */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
        
        {/* Brand Column */}
        <div className="col-span-2 lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <img src="/images/logo-icon.png" alt="Logo" className="w-16 h-16 object-contain drop-shadow-[0_0_15px_rgba(24,173,242,0.4)]" />
            <span className="font-black text-2xl tracking-tighter uppercase">SI-PRO</span>
          </div>
          <p className="text-[#526e9c] dark:text-[#94A3B8] max-w-sm leading-relaxed">
            {t('footer.desc')}
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-[#526e9c]/10 text-[#526e9c] hover:bg-[#18adf2] hover:text-white flex items-center justify-center transition-all"><Globe size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-[#526e9c]/10 text-[#526e9c] hover:bg-[#221ab7] hover:text-white flex items-center justify-center transition-all"><MessageCircle size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-[#526e9c]/10 text-[#526e9c] hover:bg-gray-800 hover:text-white flex items-center justify-center transition-all"><Mail size={18} /></a>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="space-y-6">
          <h4 className="font-black uppercase tracking-wider text-xs text-[#0F172A] dark:text-white">{t('footer.col1')}</h4>
          <ul className="space-y-4 text-sm font-medium text-[#526e9c] dark:text-[#94A3B8]">
            <li><a href="#" className="hover:text-[#18adf2] transition-colors">{t('footer.col1_1')}</a></li>
            <li><a href="#" className="hover:text-[#18adf2] transition-colors">{t('footer.col1_2')}</a></li>
            <li><a href="#" className="hover:text-[#18adf2] transition-colors">{t('footer.col1_3')}</a></li>
            <li><a href="#" className="hover:text-[#18adf2] transition-colors">{t('footer.col1_4')}</a></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="space-y-6">
          <h4 className="font-black uppercase tracking-wider text-xs text-[#0F172A] dark:text-white">{t('footer.col2')}</h4>
          <ul className="space-y-4 text-sm font-medium text-[#526e9c] dark:text-[#94A3B8]">
            <li><a href="#" className="hover:text-[#18adf2] transition-colors">{t('footer.col2_1')}</a></li>
            <li><a href="#" className="hover:text-[#18adf2] transition-colors">{t('footer.col2_2')}</a></li>
            <li><a href="#" className="hover:text-[#18adf2] transition-colors">{t('footer.col2_3')}</a></li>
          </ul>
        </div>

        {/* Links Column 3 */}
        <div className="space-y-6">
          <h4 className="font-black uppercase tracking-wider text-xs text-[#0F172A] dark:text-white">{t('footer.col3')}</h4>
          <ul className="space-y-4 text-sm font-medium text-[#526e9c] dark:text-[#94A3B8]">
            <li><a href="#" className="hover:text-[#18adf2] transition-colors">{t('footer.col3_1')}</a></li>
            <li><a href="#" className="hover:text-[#18adf2] transition-colors">{t('footer.col3_2')}</a></li>
            <li><a href="#" className="hover:text-[#18adf2] transition-colors">{t('footer.col3_3')}</a></li>
          </ul>
        </div>
      </div>

      {/* 3. COPYRIGHT BAR */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-[#526e9c]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-[#526e9c]">
        <p>{t('footer.copyright')}</p>
        <p className="flex items-center gap-1">
           {t('footer.madeIn')}
        </p>
      </div>
      
    </footer>
  );
}