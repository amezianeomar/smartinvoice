import React from 'react';
import { ArrowRight, Globe, MessageCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative pt-32 pb-10 border-t border-[#526e9c]/10 bg-white/50 dark:bg-[#080C16]/50 backdrop-blur-md z-10">
      
      {/* ================================================== */}
      {/* 1. THE PREMIUM CALL TO ACTION (Linear/Vercel Style) */}
      {/* ================================================== */}
      <div className="max-w-6xl mx-auto px-6 mb-32">
        <div className="relative rounded-[3rem] overflow-hidden bg-[#080C16] border border-[#526e9c]/20 p-12 md:p-24 text-center flex flex-col items-center shadow-2xl group">

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
              Rejoignez 650+ PME Marocaines
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-[1.1] max-w-3xl">
              Passez à la vitesse <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#18adf2] to-[#5048e5]">supérieure.</span>
            </h2>

            <p className="text-[#94A3B8] text-lg md:text-xl mb-12 max-w-2xl leading-relaxed">
              Arrêtez de courir après vos paiements. Automatisez votre facturation, suivez votre trésorerie et gagnez des heures chaque semaine.
            </p>

            {/* Premium Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link to="/register" className="px-10 py-5 rounded-2xl font-black text-white bg-gradient-to-r from-[#221ab7] to-[#18adf2] hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(24,173,242,0.6)] flex items-center justify-center gap-3 group/btn">
                Démarrer Gratuitement
                <ArrowRight size={20} className="transition-transform group-hover/btn:translate-x-2" />
              </Link>
              <Link to="/register" className="px-10 py-5 rounded-2xl font-bold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-md flex items-center justify-center">
                Voir la Démo
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
            La plateforme de facturation intelligente conçue pour les freelances et PME marocaines. Simplifiez vos finances dès aujourd'hui.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-[#526e9c]/10 text-[#526e9c] hover:bg-[#18adf2] hover:text-white flex items-center justify-center transition-all"><Globe size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-[#526e9c]/10 text-[#526e9c] hover:bg-[#221ab7] hover:text-white flex items-center justify-center transition-all"><MessageCircle size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-[#526e9c]/10 text-[#526e9c] hover:bg-gray-800 hover:text-white flex items-center justify-center transition-all"><Mail size={18} /></a>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="space-y-6">
          <h4 className="font-black uppercase tracking-wider text-xs text-[#0F172A] dark:text-white">Produit</h4>
          <ul className="space-y-4 text-sm font-medium text-[#526e9c] dark:text-[#94A3B8]">
            <li><a href="#" className="hover:text-[#18adf2] transition-colors">Fonctionnalités</a></li>
            <li><a href="#" className="hover:text-[#18adf2] transition-colors">Tarifs</a></li>
            <li><a href="#" className="hover:text-[#18adf2] transition-colors">Moteur TVA</a></li>
            <li><a href="#" className="hover:text-[#18adf2] transition-colors">API</a></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="space-y-6">
          <h4 className="font-black uppercase tracking-wider text-xs text-[#0F172A] dark:text-white">Ressources</h4>
          <ul className="space-y-4 text-sm font-medium text-[#526e9c] dark:text-[#94A3B8]">
            <li><a href="#" className="hover:text-[#18adf2] transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-[#18adf2] transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-[#18adf2] transition-colors">Centre d'aide</a></li>
          </ul>
        </div>

        {/* Links Column 3 */}
        <div className="space-y-6">
          <h4 className="font-black uppercase tracking-wider text-xs text-[#0F172A] dark:text-white">Légal</h4>
          <ul className="space-y-4 text-sm font-medium text-[#526e9c] dark:text-[#94A3B8]">
            <li><a href="#" className="hover:text-[#18adf2] transition-colors">Mentions Légales</a></li>
            <li><a href="#" className="hover:text-[#18adf2] transition-colors">Confidentialité</a></li>
            <li><a href="#" className="hover:text-[#18adf2] transition-colors">CGV</a></li>
          </ul>
        </div>
      </div>

      {/* 3. COPYRIGHT BAR */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-[#526e9c]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-[#526e9c]">
        <p>© 2026 SmartInvoice Pro. Tous droits réservés.</p>
        <p className="flex items-center gap-1">
           à Tanger
        </p>
      </div>
      
    </footer>
  );
}