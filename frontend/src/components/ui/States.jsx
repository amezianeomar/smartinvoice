import React from 'react';
import { FileQuestion } from 'lucide-react';

export function EmptyState({ icon: Icon = FileQuestion, title, description, actionText, actionIcon: ActionIcon, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="relative group w-24 h-24 mb-6">
         {/* Glowing orb behind */}
         <div className="absolute inset-0 bg-gradient-to-tr from-[#221ab7]/20 to-[#18adf2]/20 rounded-full blur-[30px] group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
         
         <div className="relative w-full h-full bg-white/70 dark:bg-[#131B2C]/70 border border-[#526e9c]/20 backdrop-blur-2xl rounded-[2rem] flex items-center justify-center transform group-hover:-translate-y-2 group-hover:rotate-6 transition-all duration-500 shadow-2xl">
           <Icon size={40} className="text-[#526e9c] group-hover:text-[#18adf2] transition-colors duration-500" />
         </div>
      </div>
      <h3 className="text-2xl font-black text-[#0F172A] dark:text-white mb-3 tracking-tight">{title}</h3>
      <p className="text-[#526e9c] text-sm max-w-[280px] leading-relaxed mb-8">{description}</p>
      
      {actionText && (
         <button onClick={onAction} className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] dark:from-white dark:to-gray-200 text-white dark:text-[#0F172A] px-6 py-3 rounded-xl font-bold shadow-xl hover:-translate-y-1 hover:shadow-[#18adf2]/30 transition-all duration-300 flex items-center gap-2 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#221ab7] to-[#18adf2] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2">
               {ActionIcon && <ActionIcon size={18} />}
               {actionText}
            </span>
         </button>
      )}
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="w-full flex flex-col gap-5 p-6 min-w-[900px] overflow-hidden">
       {[...Array(5)].map((_, i) => (
         <div key={i} className="flex items-center gap-6 w-full opacity-60">
            {/* Icon Block */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#526e9c]/10 to-[#526e9c]/5 shrink-0 animate-pulse" />
            
            <div className="flex-1 flex gap-8">
               {/* Columns */}
               <div className="w-32 h-5 rounded-lg bg-gradient-to-r from-[#526e9c]/10 to-[#526e9c]/5 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
               <div className="w-48 h-5 rounded-lg bg-gradient-to-r from-[#526e9c]/10 to-[#526e9c]/5 animate-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
               <div className="w-24 h-5 rounded-lg bg-gradient-to-r from-[#526e9c]/10 to-[#526e9c]/5 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
               <div className="w-32 h-5 rounded-lg bg-gradient-to-r from-[#526e9c]/10 to-[#526e9c]/5 animate-pulse" style={{ animationDelay: `${i * 0.25}s` }} />
            </div>

            {/* Status Pill */}
            <div className="w-24 h-8 rounded-lg bg-gradient-to-r from-[#526e9c]/10 to-[#526e9c]/5 animate-pulse shrink-0" style={{ animationDelay: `${i * 0.3}s` }} />
            
            {/* Actions */}
            <div className="w-28 h-6 rounded-lg bg-gradient-to-r from-[#526e9c]/10 to-[#526e9c]/5 shrink-0 animate-pulse ml-8" style={{ animationDelay: `${i * 0.35}s` }} />
         </div>
       ))}
    </div>
  );
}
