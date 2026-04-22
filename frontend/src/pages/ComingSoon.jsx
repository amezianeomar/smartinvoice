import React from 'react';
import { Hammer } from 'lucide-react';

export default function ComingSoon({ title }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-24 h-24 rounded-full bg-[#18adf2]/10 flex items-center justify-center mb-6 border border-[#18adf2]/20 relative">
        <div className="absolute inset-0 bg-[#221ab7]/5 blur-xl rounded-full" />
        <Hammer size={40} className="text-[#18adf2] relative z-10" />
      </div>
      <h1 className="text-4xl font-black text-[#0F172A] dark:text-white mb-4 tracking-tight">{title}</h1>
      <p className="text-[#526e9c] text-lg max-w-md">Cette page est en cours de construction. Elle sera bientôt disponible avec de nouvelles fonctionnalités incroyables !</p>
    </div>
  );
}
