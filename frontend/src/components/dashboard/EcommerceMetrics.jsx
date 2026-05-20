import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight, TrendingUp, AlertCircle, Banknote, DollarSign, ArrowRight } from 'lucide-react';

export default function EcommerceMetrics({ stats }) {
  const monthly = stats?.monthly_stats ?? [];

  // ── MoM helper ─────────────────────────────────────────────────────────────
  // Returns { label, rawPct } — deliberately returns ONLY raw math.
  // Colour/arrow decisions are made at render time, not here.
  function calcMoM(getCur, getPrev) {
    if (monthly.length < 2) return { label: '—', rawPct: null };

    const cur  = parseFloat(getCur(monthly[monthly.length - 1]) ?? 0);
    const prev = parseFloat(getPrev(monthly[monthly.length - 2]) ?? 0);

    if (prev === 0 && cur === 0) return { label: '—',   rawPct: null };
    if (prev === 0)              return { label: 'New', rawPct: null }; // can't compute %

    const pct   = ((cur - prev) / Math.abs(prev)) * 100;
    const label = `${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`;

    return { label, rawPct: pct };
  }

  // ── Per-card MoM (raw math only) ───────────────────────────────────────────
  const revMoM     = calcMoM((m) => m.paid,  (m) => m.paid);
  const countMoM   = calcMoM((m) => m.count, (m) => m.count);
  const pendingMoM = calcMoM(
    (m) => parseFloat(m.sent ?? 0) - parseFloat(m.paid ?? 0),
    (m) => parseFloat(m.sent ?? 0) - parseFloat(m.paid ?? 0)
  );
  const netMoM = calcMoM((m) => m.paid, (m) => m.paid);

  // ── Metrics config ─────────────────────────────────────────────────────────
  // higherIsBetter is stored here so the render can apply business colour logic.
  const metrics = [
    {
      title:          "Chiffre d'Affaires",
      value:          (stats?.total_revenue || 0).toLocaleString('fr-MA'),
      currency:       true,
      mom:            revMoM,
      higherIsBetter: true,
      icon:           <TrendingUp size={24} className="text-[#18adf2]" />,
      bgIcon:         'bg-[#18adf2]/10',
      path:           '/dashboard/statistiques',
    },
    {
      title:          'Factures Totales',
      value:          stats?.invoice_count || 0,
      currency:       false,
      mom:            countMoM,
      higherIsBetter: true,
      icon:           <Banknote size={24} className="text-[#221ab7]" />,
      bgIcon:         'bg-[#221ab7]/10',
      path:           '/dashboard/factures',
    },
    {
      title:          'En attente de paiement',
      value:          (stats?.pending_amount || 0).toLocaleString('fr-MA'),
      currency:       true,
      mom:            pendingMoM,
      higherIsBetter: false, // ← rising pending is BAD
      icon:           <AlertCircle size={24} className="text-amber-500" />,
      bgIcon:         'bg-amber-500/10',
      path:           '/dashboard/factures?filter=attente',
    },
    {
      title:          'Solde Net Réel',
      value:          ((stats?.total_revenue || 0) - (stats?.pending_amount || 0)).toLocaleString('fr-MA'),
      currency:       true,
      mom:            netMoM,
      higherIsBetter: true,
      icon:           <DollarSign size={24} className="text-emerald-500" />,
      bgIcon:         'bg-emerald-500/10',
      path:           '/dashboard/paiements',
    },
  ];

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
      {metrics.map((item, index) => {
        const { label, rawPct }     = item.mom;
        const { higherIsBetter }    = item;
        const hasRealPct            = rawPct !== null;

        // 1. Arrow direction — strictly math-based
        const isPositivePct = hasRealPct && rawPct > 0;
        const isNegativePct = hasRealPct && rawPct < 0;
        const ArrowIcon = isPositivePct
          ? <ArrowUpRight size={16} />
          : isNegativePct
            ? <ArrowDownRight size={16} />
            : null;

        // 2. Badge colour — strictly business-based
        let badgeClass = 'text-[#526e9c] bg-[#526e9c]/10'; // neutral fallback (—, New, 0%)
        if (isPositivePct) {
          // number went UP: green if up is good, red if up is bad
          badgeClass = higherIsBetter
            ? 'bg-emerald-500/10 text-emerald-500'
            : 'bg-red-500/10 text-red-500';
        } else if (isNegativePct) {
          // number went DOWN: red if down is bad, green if down is good
          badgeClass = higherIsBetter
            ? 'bg-red-500/10 text-red-500'
            : 'bg-emerald-500/10 text-emerald-500';
        }

        return (
          <Link
            to={item.path || '#'}
            key={index}
            className="block rounded-3xl bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl border border-[#526e9c]/20 p-6 shadow-xl group hover:border-[#18adf2]/50 hover:shadow-2xl hover:-translate-y-1 cursor-pointer transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#18adf2]/0 rounded-full blur-3xl group-hover:bg-[#18adf2]/10 transition-all duration-500 pointer-events-none" />

            {/* Icon + Badge row */}
            <div className="flex justify-between items-start relative z-10 mb-6">
              <div className={`flex items-center justify-center w-14 h-14 rounded-2xl ${item.bgIcon} group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>

              <div className={`flex items-center gap-1 text-sm font-bold px-2.5 py-1 rounded-lg ${badgeClass}`}>
                {ArrowIcon}
                <span>{label}</span>
                {hasRealPct && (
                  <span className="text-[10px] font-medium opacity-60 ml-0.5">MoM</span>
                )}
              </div>
            </div>

            {/* Value block */}
            <div className="relative z-10">
              <span className="text-[11px] font-bold text-[#526e9c] uppercase tracking-wider block group-hover:text-[#18adf2] transition-colors duration-300">
                {item.title}
              </span>
              <div className="mt-2 flex items-baseline gap-1.5 overflow-hidden">
                <span className="truncate text-2xl lg:text-xl xl:text-2xl font-black text-[#0F172A] dark:text-white tracking-tight">
                  {item.value}
                </span>
                {item.currency && (
                  <span className="shrink-0 text-xs font-bold text-[#526e9c]">MAD</span>
                )}
              </div>
            </div>

            {/* Hover footer */}
            <div className="mt-4 pt-4 border-t border-[#526e9c]/10 flex items-center gap-2 text-xs font-bold text-[#526e9c] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:text-[#18adf2] transition-all duration-300 relative z-10">
              <span>Voir détails</span>
              <ArrowRight size={14} />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
