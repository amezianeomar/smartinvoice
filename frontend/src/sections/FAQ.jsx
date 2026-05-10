import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MessageCircleQuestion } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') }
  ];

  return (
    <section className="relative py-32 px-6 max-w-4xl mx-auto z-20">
      <div className="text-center mb-16">
        <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-[#18adf2]/20 bg-[#18adf2]/10 text-xs font-bold uppercase tracking-widest text-[#18adf2]">
          <MessageCircleQuestion size={14} />
          {t('faq.badge')}
        </span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
          {t('faq.title1')} <br className="hidden md:block" />
          <span className="text-[#221ab7] dark:text-[#18adf2]">{t('faq.title2')}</span>
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = index === openIndex;
          
          return (
            <motion.div 
              key={index}
              initial={false}
              animate={{ backgroundColor: isOpen ? 'rgba(34,26,183,0.05)' : 'transparent' }}
              className={`border border-[#526e9c]/20 rounded-2xl overflow-hidden transition-colors ${isOpen ? 'dark:bg-[#5048e5]/10' : 'bg-white dark:bg-[#1e293b]'}`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="w-full px-6 py-6 flex items-center justify-between gap-4 text-left"
              >
                <span className="font-bold text-lg text-[#0F172A] dark:text-white">
                  {faq.question}
                </span>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-[#221ab7] dark:bg-[#5048e5] text-white' : 'bg-[#526e9c]/10 text-[#526e9c]'}`}>
                  {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-[#526e9c] dark:text-[#94A3B8] leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
