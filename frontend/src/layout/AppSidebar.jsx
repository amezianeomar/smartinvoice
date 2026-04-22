import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, FileText, BarChart3, Settings, LogOut, FilePlus, ChevronDown } from "lucide-react";
import { useSidebar } from "../context/SidebarContext";

export default function AppSidebar() {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  // Accordion state management
  const [openMenus, setOpenMenus] = useState({ Factures: false, Clients: false });

  const toggleMenu = (name) => {
    // If we only want one menu open at a time, we could reset the others.
    // But keeping it mapped object is nicer so both can be open.
    setOpenMenus(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const isActivePath = (path) => location.pathname === path || location.pathname.startsWith(`${path}/`) && path !== '/dashboard';

  const navItems = [
    { name: "Tableau de Bord", icon: <LayoutDashboard size={22} />, path: "/dashboard" },
    { 
      name: "Factures", 
      icon: <FileText size={22} />, 
      children: [
        { name: "Toutes les Factures", path: "/dashboard/factures" },
        { name: "Devis", path: "/dashboard/devis" },
        { name: "Paiements", path: "/dashboard/paiements" },
      ]
    },
    { 
      name: "Clients", 
      icon: <Users size={22} />, 
      children: [
        { name: "Tous les Clients", path: "/dashboard/clients" },
        { name: "Catalogue", path: "/dashboard/catalogue" },
      ]
    },
    { name: "Rapports & TVA", icon: <BarChart3 size={22} />, path: "/dashboard/statistiques" },
  ];

  const bottomItems = [
    { name: "Paramètres", icon: <Settings size={22} />, path: "/dashboard/parametres" },
    { name: "Déconnexion", icon: <LogOut size={22} className="text-red-500" />, path: "/" },
  ];

  const renderItem = (item) => {
     const hasChildren = item.children && item.children.length > 0;
     const isOpen = openMenus[item.name];
     
     // Check if active
     let isActive = false;
     if (hasChildren) {
        isActive = item.children.some(child => isActivePath(child.path));
     } else {
        isActive = item.path === '/dashboard' ? location.pathname === '/dashboard' : isActivePath(item.path);
     }

     const content = (
        <>
            <span className={`${isActive ? 'text-[#221ab7] dark:text-[#18adf2] drop-shadow-[0_0_8px_rgba(24,173,242,0.5)]' : 'text-[#526e9c] group-hover:text-[#0F172A] dark:group-hover:text-white'} transition-colors shrink-0`}>
                {item.icon}
            </span>
            {(isExpanded || isHovered || isMobileOpen) && (
                <span className="whitespace-nowrap flex-1 text-left">{item.name}</span>
            )}
            {(isExpanded || isHovered || isMobileOpen) && hasChildren && (
                <ChevronDown size={16} className={`text-[#526e9c] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} shrink-0`} />
            )}
            {!hasChildren && isActive && (isExpanded || isHovered || isMobileOpen) && (
                <div className="w-1.5 h-1.5 rounded-full bg-[#18adf2] ml-auto shrink-0 shadow-[0_0_8px_rgba(24,173,242,0.8)]"></div>
            )}
            {/* Left accent border on hover / active */}
            {(!hasChildren && isActive || (hasChildren && isActive && !isOpen)) && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#18adf2] rounded-r-full shadow-[0_0_10px_rgba(24,173,242,0.8)]"></div>}
        </>
     );

     const containerClass = `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative w-full
       ${isActive && (!hasChildren || !isOpen) ? 'bg-[#221ab7]/10 dark:bg-[#18adf2]/10 text-[#221ab7] dark:text-[#18adf2] font-bold shadow-[inset_0px_0px_20px_rgba(24,173,242,0.05)]' : 'text-[#526e9c] hover:bg-[#526e9c]/10 hover:text-[#0F172A] dark:hover:text-white font-medium'}
     `;

     return (
        <div key={item.name} className="flex flex-col relative w-full">
            {hasChildren ? (
                <button onClick={() => toggleMenu(item.name)} className={containerClass}>
                   {content}
                </button>
            ) : (
                <Link to={item.path} className={containerClass}>
                   {content}
                </Link>
            )}

            {/* Submenu Accordion Render */}
            <div className={`grid transition-all duration-300 ease-in-out ${hasChildren && isOpen && (isExpanded || isHovered || isMobileOpen) ? 'grid-rows-[1fr] opacity-100 mt-1 mb-2' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden flex flex-col gap-1 ml-9 pl-4 border-l-2 border-[#526e9c]/10">
                   {hasChildren && item.children.map(child => {
                      const childActive = isActivePath(child.path);
                      return (
                         <Link key={child.name} to={child.path} className={`py-2 text-[13px] tracking-wide transition-colors relative flex items-center ${childActive ? 'text-[#18adf2] font-bold drop-shadow-[0_0_8px_rgba(24,173,242,0.5)]' : 'text-[#526e9c] hover:text-[#0F172A] dark:hover:text-white'}`}>
                            <span className="whitespace-nowrap">{child.name}</span>
                            {childActive && <div className="absolute -left-[17.5px] top-1/2 -translate-y-1/2 w-[2px] h-full bg-[#18adf2] shadow-[0_0_10px_rgba(24,173,242,0.5)]"></div>}
                         </Link>
                      )
                   })}
                </div>
            </div>
        </div>
     );
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white/80 dark:bg-[#080C16]/80 backdrop-blur-3xl border-r border-[#526e9c]/20 z-[100] transition-all duration-300 ease-[cubic-bezier(0.87,0,0.13,1)] flex flex-col
        ${isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => {
         setIsHovered(false);
         // Optional: Auto close menus when hovering out so it's clean next time
         // setOpenMenus({ Factures: false, Clients: false });
      }}
    >
      <div className="flex items-center justify-center h-24 border-b border-[#526e9c]/10 shrink-0">
        <Link to="/dashboard" className="flex items-center gap-3">
          <img src="/images/logo-icon.png" alt="Logo" className="w-16 h-16 object-contain drop-shadow-[0_0_15px_rgba(34,26,183,0.5)]" />
          {(isExpanded || isHovered || isMobileOpen) && (
            <span className="font-black text-2xl tracking-tighter uppercase text-[#0F172A] dark:text-white">SI<span className="text-[#18adf2]">-</span>PRO</span>
          )}
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-6 px-4">
         <nav className="flex flex-col gap-2 relative">
            <div className="mb-4">
               <Link
                  to="/dashboard/factures/nouvelle"
                  className="flex items-center justify-center gap-3 w-full py-3 rounded-xl font-bold transition-all duration-300 shadow-[0_0_15px_rgba(24,173,242,0.3)] hover:shadow-[#18adf2]/50 hover:-translate-y-0.5 bg-gradient-to-r from-[#221ab7] to-[#18adf2] text-white"
               >
                  <FilePlus size={22} className="shrink-0" />
                  {(isExpanded || isHovered || isMobileOpen) && <span className="whitespace-nowrap">Créer Facture</span>}
               </Link>
            </div>

            <span className="text-[10px] font-bold text-[#526e9c] uppercase tracking-wider pl-4 mb-1 hidden md:block">
              {(isExpanded || isHovered || isMobileOpen) ? "Menu Principal" : "..."}
            </span>
            
            {navItems.map(renderItem)}
         </nav>
      </div>

      <div className="p-4 border-t border-[#526e9c]/10 shrink-0">
         <nav className="flex flex-col gap-2">
            {bottomItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center gap-4 px-4 py-3 rounded-xl text-[#526e9c] hover:bg-[#526e9c]/10 hover:text-[#0F172A] dark:hover:text-white font-medium transition-all duration-200 group"
              >
                <span className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">{item.icon}</span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`whitespace-nowrap ${item.name === 'Déconnexion' ? 'text-red-500 font-bold group-hover:text-red-600' : ''}`}>{item.name}</span>
                )}
              </Link>
            ))}
         </nav>
      </div>
    </aside>
  );
}
