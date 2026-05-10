import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Button, LanguageSwitcher } from './ui';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ isDark, setIsDark }) {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Shrink logic: Detect when user scrolls down more than 40px
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      if (window.scrollY > 40) {
          setIsMobileMenuOpen(false); // Close menu on scroll
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] flex flex-col items-center pointer-events-none">
      <nav 
        className={`mt-0 transition-all duration-500 ease-in-out pointer-events-auto flex items-center justify-between
          ${isScrolled 
            ? 'mt-4 w-[95%] md:w-[75%] py-2 md:py-3 px-4 md:px-8 rounded-full bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl border border-[#526e9c]/20 shadow-xl' 
            : 'w-full py-4 md:py-8 px-4 md:px-12 bg-transparent border-transparent'
          }`}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <img 
            src="/images/logo-icon.png" 
            alt="Logo" 
            className={`object-contain transition-all duration-500 group-hover:rotate-6 ${isScrolled ? 'w-8 h-8 md:w-12 md:h-12' : 'w-10 h-10 md:w-16 md:h-16'}`} 
          />
          <span className={`font-black tracking-tighter uppercase transition-all duration-500 ${isScrolled ? 'text-base md:text-lg' : 'text-lg md:text-2xl'}`}>
            SI<span className="text-[#18adf2]">-</span>PRO
          </span>
        </div>
        
        {/* Navigation Links - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-bold text-[#526e9c] hover:text-[#18adf2] transition-colors">{t('nav.features')}</a>
          <a href="#pricing" className="text-sm font-bold text-[#526e9c] hover:text-[#18adf2] transition-colors">{t('nav.pricing')}</a>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 md:gap-4">
          <LanguageSwitcher />

          <button 
            onClick={() => setIsDark(!isDark)} 
            className="p-2 rounded-full bg-[#526e9c]/10 hover:bg-[#526e9c]/20 text-[#526e9c] transition-transform hover:scale-110"
            title="Changer le thème"
          >
            {isDark ? (
              <Sun size={18} className="text-amber-400" />
            ) : (
              <Moon size={18} className="text-[#221ab7]" />
            )}
          </button>
          
          <Link to="/register" className="hidden md:block">
            <Button variant="primary" size={isScrolled ? 'sm' : 'md'} className="rounded-full px-6">
              {t('nav.start')}
            </Button>
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 rounded-full bg-[#526e9c]/10 text-[#526e9c]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer (Framer Motion) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pointer-events-auto absolute top-[110%] w-[90%] left-[5%] p-2"
          >
            <div className="rounded-3xl bg-white/95 dark:bg-[#131B2C]/95 backdrop-blur-xl border border-[#526e9c]/20 shadow-2xl p-6 flex flex-col gap-6">
              <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-[#0F172A] dark:text-white border-b border-[#526e9c]/10 pb-4">{t('nav.features')}</a>
              <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-[#0F172A] dark:text-white border-b border-[#526e9c]/10 pb-4">{t('nav.pricing')}</a>
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-[#526e9c]">{t('nav.login')}</Link>
              <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full">{t('nav.startFree')}</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}