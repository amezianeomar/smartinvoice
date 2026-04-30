import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Settings, LogOut, Shield, BarChart3 } from "lucide-react";
import { useSidebar } from "../context/SidebarContext";
import { useAuth } from "../context/AuthContext";

export default function AdminSidebar() {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const { logout } = useAuth();
  const location = useLocation();

  const isActivePath = (path) => location.pathname === path || location.pathname.startsWith(`${path}/`) && path !== '/admin';

  const navItems = [
    { name: "Tableau de Bord Admin", icon: <LayoutDashboard size={22} />, path: "/admin" },
    { name: "Gestion Utilisateurs", icon: <Users size={22} />, path: "/admin/utilisateurs" },
    { name: "Rapports Financiers", icon: <BarChart3 size={22} />, path: "/admin/rapports" },
  ];

  const bottomItems = [
    { name: "Grand Livre (Paramètres)", icon: <Settings size={22} />, path: "/admin/parametres" },
    { name: "Déconnexion", icon: <LogOut size={22} className="text-red-500" />, onClick: logout },
  ];

  const renderItem = (item) => {
     let isActive = item.path === '/admin' ? location.pathname === '/admin' : isActivePath(item.path);

     const content = (
        <>
            <span className={`${isActive ? 'text-[#221ab7] dark:text-[#18adf2] drop-shadow-[0_0_8px_rgba(24,173,242,0.5)]' : 'text-[#526e9c] group-hover:text-[#0F172A] dark:group-hover:text-white'} transition-colors shrink-0`}>
                {item.icon}
            </span>
            {(isExpanded || isHovered || isMobileOpen) && (
                <span className="whitespace-nowrap flex-1 text-left">{item.name}</span>
            )}
            {isActive && (isExpanded || isHovered || isMobileOpen) && (
                <div className="w-1.5 h-1.5 rounded-full bg-[#18adf2] ml-auto shrink-0 shadow-[0_0_8px_rgba(24,173,242,0.8)]"></div>
            )}
            {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#18adf2] rounded-r-full shadow-[0_0_10px_rgba(24,173,242,0.8)]"></div>}
        </>
     );

     const containerClass = `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative w-full
       ${isActive ? 'bg-[#221ab7]/10 dark:bg-[#18adf2]/10 text-[#221ab7] dark:text-[#18adf2] font-bold shadow-[inset_0px_0px_20px_rgba(24,173,242,0.05)]' : 'text-[#526e9c] hover:bg-[#526e9c]/10 hover:text-[#0F172A] dark:hover:text-white font-medium'}
     `;

     return (
        <Link key={item.name} to={item.path} className={containerClass}>
           {content}
        </Link>
     );
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-[#0F172A]/90 dark:bg-[#080C16]/90 backdrop-blur-3xl border-r border-[#526e9c]/20 z-[100] transition-all duration-300 ease-[cubic-bezier(0.87,0,0.13,1)] flex flex-col
        ${isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-center h-24 border-b border-[#526e9c]/10 shrink-0">
        <Link to="/admin" className="flex items-center gap-3">
          <Shield className="w-10 h-10 text-[#18adf2] drop-shadow-[0_0_15px_rgba(24,173,242,0.5)]" />
          {(isExpanded || isHovered || isMobileOpen) && (
            <span className="font-black text-2xl tracking-tighter uppercase text-white">SI<span className="text-[#18adf2]">-</span>ADMIN</span>
          )}
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-6 px-4">
         <nav className="flex flex-col gap-2 relative">
            <span className="text-[10px] font-bold text-[#526e9c] uppercase tracking-wider pl-4 mb-1 hidden md:block">
              {(isExpanded || isHovered || isMobileOpen) ? "Navigation Admin" : "..."}
            </span>
            {navItems.map(renderItem)}
         </nav>
      </div>

      <div className="p-4 border-t border-[#526e9c]/10 shrink-0">
         <nav className="flex flex-col gap-2">
            {bottomItems.map((item) => (
              item.onClick ? (
                <button
                  key={item.name}
                  onClick={item.onClick}
                  className="flex items-center gap-4 px-4 py-3 rounded-xl text-[#526e9c] hover:bg-[#526e9c]/10 hover:text-white font-medium transition-all duration-200 group w-full"
                >
                  <span className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">{item.icon}</span>
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <span className="whitespace-nowrap text-red-500 font-bold group-hover:text-red-600">{item.name}</span>
                  )}
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center gap-4 px-4 py-3 rounded-xl text-[#526e9c] hover:bg-[#526e9c]/10 hover:text-white font-medium transition-all duration-200 group"
                >
                  <span className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">{item.icon}</span>
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <span className="whitespace-nowrap">{item.name}</span>
                  )}
                </Link>
              )
            ))}
         </nav>
      </div>
    </aside>
  );
}
