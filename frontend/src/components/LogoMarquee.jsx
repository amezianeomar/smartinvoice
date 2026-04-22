import React from 'react';

const logos = [
  { letter: 'T', name: 'TECH-CORP', color: 'from-blue-500 to-cyan-400' },
  { letter: 'N', name: 'NORD-SUD', color: 'from-indigo-500 to-purple-400' },
  { letter: 'L', name: 'LOGIS-MAROC', color: 'from-emerald-500 to-teal-400' },
  { letter: 'S', name: 'SMART-SME', color: 'from-amber-500 to-orange-400' },
  { letter: 'M', name: 'MEDIA-HUB', color: 'from-rose-500 to-pink-400' },
  { letter: 'A', name: 'ATLAS-PAY', color: 'from-cyan-500 to-blue-500' }, // Added a 6th to make the loop richer
];

export default function LogoMarquee() {
  return (
    <section className="relative py-24 overflow-hidden border-y border-[#526e9c]/10 bg-white/30 dark:bg-white/[0.02]">
      
      {/* 1. SELF-CONTAINED PERFECT ANIMATION */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          /* 40s controls the speed. Make it higher for slower scrolling */
          animation: infinite-scroll 40s linear infinite; 
          width: max-content;
        }
        .pause-on-hover:hover .animate-infinite-scroll {
          animation-play-state: paused;
        }
      `}} />

      <p className="text-center text-xs font-black text-[#526e9c] uppercase tracking-[0.3em] opacity-50 mb-16">
        Trusted by forward-thinking businesses across Morocco
      </p>

      {/* 2. SCROLLING TRACK WITH PAUSE EFFECT */}
      <div className="relative flex overflow-hidden pause-on-hover">
        <div className="flex animate-infinite-scroll items-center">
          
          {/* We spread the array twice to ensure it covers the screen before looping */}
          {[...logos, ...logos].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 mx-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-500 cursor-pointer"
            >
              {/* Premium Gradient Border Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} p-[1px] shadow-lg`}>
                <div className="w-full h-full bg-white dark:bg-[#080C16] rounded-xl flex items-center justify-center">
                  <span className={`font-black text-xl bg-gradient-to-br ${item.color} bg-clip-text text-transparent`}>
                    {item.letter}
                  </span>
                </div>
              </div>
              <span className="font-black text-xl tracking-tighter text-[#526e9c] dark:text-[#94A3B8]">
                {item.name}
              </span>
            </div>
          ))}

        </div>
      </div>

      {/* 3. SEAMLESS FADE EDGES */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#F8FAFC] dark:from-[#080C16] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#F8FAFC] dark:from-[#080C16] to-transparent z-10 pointer-events-none" />
    </section>
  );
}