import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export function LanguageSwitcher() {
  const { language, switchLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative" 
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center justify-center w-10 h-10 text-[#526e9c] hover:bg-[#526e9c]/10 rounded-full transition-colors relative">
        <Globe size={18} />
        <span className="absolute bottom-1 right-1 text-[8px] font-black uppercase bg-[#18adf2] text-white rounded-sm px-0.5">{language}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-[100%] right-0 mt-1 w-32 bg-white/95 dark:bg-[#131B2C]/95 backdrop-blur-3xl border border-[#526e9c]/20 shadow-2xl rounded-2xl overflow-hidden py-2 flex flex-col gap-1 z-50 pointer-events-auto"
          >
            <button
              onClick={() => switchLanguage('fr')}
              className={`w-full px-4 py-2 text-left text-sm font-bold flex items-center justify-between transition-colors
                ${language === 'fr' 
                  ? 'text-[#18adf2] bg-[#18adf2]/10' 
                  : 'text-[#0F172A] dark:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }
              `}
            >
              <span>Français</span>
              {language === 'fr' && <span className="text-xs">✓</span>}
            </button>
            <button
              onClick={() => switchLanguage('en')}
              className={`w-full px-4 py-2 text-left text-sm font-bold flex items-center justify-between transition-colors
                ${language === 'en' 
                  ? 'text-[#18adf2] bg-[#18adf2]/10' 
                  : 'text-[#0F172A] dark:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }
              `}
            >
              <span>English</span>
              {language === 'en' && <span className="text-xs">✓</span>}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
