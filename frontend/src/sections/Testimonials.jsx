import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Testimonials() {
  const { t } = useLanguage();

  const testimonials = [
    {
      ...t('testimonials.t1'),
      color: '#18adf2',
      baseClasses: 'md:-rotate-6 md:-translate-x-4 md:-translate-y-2 z-10',
      gridClasses: 'md:group-hover:rotate-0 md:group-hover:-translate-x-[105%] md:group-hover:-translate-y-[60%]',
    },
    {
      ...t('testimonials.t2'),
      color: '#221ab7',
      baseClasses: 'md:rotate-3 md:translate-x-2 md:-translate-y-4 z-30',
      gridClasses: 'md:group-hover:rotate-0 md:group-hover:translate-x-0 md:group-hover:-translate-y-[60%]',
    },
    {
      ...t('testimonials.t3'),
      color: '#10b981',
      baseClasses: 'md:-rotate-3 md:translate-x-6 md:translate-y-2 z-20',
      gridClasses: 'md:group-hover:rotate-0 md:group-hover:translate-x-[105%] md:group-hover:-translate-y-[60%]',
    },
    {
      ...t('testimonials.t4'),
      color: '#f59e0b',
      baseClasses: 'md:rotate-6 md:-translate-x-8 md:translate-y-4 z-40',
      gridClasses: 'md:group-hover:rotate-0 md:group-hover:-translate-x-[105%] md:group-hover:translate-y-[60%]',
    },
    {
      ...t('testimonials.t5'),
      color: '#8b5cf6',
      baseClasses: 'md:-rotate-12 md:-translate-x-2 md:translate-y-6 z-50',
      gridClasses: 'md:group-hover:rotate-0 md:group-hover:translate-x-0 md:group-hover:translate-y-[60%]',
    },
    {
      ...t('testimonials.t6'),
      color: '#ec4899',
      baseClasses: 'md:rotate-12 md:translate-x-8 md:-translate-y-2 z-0',
      gridClasses: 'md:group-hover:rotate-0 md:group-hover:translate-x-[105%] md:group-hover:translate-y-[60%]',
    },
  ];
  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      id="proof" 
      className="relative py-32 px-6 max-w-7xl mx-auto z-20"
    >
      {/* Heading */}
      <div className="text-center mb-16">
        <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 size={14} />
          {t('testimonials.badge')}
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
          {t('testimonials.title1')} <br />
          <span className="text-[#221ab7] dark:text-[#18adf2]">{t('testimonials.title2')}</span>
        </h2>
        <p className="text-[#526e9c] dark:text-[#94A3B8] max-w-2xl mx-auto text-lg">
          {t('testimonials.subtitle')}
        </p>
      </div>

      {/* The Container is tall enough to fit the 2 rows on desktop. 
        On mobile, it becomes a horizontal scrollable snap container.
      */}
      <div className="relative flex overflow-x-auto md:overflow-visible snap-x snap-mandatory py-10 md:py-0 px-6 md:px-0 gap-6 md:gap-0 justify-start md:justify-center items-center h-auto md:h-[700px] group cursor-pointer w-[100vw] -ml-6 md:w-auto md:ml-0 [&::-webkit-scrollbar]:hidden">
        
        {/* Placeholder text visible before hover, fades out on hover */}
        <div className="absolute z-0 text-[#526e9c]/30 font-black text-2xl uppercase tracking-[0.5em] transition-opacity duration-500 group-hover:opacity-0 hidden md:block">
          {t('testimonials.hover')}
        </div>

        {testimonials.map((item, i) => (
          <div
            key={i}
            className={`
              relative shrink-0 snap-center md:absolute w-[85vw] md:w-full max-w-[320px] p-8 rounded-[2rem] 
              bg-white/90 dark:bg-[#131B2C]/90 backdrop-blur-md
              border border-[#526e9c]/20 shadow-xl md:shadow-2xl
              transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
              ${item.baseClasses}
              ${item.gridClasses}
              /* When hovering an individual card in the grid, it pops up further */
              hover:!scale-105 hover:!z-50 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)]
            `}
          >
            {/* Colored top border line for premium feel */}
            <div 
              className="absolute top-0 left-0 right-0 h-1 rounded-t-[2rem] opacity-50" 
              style={{ backgroundColor: item.color }} 
            />

            <div className="relative z-10 space-y-6">
              {/* Stars */}
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="text-amber-400 text-lg">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#0F172A] dark:text-[#F8FAFC] text-sm font-medium leading-relaxed">
                "{item.quote}"
              </p>

              {/* Author Profile */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#526e9c]/10">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-xs shadow-md"
                  style={{ backgroundColor: item.color }}
                >
                  {item.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-tight">{item.name}</h4>
                  <p className="text-[10px] text-[#526e9c] dark:text-[#94A3B8] font-bold uppercase tracking-wider mt-0.5">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}