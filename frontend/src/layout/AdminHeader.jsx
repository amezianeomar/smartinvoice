import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import { Menu, UserCircle, X, Sun, Moon, LogOut, ShieldCheck } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function AdminHeader({ isDark, setIsDark }) {
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const { user, logout } = useAuth();
  
  const [isUserOpen, setIsUserOpen] = useState(false);

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  return (
    <header className="sticky top-0 lg:top-4 z-[80] flex w-full lg:w-[calc(100%-2rem)] lg:mx-auto bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl border-b lg:border border-[#526e9c]/20 lg:rounded-2xl transition-all duration-300 pointer-events-auto">
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6 w-full shadow-sm lg:shadow-xl shadow-[#221ab7]/5">
        <div className="flex items-center justify-between w-full gap-2 px-4 py-3 lg:justify-normal lg:px-0 lg:py-4">
          
          <button
            className="flex items-center justify-center w-10 h-10 text-[#526e9c] hover:bg-[#526e9c]/10 rounded-xl transition-colors shrink-0"
            onClick={handleToggle}
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link to="/admin" className="lg:hidden flex items-center gap-2">
            <ShieldCheck size={32} className="text-[#18adf2]" />
            <span className="font-black text-lg tracking-tighter uppercase text-[#0F172A] dark:text-white">SI<span className="text-[#18adf2]">-</span>ADMIN</span>
          </Link>

          <div className="hidden lg:flex flex-1 pl-4">
            <h1 className="text-xl font-black text-[#0F172A] dark:text-white tracking-tight">Portail Super Administrateur</h1>
          </div>
          
          <div className="flex items-center gap-3 lg:hidden shrink-0">
             <button 
               onClick={() => setIsDark(!isDark)} 
               className="w-9 h-9 flex items-center justify-center text-[#526e9c] hover:bg-[#526e9c]/10 rounded-full transition-colors relative"
             >
               {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-[#221ab7]" />}
             </button>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center justify-end w-full gap-4 px-5 py-4 lg:px-0">
          <div className="flex items-center gap-2 relative">
            <button 
              onClick={() => setIsDark(!isDark)} 
              className="w-10 h-10 flex items-center justify-center text-[#526e9c] hover:bg-[#526e9c]/10 rounded-full transition-colors relative"
            >
              {isDark ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-[#221ab7]" />}
            </button>
          </div>

          <div className="h-6 w-[1px] bg-[#526e9c]/20"></div>
          
          <div className="relative">
             <button 
               onClick={() => setIsUserOpen(!isUserOpen)}
               className={`flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full transition-colors border group ${isUserOpen ? 'bg-black/5 dark:bg-white/5 border-[#526e9c]/20' : 'hover:bg-black/5 dark:hover:bg-white/5 border-transparent hover:border-[#526e9c]/20'}`}
             >
               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#221ab7] to-[#18adf2] flex items-center justify-center text-white shadow-md group-hover:shadow-[#18adf2]/30 transition-shadow">
                  <UserCircle size={20}/>
               </div>
               <div className="flex flex-col text-left">
                  <span className="text-sm font-bold text-[#0F172A] dark:text-white leading-none">{user?.nom || 'Admin'}</span>
                  <span className="text-[10px] font-bold text-[#18adf2] uppercase mt-0.5">Super Admin</span>
               </div>
             </button>

             <AnimatePresence>
               {isUserOpen && (
                 <motion.div 
                   initial={{ opacity: 0, y: 10, scale: 0.95 }}
                   animate={{ opacity: 1, y: 0, scale: 1 }}
                   exit={{ opacity: 0, y: 10, scale: 0.95 }}
                   transition={{ duration: 0.2 }}
                   className="absolute top-[120%] right-0 w-48 bg-white/95 dark:bg-[#131B2C]/95 backdrop-blur-3xl border border-[#526e9c]/20 shadow-2xl rounded-2xl overflow-hidden p-2 flex flex-col gap-1"
                 >
                    <button onClick={logout} className="flex items-center gap-3 w-full p-3 text-sm font-bold text-red-500 hover:bg-red-500/10 rounded-xl transition-colors text-left">
                       <LogOut size={16} /> Déconnexion
                    </button>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
