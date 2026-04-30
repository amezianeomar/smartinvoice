import React from "react";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

const LayoutContent = ({ isDark, setIsDark }) => {
  const { isExpanded, isHovered, isMobileOpen, toggleMobileSidebar } = useSidebar();

  return (
    <div className="relative min-h-screen text-[#0F172A] dark:text-[#F8FAFC] overflow-x-hidden font-sans bg-[#f8fafc] dark:bg-[#030712]">
      <AdminSidebar />
      
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-[#080C16]/60 backdrop-blur-sm z-[90] lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      <div
        className={`flex flex-col flex-1 transition-all duration-300 ease-[cubic-bezier(0.87,0,0.13,1)] min-h-screen
          ${isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"}
          ${isMobileOpen ? "ml-0" : ""}
        `}
      >
        <AdminHeader isDark={isDark} setIsDark={setIsDark} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 mx-auto w-full max-w-7xl pt-[100px] lg:pt-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const AdminLayout = ({ isDark, setIsDark }) => {
  return (
    <SidebarProvider>
      <LayoutContent isDark={isDark} setIsDark={setIsDark} />
    </SidebarProvider>
  );
};

export default AdminLayout;
