import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Building2, Target, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import api from '../services/api';

const professions = [
  { id: 'dirigeant', label: 'Dirigeant / CEO', icon: Briefcase },
  { id: 'freelance', label: 'Indépendant / Freelance', icon: Target },
  { id: 'comptable', label: 'Expert Comptable', icon: Building2 },
  { id: 'autre', label: 'Autre', icon: CheckCircle2 }
];

const types_entreprise = [
  { id: 'tpe', label: 'TPE (1-9 employés)' },
  { id: 'pme', label: 'PME (10-249 employés)' },
  { id: 'eti', label: 'ETI (250+ employés)' },
  { id: 'auto-entrepreneur', label: 'Auto-entrepreneur' }
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    profession: '',
    type_entreprise: '',
    objectif_principal: ''
  });

  const handleSelect = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field !== 'objectif_principal') {
      setTimeout(() => setStep(prev => prev + 1), 400);
    }
  };

  const handleSubmit = async () => {
    if (!formData.objectif_principal) return;
    
    setIsLoading(true);
    try {
      await api.post('/onboarding', formData);
      navigate('/select-plan');
    } catch (error) {
      console.error('Onboarding error:', error);
      setIsLoading(false);
    }
  };

  const variants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 }
  };

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-[60vw] h-[60vw] bg-[radial-gradient(ellipse_at_center,_rgba(34,26,183,0.15)_0%,_transparent_70%)] rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-[radial-gradient(ellipse_at_center,_rgba(24,173,242,0.1)_0%,_transparent_70%)] rounded-full blur-[100px]" 
        />
      </div>

      <div className="w-full max-w-2xl bg-[#0F172A]/80 backdrop-blur-3xl rounded-[2rem] border border-white/10 p-8 sm:p-12 relative z-10 shadow-[0_0_50px_rgba(34,26,183,0.1)]">
        
        {/* Progress Bar */}
        <div className="flex gap-2 mb-12">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-1 flex-1 rounded-full bg-white/5 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#221ab7] to-[#18adf2]"
                initial={{ width: 0 }}
                animate={{ width: step >= i ? '100%' : '0%' }}
                transition={{ duration: 0.5 }}
              />
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={variants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl font-black text-white mb-2">Quel est votre rôle ?</h2>
              <p className="text-[#94A3B8] mb-8">Pour personnaliser votre expérience sur SI-PRO.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {professions.map(p => {
                  const Icon = p.icon;
                  const isSelected = formData.profession === p.label;
                  return (
                    <motion.button
                      key={p.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelect('profession', p.label)}
                      className={`p-6 rounded-2xl border text-left flex items-start gap-4 transition-all ${
                        isSelected 
                          ? 'border-[#18adf2] bg-[#18adf2]/10 shadow-[0_0_20px_rgba(24,173,242,0.2)]' 
                          : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className={`p-3 rounded-xl ${isSelected ? 'bg-[#18adf2]/20 text-[#18adf2]' : 'bg-white/5 text-[#94A3B8]'}`}>
                        <Icon size={24} />
                      </div>
                      <div className="mt-1 font-bold text-white">
                        {p.label}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={variants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl font-black text-white mb-2">Quel est votre type d'entreprise ?</h2>
              <p className="text-[#94A3B8] mb-8">Nous adapterons les outils de facturation à votre structure.</p>
              
              <div className="grid grid-cols-1 gap-4">
                {types_entreprise.map(t => {
                  const isSelected = formData.type_entreprise === t.label;
                  return (
                    <motion.button
                      key={t.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleSelect('type_entreprise', t.label)}
                      className={`p-5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isSelected 
                          ? 'border-[#18adf2] bg-[#18adf2]/10 shadow-[0_0_20px_rgba(24,173,242,0.2)]' 
                          : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className="font-bold text-white">{t.label}</span>
                      {isSelected && <CheckCircle2 className="text-[#18adf2]" size={20} />}
                    </motion.button>
                  );
                })}
              </div>
              <button onClick={() => setStep(1)} className="mt-8 text-sm text-[#94A3B8] hover:text-white transition-colors">
                ← Retour
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              variants={variants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl font-black text-white mb-2">Quel est votre objectif principal ?</h2>
              <p className="text-[#94A3B8] mb-8">Dernière étape avant d'accéder à votre espace.</p>
              
              <div className="space-y-6">
                <div className="relative group">
                  <input
                    type="text"
                    value={formData.objectif_principal}
                    onChange={(e) => handleSelect('objectif_principal', e.target.value)}
                    placeholder="Ex: Gagner du temps sur mes factures..."
                    className="w-full pl-6 pr-6 py-4 rounded-2xl border border-white/10 bg-white/5 text-white placeholder-[#526e9c] focus:ring-2 focus:ring-[#18adf2] focus:border-transparent transition-all outline-none text-lg"
                    autoFocus
                  />
                  <div className="absolute inset-0 border border-[#18adf2] rounded-2xl opacity-0 scale-95 group-focus-within:opacity-100 group-focus-within:scale-100 transition-all duration-300 pointer-events-none shadow-[0_0_15px_rgba(24,173,242,0.3)]" />
                </div>

                <div className="flex justify-between items-center pt-4">
                  <button onClick={() => setStep(2)} className="text-sm text-[#94A3B8] hover:text-white transition-colors">
                    ← Retour
                  </button>
                  <button 
                    onClick={handleSubmit}
                    disabled={isLoading || !formData.objectif_principal}
                    className="py-3 px-8 rounded-xl font-black text-white bg-gradient-to-r from-[#221ab7] to-[#18adf2] hover:opacity-90 transition-all shadow-[0_0_30px_rgba(24,173,242,0.4)] flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Terminer'}
                    {!isLoading && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
