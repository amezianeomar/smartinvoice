import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import { Bell, Search, Menu, UserCircle, X, Command, Sun, Moon, Settings, LogOut, CreditCard } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { LanguageSwitcher } from "../components/ui";
import { useAuth } from "../context/AuthContext";

export default function AppHeader({ isDark, setIsDark }) {
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const { user, logout } = useAuth();
  const inputRef = useRef(null);
  
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

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

          <Link to="/" className="lg:hidden flex items-center gap-2">
            <img src="/images/logo-icon.png" alt="Logo" className="w-12 h-12 object-contain" />
            <span className="font-black text-lg tracking-tighter uppercase text-[#0F172A] dark:text-white">SI<span className="text-[#18adf2]">-</span>PRO</span>
          </Link>

          <div className="hidden lg:flex flex-1 pl-4">
            <div className="relative w-full max-w-md group/input focus-within:z-10">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#526e9c] group-focus-within/input:text-[#18adf2] transition-colors"><Search size={18} /></span>
              <input
                ref={inputRef}
                type="text"
                placeholder="Rechercher une facture, client..."
                className="w-full pl-11 pr-14 py-2.5 rounded-xl border border-[#526e9c]/20 bg-white/50 dark:bg-[#0F172A]/50 text-sm text-[#0F172A] dark:text-white placeholder-[#526e9c] focus:ring-2 focus:ring-[#18adf2]/50 focus:border-[#18adf2] transition-all outline-none"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 rounded-md border border-[#526e9c]/20 bg-[#526e9c]/5 px-2 py-1 text-[10px] font-bold text-[#526e9c]">
                <Command size={10} /><span>K</span>
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3 lg:hidden shrink-0">
             <LanguageSwitcher />
             <button 
               onClick={() => setIsDark(!isDark)} 
               className="w-9 h-9 flex items-center justify-center text-[#526e9c] hover:bg-[#526e9c]/10 rounded-full transition-colors relative"
             >
               {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-[#221ab7]" />}
             </button>
             <button className="w-9 h-9 flex items-center justify-center text-[#526e9c] hover:bg-[#526e9c]/10 rounded-full transition-colors relative"><Search size={18}/></button>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center justify-end w-full gap-4 px-5 py-4 lg:px-0">
          <div className="flex items-center gap-2 relative">
            <LanguageSwitcher />
            <button 
              onClick={() => setIsDark(!isDark)} 
              className="w-10 h-10 flex items-center justify-center text-[#526e9c] hover:bg-[#526e9c]/10 rounded-full transition-colors relative"
            >
              {isDark ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-[#221ab7]" />}
            </button>
            
            {/* Notification Button */}
            <button 
              onClick={() => { setIsNotifOpen(!isNotifOpen); setIsUserOpen(false); }}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors relative ${isNotifOpen ? 'bg-[#18adf2]/10 text-[#18adf2]' : 'text-[#526e9c] hover:bg-[#526e9c]/10'}`}
            >
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white dark:border-[#131B2C]"></span>
            </button>

            {/* Notification Dropdown */}
            <AnimatePresence>
               {isNotifOpen && (
                 <motion.div 
                   initial={{ opacity: 0, y: 10, scale: 0.95 }}
                   animate={{ opacity: 1, y: 0, scale: 1 }}
                   exit={{ opacity: 0, y: 10, scale: 0.95 }}
                   transition={{ duration: 0.2 }}
                   className="absolute top-[120%] right-0 w-80 bg-white/95 dark:bg-[#131B2C]/95 backdrop-blur-3xl border border-[#526e9c]/20 shadow-2xl rounded-2xl overflow-hidden"
                 >
                    <div className="flex justify-between items-center px-4 py-3 border-b border-[#526e9c]/10">
                       <h4 className="font-black text-[#0F172A] dark:text-white">Notifications</h4>
                       <span className="text-[10px] bg-[#18adf2]/10 text-[#18adf2] font-bold px-2 py-0.5 rounded-full">0 Nouvelle</span>
                    </div>
                    <div className="flex flex-col items-center justify-center py-8">
                       <Bell size={24} className="text-[#526e9c]/50 mb-2" />
                       <p className="text-sm font-bold text-[#0F172A] dark:text-white">Aucune notification</p>
                       <p className="text-xs text-[#526e9c] mt-1">Vous êtes à jour !</p>
                    </div>
                    <div className="p-2 border-t border-[#526e9c]/10">
                       <button onClick={() => setIsNotifOpen(false)} className="w-full py-2 text-sm font-bold text-[#526e9c] hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors">Fermer</button>
                    </div>
                 </motion.div>
               )}
            </AnimatePresence>
          </div>

          <div className="h-6 w-[1px] bg-[#526e9c]/20"></div>
          
          <div className="relative">
             {/* User Button */}
             <button 
               onClick={() => { setIsUserOpen(!isUserOpen); setIsNotifOpen(false); }}
               className={`flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full transition-colors border group ${isUserOpen ? 'bg-black/5 dark:bg-white/5 border-[#526e9c]/20' : 'hover:bg-black/5 dark:hover:bg-white/5 border-transparent hover:border-[#526e9c]/20'}`}
             >
               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#221ab7] to-[#18adf2] flex items-center justify-center text-white shadow-md group-hover:shadow-[#18adf2]/30 transition-shadow overflow-hidden">
                  {(user?.logo_url || user?.logo_path) ? (
                      <img src={user.logo_url || user.logo_path} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                      <UserCircle size={20}/>
                  )}
               </div>
               <div className="flex flex-col text-left">
                  <span className="text-sm font-bold text-[#0F172A] dark:text-white leading-none">{user?.nom || user?.name || 'Utilisateur'}</span>
                  <span className="text-[10px] font-bold text-[#526e9c] uppercase mt-0.5">{user?.role === 'admin' ? 'Admin' : 'Membre'}</span>
               </div>
             </button>

             {/* User Dropdown */}
             <AnimatePresence>
               {isUserOpen && (
                 <motion.div 
                   initial={{ opacity: 0, y: 10, scale: 0.95 }}
                   animate={{ opacity: 1, y: 0, scale: 1 }}
                   exit={{ opacity: 0, y: 10, scale: 0.95 }}
                   transition={{ duration: 0.2 }}
                   className="absolute top-[120%] right-0 w-60 bg-white/95 dark:bg-[#131B2C]/95 backdrop-blur-3xl border border-[#526e9c]/20 shadow-2xl rounded-2xl overflow-hidden p-2 flex flex-col gap-1"
                 >
                    <Link to="/dashboard/parametres" className="flex items-center gap-3 w-full p-3 text-sm font-bold text-[#0F172A] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors">
                       <Settings size={16} className="text-[#526e9c]" /> Profil & Paramètres
                    </Link>
                    <Link to="/dashboard/parametres" className="flex items-center gap-3 w-full p-3 text-sm font-bold text-[#0F172A] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors">
                       <CreditCard size={16} className="text-[#526e9c]" /> Abonnement Pro
                    </Link>
                    <div className="h-[1px] bg-[#526e9c]/10 my-1 w-[calc(100%-1rem)] mx-auto"></div>
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
