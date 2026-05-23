import React from 'react';
import {
  TrendingUp, TrendingDown, Activity, FileText,
  Users, Clock, Loader2, ArrowUpRight, AlertTriangle, Inbox
} from 'lucide-react';
import MonthlySalesChart from '../components/dashboard/MonthlySalesChart';
import api from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { useQuery } from '@tanstack/react-query';

// Helper to format values elegantly
function formatNumber(value) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000)     return `${(value / 1_000).toFixed(1)}K`;
  return String(Math.round(value));
}

// ─── Stat Card Component ───
function StatCard({ icon, label, value, sub, accentClass, glowClass, isCurrency = false }) {
  return (
    <div className="rounded-3xl bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl border border-[#526e9c]/20 p-6 shadow-xl relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-32 h-32 ${glowClass} rounded-full blur-3xl pointer-events-none`} />
      <div className={`w-12 h-12 rounded-xl ${accentClass} flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h4 className="text-sm font-bold text-[#526e9c] uppercase tracking-wider">{label}</h4>
      <div className="mt-2 flex items-baseline justify-between overflow-hidden gap-1.5">
        <div className="flex items-baseline gap-1.5 overflow-hidden">
          <span className="truncate text-2xl lg:text-xl xl:text-3xl font-black text-[#0F172A] dark:text-white tracking-tight">
            {value}
          </span>
          {isCurrency && (
            <span className="shrink-0 text-sm font-bold text-[#526e9c]">MAD</span>
          )}
        </div>
        {sub && (
          <span className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md shrink-0">
            {sub}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Donut Chart (CSS conic-gradient based on database values) ───
function DonutChart({ donutData, totalInvoices }) {
  const { t } = useLanguage();
  const paidVal = donutData?.find(item => item.name === 'Payées')?.value ?? 0;
  const pendingVal = donutData?.find(item => item.name === 'En attente')?.value ?? 0;
  const overdueVal = donutData?.find(item => item.name === 'En retard')?.value ?? 0;

  const totalPercentage = paidVal + pendingVal + overdueVal;
  const paid = totalPercentage > 0 ? Math.round((paidVal / totalPercentage) * 100) : 0;
  const pending = totalPercentage > 0 ? Math.round((pendingVal / totalPercentage) * 100) : 0;
  const overdue = totalPercentage > 0 ? Math.max(0, 100 - paid - pending) : 0;

  // conic-gradient stops mapping
  const gradient = `conic-gradient(
    #10b981 0% ${paid}%,
    #f59e0b ${paid}% ${paid + pending}%,
    #ef4444 ${paid + pending}% 100%
  )`;

  return (
    <div className="rounded-3xl bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl border border-[#526e9c]/20 p-6 shadow-xl flex flex-col items-center justify-center relative overflow-hidden h-full">
      <h3 className="text-lg font-black text-[#0F172A] dark:text-white self-start mb-4">
        {t('stats.statusDistribution')}
      </h3>

      <div className="relative w-44 h-44 my-4">
        <div className="w-full h-full rounded-full" style={{ background: gradient }} />
        <div className="absolute inset-0 m-auto w-28 h-28 bg-[#F8FAFC] dark:bg-[#080C16] rounded-full flex flex-col items-center justify-center shadow-inner">
          <span className="text-2xl font-black text-[#0F172A] dark:text-white">{totalInvoices}</span>
          <span className="text-[10px] text-[#526e9c] uppercase font-bold text-center leading-tight mt-0.5" dangerouslySetInnerHTML={{ __html: t('stats.generatedInvoices').replace(' ', '<br />') }}>
          </span>
        </div>
      </div>

      <div className="w-full mt-6 space-y-3">
        {[
          { label: t('dashboard.paid'),      pct: paid,    color: 'bg-emerald-500' },
          { label: t('dashboard.pendingPayment'),  pct: pending, color: 'bg-amber-500'   },
          { label: t('stats.overdue'),   pct: overdue, color: 'bg-red-500'     },
        ].map(({ label, pct, color }) => (
          <div key={label} className="flex justify-between items-center text-sm font-bold">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${color}`} />
              <span className="text-[#526e9c]">{label}</span>
            </div>
            <span className="text-[#0F172A] dark:text-white">{pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SVG Line Chart (Revenue evolution without flatlining) ───
function RevenueLineChart({ chartData }) {
  const { t } = useLanguage();
  const MONTH_LABELS = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
  const year = new Date().getFullYear();

  // Scope slots strictly up to active months to prevent flatlining to 0 for future months
  const activeMonthsCount = chartData?.length ?? 12;
  const slots = MONTH_LABELS.slice(0, activeMonthsCount).map((label, i) => {
    const key = `${year}-${String(i + 1).padStart(2, '0')}`;
    const found = chartData?.find((d) => d.month === key);
    return { label, paid: found ? parseFloat(found.paid) : 0 };
  });

  const maxVal = Math.max(...slots.map((s) => s.paid), 1);

  // Map to SVG coordinates
  const W = 1100;
  const H = 220;
  const padL = 20;
  const padR = 20;
  const padB = 20;
  const usableW = W - padL - padR;
  const usableH = H - padB;

  const points = slots.map((s, i) => ({
    x: padL + (slots.length > 1 ? (i / (slots.length - 1)) * usableW : usableW / 2),
    y: usableH - (s.paid / maxVal) * (usableH * 0.85),
    paid: s.paid,
    label: s.label,
  }));

  const pathD = points.length > 0 
    ? points.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(' ')
    : '';

  const areaD = points.length > 0
    ? `M${points[0].x},${usableH} ` + points.map((p) => `L${p.x},${p.y}`).join(' ') + ` L${points[points.length - 1].x},${usableH} Z`
    : '';

  const yScale = [maxVal, maxVal * 0.75, maxVal * 0.5, maxVal * 0.25, 0].map((v) =>
    Math.round(v / 1000)
  );

  return (
    <div className="rounded-3xl bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl border border-[#526e9c]/20 p-6 md:p-8 shadow-xl relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-black text-[#0F172A] dark:text-white tracking-tight">
            {t('stats.revenueEvolution')}
          </h3>
          <p className="text-[#526e9c] text-sm">{t('stats.revenueEvolutionSub').replace('{year}', year)}</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-[#526e9c] bg-[#526e9c]/5 px-3 py-1.5 rounded-xl border border-[#526e9c]/10">
          <div className="w-2.5 h-2.5 rounded-full bg-[#18adf2]" />
          {t('dashboard.paid')}
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex flex-col justify-between pb-6 text-right shrink-0">
          {yScale.map((v) => (
            <span key={v} className="text-[10px] font-bold text-[#526e9c]">{v}K</span>
          ))}
        </div>

        <div className="flex-1 relative">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[220px] overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="stats-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#221ab7" />
                <stop offset="100%" stopColor="#18adf2" />
              </linearGradient>
              <linearGradient id="stats-area-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#18adf2" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#18adf2" stopOpacity="0" />
              </linearGradient>
              {[0, 0.25, 0.5, 0.75, 1].map((t) => (
                <line
                  key={t}
                  x1={padL}
                  x2={W - padR}
                  y1={usableH - t * usableH * 0.85}
                  y2={usableH - t * usableH * 0.85}
                  stroke="rgba(82,110,156,0.12)"
                  strokeDasharray="6 4"
                />
              ))}
            </defs>

            {areaD && <path d={areaD} fill="url(#stats-area-grad)" />}

            {pathD && (
              <>
                <path
                  d={pathD}
                  fill="none"
                  stroke="rgba(24,173,242,0.25)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ filter: 'blur(4px)' }}
                />
                <path
                  d={pathD}
                  fill="none"
                  stroke="url(#stats-line-grad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            )}

            {points.map((p, i) => (
              <g key={i} className="group/dot">
                <circle cx={p.x} cy={p.y} r="5" fill="#18adf2" stroke="#fff" strokeWidth="2" />
                <circle cx={p.x} cy={p.y} r="14" fill="transparent" />
                {p.paid > 0 && (
                  <g>
                    <rect
                      x={p.x - 45}
                      y={p.y - 34}
                      width="90"
                      height="22"
                      rx="6"
                      fill="#0F172A"
                      className="opacity-0 group-hover/dot:opacity-100 transition-opacity"
                    />
                    <text
                      x={p.x}
                      y={p.y - 19}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="700"
                      fill="white"
                      className="opacity-0 group-hover/dot:opacity-100 transition-opacity"
                    >
                      {p.paid.toLocaleString('fr-MA')} MAD
                    </text>
                  </g>
                )}
              </g>
            ))}
          </svg>

          <div className="flex justify-between px-0 mt-2">
            {slots.map(({ label }) => (
              <span key={label} className="text-[9px] font-bold text-[#526e9c] uppercase tracking-wider">
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Statistiques Page ───
export default function Statistiques() {
  const { t } = useLanguage();

  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const res = await api.get('/dashboard/advanced-stats');
      if (res.data.success) {
        return res.data.data;
      }
      throw new Error(t('stats.error'));
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-[#18adf2]" size={40} />
          <p className="text-[#526e9c] font-medium text-sm">{t('stats.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3 text-center max-w-sm">
          <AlertTriangle className="text-red-400" size={40} />
          <p className="text-[#0F172A] dark:text-white font-bold">{error?.message || t('stats.networkError')}</p>
        </div>
      </div>
    );
  }

  const { cards, donut_chart, bar_chart, line_chart } = stats;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black text-[#0F172A] dark:text-white mb-1 tracking-tight">
          {t('stats.advanced')}
        </h1>
        <p className="text-[#526e9c] text-sm font-medium">
          {t('stats.advancedSubtitle')}
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<TrendingUp size={24} className="text-[#18adf2]" />}
          label={t('stats.revenueCollected')}
          value={formatNumber(cards.revenus_encaisses)}
          isCurrency={true}
          accentClass="bg-[#18adf2]/10"
          glowClass="bg-[#18adf2]/10"
        />
        <StatCard
          icon={<Clock size={24} className="text-amber-500" />}
          label={t('stats.pending')}
          value={formatNumber(cards.en_attente)}
          isCurrency={true}
          accentClass="bg-amber-500/10"
          glowClass="bg-amber-500/10"
        />
        <StatCard
          icon={<FileText size={24} className="text-[#221ab7]" />}
          label={t('stats.totalInvoices')}
          value={cards.total_factures}
          accentClass="bg-[#221ab7]/10"
          glowClass="bg-[#221ab7]/10"
        />
        <StatCard
          icon={<Users size={24} className="text-emerald-500" />}
          label={t('stats.activeClients')}
          value={cards.clients_actifs}
          accentClass="bg-emerald-500/10"
          glowClass="bg-emerald-500/10"
        />
      </div>

      {/* Ratios & Derived Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Collection / Recouvrement Ratio */}
        <div className="rounded-3xl bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl border border-[#526e9c]/20 p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#18adf2]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="w-12 h-12 rounded-xl bg-[#18adf2]/10 flex items-center justify-center text-[#18adf2] mb-4">
            <TrendingUp size={24} />
          </div>
          <h4 className="text-sm font-bold text-[#526e9c] uppercase tracking-wider">{t('stats.collectionRate')}</h4>
          <div className="mt-2 flex items-end justify-between">
            <span className="text-3xl font-black text-[#0F172A] dark:text-white">{cards.taux_recouvrement}%</span>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">
              <ArrowUpRight size={14} /> {t('stats.paidTotal')}
            </span>
          </div>
          <div className="mt-4 h-1.5 bg-[#526e9c]/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#221ab7] to-[#18adf2] rounded-full transition-all duration-700"
              style={{ width: `${cards.taux_recouvrement}%` }}
            />
          </div>
        </div>

        {/* Overdue / Impayes Ratio */}
        <div className="rounded-3xl bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl border border-[#526e9c]/20 p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 mb-4">
            <TrendingDown size={24} />
          </div>
          <h4 className="text-sm font-bold text-[#526e9c] uppercase tracking-wider">{t('stats.defaultRate')}</h4>
          <div className="mt-2 flex items-end justify-between">
            <span className="text-3xl font-black text-[#0F172A] dark:text-white">{cards.taux_impayes}%</span>
            <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md ${cards.taux_impayes === 0 ? 'text-emerald-500 bg-emerald-500/10' : 'text-red-500 bg-red-500/10'}`}>
              <ArrowUpRight size={14} /> {t('stats.overdue')}
            </span>
          </div>
          <div className="mt-4 h-1.5 bg-[#526e9c]/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-700"
              style={{ width: `${cards.taux_impayes}%` }}
            />
          </div>
        </div>

        {/* Coverage ratio */}
        <div className="rounded-3xl bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl border border-[#526e9c]/20 p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#221ab7]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="w-12 h-12 rounded-xl bg-[#221ab7]/10 flex items-center justify-center text-[#221ab7] mb-4">
            <Activity size={24} />
          </div>
          <h4 className="text-sm font-bold text-[#526e9c] uppercase tracking-wider">{t('stats.clientCoverage')}</h4>
          <div className="mt-2 flex items-end justify-between">
            <span className="text-3xl font-black text-[#0F172A] dark:text-white">
              {cards.couverture_clients}
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-[#18adf2] bg-[#18adf2]/10 px-2 py-1 rounded-md">
              <ArrowUpRight size={14} /> {t('stats.invoicesPerClient')}
            </span>
          </div>
          <p className="mt-2 text-xs text-[#526e9c]">{t('stats.coverageDesc')}</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex min-h-[400px]">
          <MonthlySalesChart stats={bar_chart} />
        </div>
        <div className="lg:col-span-1">
          <DonutChart
            donutData={donut_chart}
            totalInvoices={cards.total_factures}
          />
        </div>
      </div>

      {/* Year-to-Date Line Chart */}
      <RevenueLineChart chartData={line_chart} />
    </div>
  );
}
