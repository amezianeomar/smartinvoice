import { 
  Bell, Users, Activity, Search, LayoutDashboard, FileText, 
  Settings, Wallet, TrendingUp, CheckCircle2, Plus 
} from 'lucide-react';
import { Button, AnimatedCounter, MagneticWrapper } from '../components/ui';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const MobileMockup = ({ t }) => (
  <div className="w-[300px] sm:w-[320px] h-[600px] sm:h-[650px] bg-white dark:bg-[#080C16] border-[8px] border-[#1e293b] dark:border-[#0F172A] rounded-[2.5rem] shadow-2xl overflow-hidden relative flex flex-col shrink-0 z-30 ring-1 ring-white/10">
    {/* Dynamic Island */}
    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5 sm:h-6 bg-[#1e293b] dark:bg-[#0F172A] rounded-full z-50 shadow-inner"></div>
    
    {/* Top Window Bar (Mobile Style) */}
    <div className="h-14 sm:h-16 pt-5 sm:pt-6 border-b border-[#526e9c]/10 bg-[#F8FAFC] dark:bg-[#080C16] flex items-center justify-between px-4 shrink-0 relative z-40">
      <div className="font-black text-xs sm:text-sm uppercase tracking-tighter">SI-PRO</div>
      <div className="flex items-center gap-2 sm:gap-3">
        <Bell size={14} className="text-[#526e9c] sm:w-4 sm:h-4" />
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-tr from-[#221ab7] to-[#18adf2] text-white flex items-center justify-center font-bold text-[8px] sm:text-[10px]">SE</div>
      </div>
    </div>

    {/* Content */}
    <div className="flex-1 p-3 sm:p-4 pb-8 overflow-y-auto bg-[#F8FAFC]/50 dark:bg-transparent [&::-webkit-scrollbar]:hidden">
      <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-black tracking-tight leading-tight">{t('dashboardMockup.financialOverview')}</h2>
          <p className="text-[10px] sm:text-xs text-[#526e9c] font-medium mt-0.5">{t('dashboardMockup.fiscalYear')}</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-[#221ab7] dark:bg-[#5048e5] text-white px-4 py-2 sm:py-2.5 rounded-lg font-bold text-xs sm:text-sm shadow-lg w-full transition-transform hover:scale-105">
          <Plus size={14} className="sm:w-4 sm:h-4" /> {t('dashboardMockup.createInvoice')}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
        {/* Rev */}
        <div className="bg-white dark:bg-[#1e293b] p-2.5 sm:p-3 rounded-xl border border-[#526e9c]/20 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400"><Activity size={12} className="sm:w-4 sm:h-4" /></div>
            <span className="flex items-center gap-0.5 sm:gap-1 text-[8px] sm:text-[10px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-1 sm:px-1.5 py-0.5 rounded-md"><TrendingUp size={8} className="sm:w-2.5 sm:h-2.5" /> +24%</span>
          </div>
          <p className="text-[8px] sm:text-[10px] font-bold text-[#526e9c] uppercase mb-0.5 sm:mb-1">{t('dashboardMockup.revenue')}</p>
          <h3 className="text-base sm:text-lg font-black"><AnimatedCounter value={6.2} />M</h3>
        </div>
        {/* TVA */}
        <div className="bg-white dark:bg-[#1e293b] p-2.5 sm:p-3 rounded-xl border border-[#526e9c]/20 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400"><FileText size={12} className="sm:w-4 sm:h-4" /></div>
            <span className="flex items-center gap-0.5 sm:gap-1 text-[8px] sm:text-[10px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-1 sm:px-1.5 py-0.5 rounded-md"><TrendingUp size={8} className="sm:w-2.5 sm:h-2.5" /> +12%</span>
          </div>
          <p className="text-[8px] sm:text-[10px] font-bold text-[#526e9c] uppercase mb-0.5 sm:mb-1">{t('dashboardMockup.tvaCollected')}</p>
          <h3 className="text-base sm:text-lg font-black"><AnimatedCounter value={1.24} />M</h3>
        </div>
        {/* Clients */}
        <div className="bg-white dark:bg-[#1e293b] p-2.5 sm:p-3 rounded-xl border border-[#526e9c]/20 shadow-sm col-span-2">
          <div className="flex justify-between items-start mb-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400"><Users size={12} className="sm:w-4 sm:h-4" /></div>
            <span className="flex items-center gap-0.5 sm:gap-1 text-[8px] sm:text-[10px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-1 sm:px-1.5 py-0.5 rounded-md"><TrendingUp size={8} className="sm:w-2.5 sm:h-2.5" /> +45%</span>
          </div>
          <p className="text-[8px] sm:text-[10px] font-bold text-[#526e9c] uppercase mb-0.5 sm:mb-1">{t('dashboardMockup.clients')}</p>
          <h3 className="text-base sm:text-lg font-black"><AnimatedCounter value={650} /> <span className="text-[10px] sm:text-xs font-bold">{t('dashboardMockup.smes')}</span></h3>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        {/* Chart */}
        <div className="bg-white dark:bg-[#1e293b] border border-[#526e9c]/20 rounded-xl p-3 sm:p-4 flex flex-col">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <h3 className="font-bold text-xs sm:text-sm">{t('dashboardMockup.arrGrowth')}</h3>
            <div className="flex gap-1.5 sm:gap-2 text-[7px] sm:text-[8px] font-bold">
              <span className="flex items-center gap-1"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#18adf2]"/> Rev</span>
              <span className="flex items-center gap-1"><div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#221ab7] dark:bg-[#5048e5]"/> VAT</span>
            </div>
          </div>
          <div className="flex-1 min-h-[80px] sm:min-h-[100px] relative border-b border-l border-[#526e9c]/20 mb-1.5 sm:mb-2">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible pb-1 sm:pb-2 pl-1 sm:pl-2">
              <polyline points="0,80 25,60 50,45 75,25 100,10" fill="none" stroke="#18adf2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="0,95 25,85 50,75 75,60 100,50" fill="none" stroke="#221ab7" strokeWidth="2" strokeDasharray="4 2"/>
            </svg>
          </div>
          <div className="flex justify-between text-[7px] sm:text-[8px] font-bold text-[#526e9c]"><span>2021</span><span>2022</span><span>2023</span><span>2024</span><span>2025</span></div>
        </div>

        {/* Activities */}
        <div className="bg-white dark:bg-[#1e293b] border border-[#526e9c]/20 rounded-xl p-3 sm:p-4">
          <h3 className="font-bold text-xs sm:text-sm mb-3 sm:mb-4">{t('dashboardMockup.activities')}</h3>
          <div className="flex flex-col gap-2.5 sm:gap-3">
            {[
              { name: 'TechCorp S.A', amt: '4,500', status: t('dashboardMockup.paid') },
              { name: 'Maroc Logistics', amt: '12,000', status: t('dashboardMockup.paid') },
              { name: 'Studio Design', amt: '1,850', status: t('dashboardMockup.pending') },
            ].map((inv, i) => (
              <div key={i} className="flex justify-between items-center border-b border-[#526e9c]/10 pb-2 sm:pb-3 last:border-0 last:pb-0">
                <div className="flex gap-2 sm:gap-2.5 items-center">
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center ${inv.status === t('dashboardMockup.paid') ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}><CheckCircle2 size={10} className="sm:w-3 sm:h-3"/></div>
                  <div><p className="text-[9px] sm:text-[10px] font-bold">{inv.name}</p><p className="text-[7px] sm:text-[8px] text-[#526e9c]">{inv.status}</p></div>
                </div>
                <p className="text-[9px] sm:text-[10px] font-black">{inv.amt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative w-full overflow-visible">
      {/* 1. BACKGROUND GRIDS & GLOWS (Localized to Hero) */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#0F172A0A_1px,transparent_1px),linear-gradient(to_bottom,#0F172A0A_1px,transparent_1px)] bg-[size:4rem_4rem] dark:hidden" 
           style={{ WebkitMaskImage: 'radial-gradient(ellipse 80% 30% at 50% 0%, #000 70%, transparent 100%)' }} />
      <div className="absolute inset-0 z-0 hidden dark:block bg-[linear-gradient(to_right,#F8FAFC0A_1px,transparent_1px),linear-gradient(to_bottom,#F8FAFC0A_1px,transparent_1px)] bg-[size:4rem_4rem]" 
           style={{ WebkitMaskImage: 'radial-gradient(ellipse 80% 30% at 50% 0%, #000 70%, transparent 100%)' }} />
      
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[150px] opacity-40 dark:opacity-20 bg-[#221ab7] dark:bg-[#5048e5] pointer-events-none z-0" />
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-50 dark:opacity-20 bg-[#18adf2] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col">
        {/* 2. HERO CONTENT */}
        <main className="flex flex-col items-center pt-4 pb-12 text-center z-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-[#526e9c]/30 bg-[#526e9c]/10 text-xs font-bold uppercase tracking-widest text-[#526e9c] dark:text-[#94A3B8] backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#18adf2] animate-pulse"></span>
            {t('hero.badge')}
          </div>

          <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] md:leading-[1.05] mb-4 md:mb-6 max-w-4xl px-2">
            {t('hero.title1')}<br/>
            <span className="bg-[linear-gradient(110deg,#18adf2,45%,#5048e5,55%,#18adf2)] bg-[length:250%_100%] animate-[background-position_3s_infinite_linear] bg-clip-text text-transparent transition-colors duration-500">{t('hero.title2')}</span>
          </h1>

          <p className="text-base md:text-xl text-[#526e9c] dark:text-[#94A3B8] mb-8 md:mb-10 max-w-2xl leading-relaxed px-4">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center z-50">
            <MagneticWrapper>
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto shadow-[0_10px_30px_rgba(34,26,183,0.3)] shrink-0">
                  {t('hero.btnPrimary')}
                </Button>
              </Link>
            </MagneticWrapper>
            <MagneticWrapper>
              <Button variant="outline" size="lg" className="w-full sm:w-auto shrink-0">
                {t('hero.btnSecondary')}
              </Button>
            </MagneticWrapper>
          </div>
        </main>

        {/* 3. DASHBOARD VISUALS (Desktop + Mobile Showcase) */}
        <div className="relative w-full max-w-[1400px] mx-auto pb-24 z-20 animate-float flex justify-center items-center mt-6 md:mt-12">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[80%] h-full bg-gradient-to-b from-[#221ab7]/10 to-transparent dark:from-[#5048e5]/20 filter blur-3xl -z-10" />

          {/* DESKTOP MOCKUP - Hidden on mobile, shifted left on large screens */}
          <div className="hidden md:flex w-[85%] lg:w-[75%] bg-white dark:bg-[#131B2C] rounded-2xl border border-[#526e9c]/20 shadow-[0_30px_100px_-20px_rgba(15,23,42,0.3)] dark:shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden flex-col md:-translate-x-12 lg:-translate-x-20 transition-transform duration-500 hover:scale-[1.02]">
            
            {/* Top Window Bar */}
            <div className="h-14 border-b border-[#526e9c]/10 bg-[#F8FAFC] dark:bg-[#080C16] flex items-center justify-between px-6 shrink-0">
              <div className="flex gap-2.5">
                <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
              </div>
              <div className="flex items-center gap-3 bg-white dark:bg-[#131B2C] border border-[#526e9c]/20 px-4 py-1.5 rounded-md w-96 shadow-sm">
                <Search size={14} className="text-[#526e9c]" />
                <span className="text-xs text-[#526e9c] font-medium">{t('dashboardMockup.search')}</span>
              </div>
              <div className="flex items-center gap-4">
                <Bell size={18} className="text-[#526e9c]" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#221ab7] to-[#18adf2] text-white flex items-center justify-center font-bold text-xs">SE</div>
              </div>
            </div>

            <div className="flex h-[650px] overflow-hidden">
              {/* Sidebar */}
              <div className="w-64 border-r border-[#526e9c]/10 bg-[#F8FAFC]/30 dark:bg-[#0F172A]/30 p-6 flex flex-col gap-2 shrink-0">
                <p className="text-xs font-black text-[#526e9c] uppercase tracking-widest mb-4">{t('dashboardMockup.menu')}</p>
                <div className="flex items-center gap-3 bg-[#221ab7] dark:bg-[#5048e5] text-white px-4 py-3 rounded-xl shadow-md cursor-pointer">
                  <LayoutDashboard size={18} />
                  <span className="font-bold text-sm">{t('dashboardMockup.dashboard')}</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#526e9c] hover:bg-[#526e9c]/10 cursor-pointer"><FileText size={18} /><span className="font-bold text-sm">{t('dashboardMockup.invoices')}</span></div>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#526e9c] hover:bg-[#526e9c]/10 cursor-pointer"><Users size={18} /><span className="font-bold text-sm">{t('dashboardMockup.clients')}</span></div>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#526e9c] hover:bg-[#526e9c]/10 cursor-pointer mb-auto"><Wallet size={18} /><span className="font-bold text-sm">{t('dashboardMockup.payments')}</span></div>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#526e9c] hover:bg-[#526e9c]/10 cursor-pointer border-t border-[#526e9c]/10 pt-4"><Settings size={18} /><span className="font-bold text-sm">{t('dashboardMockup.settings')}</span></div>
              </div>

              {/* Dashboard Content */}
              <div className="flex-1 p-8 overflow-y-auto bg-white/50 dark:bg-transparent [&::-webkit-scrollbar]:hidden">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <h2 className="text-3xl font-black tracking-tight">{t('dashboardMockup.financialOverview')}</h2>
                    <p className="text-sm text-[#526e9c] font-medium mt-1">{t('dashboardMockup.fiscalYear')}</p>
                  </div>
                  <button className="flex items-center gap-2 bg-[#221ab7] dark:bg-[#5048e5] text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow-lg hover:scale-105 transition-transform">
                    <Plus size={16} /> {t('dashboardMockup.createInvoice')}
                  </button>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl border border-[#526e9c]/20 shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400"><Activity size={20} /></div>
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded-md"><TrendingUp size={12} /> +24%</span>
                    </div>
                    <p className="text-sm font-bold text-[#526e9c] uppercase mb-1">{t('dashboardMockup.revenue')}</p>
                    <h3 className="text-2xl font-black"><AnimatedCounter value={6.2} />M</h3>
                  </div>
                  <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl border border-[#526e9c]/20 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400"><FileText size={20} /></div>
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded-md"><TrendingUp size={12} /> +12%</span>
                    </div>
                    <p className="text-sm font-bold text-[#526e9c] uppercase mb-1">{t('dashboardMockup.tvaCollected')}</p>
                    <h3 className="text-2xl font-black"><AnimatedCounter value={1.24} />M</h3>
                  </div>
                  <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl border border-[#526e9c]/20 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400"><Users size={20} /></div>
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded-md"><TrendingUp size={12} /> +45%</span>
                    </div>
                    <p className="text-sm font-bold text-[#526e9c] uppercase mb-1">{t('dashboardMockup.clients')}</p>
                    <h3 className="text-2xl font-black"><AnimatedCounter value={650} /> <span className="text-base font-bold">{t('dashboardMockup.smes')}</span></h3>
                  </div>
                </div>

                {/* Graph Area */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-2 bg-white dark:bg-[#1e293b] border border-[#526e9c]/20 rounded-2xl p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-base">{t('dashboardMockup.arrGrowth')}</h3>
                      <div className="flex gap-2 text-[10px] font-bold">
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#18adf2]"/> {t('dashboardMockup.revLegend')}</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#221ab7] dark:bg-[#5048e5]"/> {t('dashboardMockup.tvaLegend')}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-h-[150px] relative border-b border-l border-[#526e9c]/20 mb-2">
                      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible pb-2 pl-2">
                        <polyline points="0,80 25,60 50,45 75,25 100,10" fill="none" stroke="#18adf2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="0,95 25,85 50,75 75,60 100,50" fill="none" stroke="#221ab7" strokeWidth="2" strokeDasharray="4 2"/>
                      </svg>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-[#526e9c]"><span>2021</span><span>2022</span><span>2023</span><span>2024</span><span>2025</span></div>
                  </div>

                  <div className="bg-white dark:bg-[#1e293b] border border-[#526e9c]/20 rounded-2xl p-6">
                    <h3 className="font-bold text-base mb-6">{t('dashboardMockup.activities')}</h3>
                    <div className="flex flex-col gap-4">
                      {[
                        { name: 'TechCorp S.A', amt: '4,500', status: t('dashboardMockup.paid') },
                        { name: 'Maroc Logistics', amt: '12,000', status: t('dashboardMockup.paid') },
                        { name: 'Studio Design', amt: '1,850', status: t('dashboardMockup.pending') },
                      ].map((inv, i) => (
                        <div key={i} className="flex justify-between items-center border-b border-[#526e9c]/10 pb-4 last:border-0 last:pb-0">
                          <div className="flex gap-3 items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${inv.status === t('dashboardMockup.paid') ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}><CheckCircle2 size={14}/></div>
                            <div><p className="text-xs font-bold">{inv.name}</p><p className="text-[10px] text-[#526e9c]">{inv.status}</p></div>
                          </div>
                          <p className="text-xs font-black">{inv.amt}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE MOCKUP - Overlapping on Desktop, Centered on Mobile */}
          <div className="flex md:absolute md:right-[2%] lg:right-[8%] md:top-12 z-30 transition-transform duration-500 hover:scale-[1.05]">
             <MobileMockup t={t} />
          </div>
        </div>
      </div>
    </section>
  );
}