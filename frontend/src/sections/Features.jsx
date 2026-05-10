import React from 'react';
import { FileText, Activity, Users, ArrowRight, CheckCircle2, Terminal, Shield, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge, Button, SpotlightCard, AnimatedCounter } from '../components/ui';
import { useLanguage } from '../context/LanguageContext';

// ==========================================
// CODE-BASED UI MOCKUPS (Replacing Images)
// ==========================================

const InvoiceMockup = () => (
  <SpotlightCard className="w-full bg-white dark:bg-[#080C16] border border-[#526e9c]/20 p-6 md:p-8 rounded-2xl flex flex-col gap-4 text-xs shadow-2xl h-auto">
    <div className="flex justify-between items-start border-b border-[#526e9c]/10 pb-4 relative z-10">
      <div>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#221ab7] to-[#18adf2] text-white font-black flex items-center justify-center mb-3 shadow-md">S</div>
        <p className="font-bold text-[#0F172A] dark:text-white text-sm">SI-PRO S.A.R.L</p>
        <p className="text-[#526e9c]">ICE: 000123456789</p>
      </div>
      <div className="text-right text-[#526e9c]">
        <h3 className="text-xl md:text-2xl font-black text-[#18adf2] uppercase tracking-widest mb-1">Facture</h3>
        <p className="font-bold">FAC-2026-001</p>
        <p>12 Avril 2026</p>
      </div>
    </div>
    <div className="bg-[#526e9c]/5 rounded-xl p-4 mt-2">
      <p className="font-bold text-[#0F172A] dark:text-white text-sm mb-1">Facturé à:</p>
      <p className="text-[#526e9c] text-sm">TechCorp Maroc<br/>Casablanca, 20000</p>
    </div>
    <table className="w-full mt-4 text-sm relative z-10">
      <thead className="text-[#526e9c] border-b border-[#526e9c]/10">
        <tr>
          <th className="text-left font-bold pb-3">Description</th>
          <th className="text-right font-bold pb-3">Montant</th>
        </tr>
      </thead>
      <tbody className="text-[#0F172A] dark:text-white">
        <tr>
          <td className="py-3 border-b border-[#526e9c]/5">Abonnement SaaS Annuel</td>
          <td className="text-right py-3 border-b border-[#526e9c]/5 font-bold">10,000 DH</td>
        </tr>
        <tr>
          <td className="py-3 border-b border-[#526e9c]/5">Setup & Formation</td>
          <td className="text-right py-3 border-b border-[#526e9c]/5 font-bold">2,500 DH</td>
        </tr>
      </tbody>
    </table>
    <div className="flex justify-end gap-8 mt-4 pt-4 border-t-2 border-[#18adf2]/20 relative z-10">
      <div className="text-right text-[#526e9c] space-y-2">
        <p>Sous-total</p>
        <p>TVA (20%)</p>
        <p className="text-base font-black text-[#0F172A] dark:text-white mt-2">Total TTC</p>
      </div>
      <div className="text-right font-bold text-[#0F172A] dark:text-white space-y-2">
        <p>12,500 DH</p>
        <p>2,500 DH</p>
        <p className="text-base font-black text-[#18adf2] mt-2">15,000 DH</p>
      </div>
    </div>
  </SpotlightCard>
);

const TvaMockup = () => (
  <SpotlightCard className="w-full bg-white dark:bg-[#080C16] border border-[#526e9c]/20 dark:border-[#526e9c]/30 p-6 md:p-8 rounded-2xl flex flex-col gap-8 text-sm text-[#0F172A] dark:text-white h-auto shadow-2xl relative overflow-hidden">
    {/* Grid Background inside mockup */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#526e9c15_1px,transparent_1px),linear-gradient(to_bottom,#526e9c15_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-30 z-0" />
    
    <div className="relative z-10 flex justify-between items-start">
      <div>
        <h3 className="font-bold text-[#94A3B8] uppercase text-xs tracking-widest mb-2">TVA Collectée (Q1 2026)</h3>
        <p className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-[#18adf2]">
          <AnimatedCounter value={45200} /> <span className="text-lg text-[#526e9c]">DH</span>
        </p>
      </div>
      <Badge pulse variant="success">Synchronisé</Badge>
    </div>
    
    <div className="relative z-10 space-y-5">
      <div>
        <div className="flex justify-between text-xs font-bold mb-2"><span className="text-[#18adf2]">Prestations de Service (20%)</span><span>38,000 DH</span></div>
        <div className="h-2 w-full bg-[#0F172A]/5 dark:bg-white/5 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} whileInView={{ width: '85%' }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-[#18adf2] rounded-full"/></div>
      </div>
      <div>
        <div className="flex justify-between text-xs font-bold mb-2"><span className="text-emerald-500 dark:text-emerald-400">Transport & Logistique (14%)</span><span>5,200 DH</span></div>
        <div className="h-2 w-full bg-[#0F172A]/5 dark:bg-white/5 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} whileInView={{ width: '11%' }} transition={{ duration: 1, delay: 0.4 }} className="h-full bg-emerald-500 dark:bg-emerald-400 rounded-full"/></div>
      </div>
      <div>
        <div className="flex justify-between text-xs font-bold mb-2"><span className="text-amber-500 dark:text-amber-400">Hébergement (10%)</span><span>2,000 DH</span></div>
        <div className="h-2 w-full bg-[#0F172A]/5 dark:bg-white/5 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} whileInView={{ width: '4%' }} transition={{ duration: 1, delay: 0.6 }} className="h-full bg-amber-500 dark:bg-amber-400 rounded-full"/></div>
      </div>
    </div>
    
    <div className="relative z-10 mt-auto bg-[#221ab7]/5 dark:bg-[#221ab7]/20 border border-[#221ab7]/20 dark:border-[#221ab7]/50 rounded-xl p-4 flex items-center justify-between backdrop-blur-md">
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-lg bg-[#221ab7]/10 dark:bg-[#5048e5]/20 text-[#221ab7] dark:text-[#5048e5]"><Shield size={20} /></div>
        <div>
          <p className="font-bold text-sm text-[#0F172A] dark:text-white">Déclaration Prête</p>
          <p className="text-xs text-[#526e9c] dark:text-[#94A3B8]">Conforme aux normes DGI</p>
        </div>
      </div>
      <div className="w-8 h-8 rounded-full bg-[#0F172A]/5 dark:bg-white/5 flex items-center justify-center hover:bg-[#0F172A]/10 dark:hover:bg-white/10 cursor-pointer transition-colors"><Download size={14} className="text-[#18adf2]" /></div>
    </div>
  </SpotlightCard>
);

const CrmMockup = () => (
  <SpotlightCard className="w-full h-auto bg-white dark:bg-[#0F172A] border border-[#526e9c]/20 p-6 md:p-8 rounded-3xl flex flex-col gap-6 shadow-2xl relative overflow-hidden">
    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none z-0" />
    
    <div className="flex justify-between items-center mb-2 z-10">
       <h3 className="font-black text-xl text-[#0F172A] dark:text-white tracking-tight">Répertoire Clients</h3>
       <div className="flex gap-2.5">
         <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
         <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
         <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
       </div>
    </div>
    
    <div className="space-y-3 z-10 flex-1 flex flex-col justify-center">
      {[
        { name: 'Othmane B.', company: 'Atlas Tech', amount: '12.5K', status: 'Payé', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
        { name: 'Karim F.', company: 'FinInvest', amount: '45.0K', status: 'En Attente', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
        { name: 'Nadia R.', company: 'Studio M', amount: '8.2K', status: 'Payé', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
        { name: 'Tarik S.', company: 'LogiX', amount: '105.0K', status: 'Retard', color: 'text-red-400 bg-red-500/10 border-red-500/20' },
      ].map((client, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="flex items-center justify-between text-sm bg-[#F8FAFC] dark:bg-white/5 border border-[#526e9c]/10 dark:border-white/5 p-4 rounded-xl hover:bg-[#526e9c]/5 dark:hover:bg-white/10 transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${client.color} border group-hover:scale-110 transition-transform`}>{client.name[0]}</div>
            <div>
              <p className="font-bold text-[#0F172A] dark:text-white text-base">{client.company}</p>
              <p className="text-xs text-[#526e9c] dark:text-[#94A3B8]">{client.name}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-black text-[#0F172A] dark:text-white text-base">{client.amount} MAD</p>
            <p className={`text-xs font-bold mt-1 ${client.color.split(' ')[0]}`}>{client.status}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </SpotlightCard>
);


// ==========================================
// MAIN COMPONENT
// ==========================================

export default function Features() {
  const { t } = useLanguage();
  return (
    <div className="relative max-w-7xl mx-auto px-6 py-32 z-10 space-y-40">
      
      {/* FEATURE 1: INVOICING */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="flex flex-col lg:flex-row items-center gap-16"
      >
        <div className="flex-1 space-y-8">
          <Badge variant="info" pulse><FileText size={14} /> {t('features.badge1')}</Badge>
          <h2 className="text-5xl md:text-6xl font-black leading-[1.1] tracking-tighter">
            {t('features.title1_1')} <span className="text-[#18adf2]">{t('features.title1_2')}</span>
          </h2>
          <p className="text-lg text-[#526e9c] dark:text-[#94A3B8] leading-relaxed max-w-md">
            {t('features.desc1')}
          </p>
          <Button variant="ghost" className="px-0 hover:bg-transparent text-[#18adf2] hover:text-[#138bc2] !justify-start group">
            {t('features.btn1')} <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="flex-1 w-full relative mt-10 lg:mt-0">
          <div className="absolute inset-0 bg-[#18adf2]/20 blur-[100px] rounded-full opacity-50 transition-opacity duration-700" />
          <div className="relative w-full z-10 transition-transform duration-500 hover:-translate-y-2">
             <InvoiceMockup />
          </div>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="absolute -bottom-6 -left-6 md:-left-12 bg-white dark:bg-[#080C16] border border-[#526e9c]/20 p-4 rounded-2xl shadow-xl flex items-center gap-4 z-20 animate-float"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-[#526e9c] uppercase tracking-wider">Facture #4092</p>
              <p className="text-sm font-black text-[#0F172A] dark:text-white">Envoyée avec succès</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* FEATURE 2: TVA & CODE SNIPPET */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="flex flex-col lg:flex-row-reverse items-center gap-16"
      >
        <div className="flex-1 space-y-8">
          <Badge variant="primary" pulse><Activity size={14} /> {t('features.badge2')}</Badge>
          <h2 className="text-5xl md:text-6xl font-black leading-[1.1] tracking-tighter">
            {t('features.title2_1')} <span className="text-[#221ab7] dark:text-[#5048e5]">{t('features.title2_2')}</span>
          </h2>
          <p className="text-lg text-[#526e9c] dark:text-[#94A3B8] leading-relaxed max-w-md">
            {t('features.desc2')}
          </p>
          <ul className="space-y-3">
            {[t('features.list2_1'), t('features.list2_2'), t('features.list2_3')].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm font-bold text-[#526e9c] dark:text-[#94A3B8]">
                <Shield size={16} className="text-[#221ab7] dark:text-[#5048e5] shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 w-full relative mt-10 lg:mt-0">
          <div className="relative z-10 w-full h-auto">
             <TvaMockup />
          </div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="hidden lg:block absolute -bottom-16 -right-10 w-80 bg-white dark:bg-[#0F172A] border border-[#526e9c]/20 dark:border-white/10 rounded-2xl shadow-2xl z-20 overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#526e9c]/10 dark:border-white/10 bg-[#F8FAFC] dark:bg-black/40">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <span className="ml-3 text-[10px] font-mono text-[#526e9c] tracking-wider uppercase">tax_engine.js</span>
            </div>
            <div className="p-5 bg-white dark:bg-[#0F172A] overflow-x-auto text-sm">
              <pre className="font-mono leading-relaxed">
                <code className="text-emerald-600 dark:text-emerald-400">const</code> <code className="text-blue-600 dark:text-blue-400">calculateTax</code> <code className="text-[#0F172A] dark:text-white">= (amount, type) =&gt; {'{'}</code><br/>
                <code className="text-[#526e9c]">  // Auto-apply Moroccan VAT</code><br/>
                <code className="text-[#0F172A] dark:text-white">  if (type === </code><code className="text-amber-600 dark:text-amber-300">'standard'</code><code className="text-[#0F172A] dark:text-white">) {'{'}</code><br/>
                <code className="text-purple-600 dark:text-purple-400">    return</code> <code className="text-[#0F172A] dark:text-white">amount * </code><code className="text-orange-600 dark:text-orange-400">0.20</code><code className="text-[#0F172A] dark:text-white">;</code><br/>
                <code className="text-[#0F172A] dark:text-white">  {'}'}</code><br/>
                <code className="text-[#0F172A] dark:text-white">{'}'};</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* FEATURE 3: CRM */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] bg-white dark:bg-[#080C16] border border-[#526e9c]/20 p-8 md:p-16 flex flex-col md:flex-row items-center gap-16 group shadow-[0_30px_100px_-20px_rgba(15,23,42,0.1)] dark:shadow-none"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent opacity-50" />
        
        <div className="flex-1 space-y-6 z-10">
          <Badge variant="success" pulse><Users size={14} /> {t('features.badge3')}</Badge>
          <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] dark:text-white leading-tight">
            {t('features.title3_1')} <span className="text-emerald-500">{t('features.title3_2')}</span>
          </h2>
          <p className="text-lg text-[#94A3B8] leading-relaxed max-w-sm">
            {t('features.desc3')}
          </p>
          <Button variant="primary" className="bg-emerald-500 hover:bg-emerald-600 text-white mt-4 border-none shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            {t('features.btn3')}
          </Button>
        </div>

        <div className="flex-1 w-full relative z-10 h-auto mt-10 lg:mt-0">
          <CrmMockup />
        </div>
      </motion.section>

    </div>
  );
}