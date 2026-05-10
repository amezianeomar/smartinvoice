import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';

import LandingPage from './pages/LandingPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import Onboarding from './pages/Onboarding.jsx';
import SelectPlan from './pages/SelectPlan.jsx';
import Checkout from './pages/Checkout.jsx';
import DashboardLayout from './layout/DashboardLayout.jsx';
import AdminLayout from './layout/AdminLayout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ComingSoon from './pages/ComingSoon.jsx';
import CreateInvoiceForm from './pages/CreateInvoiceForm.jsx';
import FacturesList from './pages/FacturesList.jsx';
import ClientsList from './pages/ClientsList.jsx';
import Statistiques from './pages/Statistiques.jsx';
import Settings from './pages/Settings.jsx';
import Devis from './pages/Devis.jsx';
import Paiements from './pages/Paiements.jsx';
import Catalogue from './pages/Catalogue.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminUsers from './pages/AdminUsers.jsx';
import AdminSettings from './pages/AdminSettings.jsx';
import AdminReports from './pages/AdminReports.jsx';

/**
 * ProtectedRoute Wrapper
 * Redirects to /login if user is not authenticated
 */
function ProtectedRoute({ children }) {
  const { user, token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#080C16] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#18adf2] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const { user, token } = useAuth();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-[#F8FAFC] dark:bg-[#080C16] text-[#0F172A] dark:text-[#F8FAFC] transition-colors duration-500 font-sans selection:bg-[#18adf2]/10 selection:text-[#18adf2]">

      {/* Global animations */}
      <style dangerouslySetInnerHTML={{
        __html: `

        .animate-scroll { animation: scroll 30s linear infinite; }

        @keyframes float-dash {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        .animate-float { animation: float-dash 6s ease-in-out infinite; }

        @keyframes beam-vertical {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(1200%); opacity: 0; }
        }
      `}} />

      {/* 🚨 THE FIX: Fixed background with BOTH Grid and Beams 🚨 */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* 1. The Grid (Removed the WebkitMaskImage so it covers the whole screen) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0F172A0A_1px,transparent_1px),linear-gradient(to_bottom,#0F172A0A_1px,transparent_1px)] bg-[size:4rem_4rem] dark:hidden" />
        <div className="absolute inset-0 hidden dark:block bg-[linear-gradient(to_right,#F8FAFC0A_1px,transparent_1px),linear-gradient(to_bottom,#F8FAFC0A_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* 2. The Moving Beams */}
        <div className="absolute top-0 left-[20%] w-[1px] h-64 bg-gradient-to-b from-transparent via-[#18adf2] to-transparent opacity-0 animate-beam-v" />
        <div className="absolute top-0 left-[60%] w-[1px] h-64 bg-gradient-to-b from-transparent via-[#5048e5] to-transparent opacity-0 animate-beam-v" style={{ animationDelay: '2s' }} />
      </div>

      <Routes>
        <Route path="/" element={<LandingPage isDark={isDark} setIsDark={setIsDark} />} />
        
        {/* Redirect to dashboard if already logged in (or onboarding if not finished) */}
        <Route 
          path="/login" 
          element={user && token ? <Navigate to={user.role === 'admin' ? "/admin" : (user.profession ? "/dashboard" : "/onboarding")} replace /> : <AuthPage initialMode="login" />} 
        />
        <Route 
          path="/register" 
          element={user && token ? <Navigate to={user.role === 'admin' ? "/admin" : (user.profession ? "/dashboard" : "/onboarding")} replace /> : <AuthPage initialMode="register" />} 
        />

        {/* Onboarding & Plan Selection Funnel */}
        <Route 
          path="/onboarding" 
          element={<ProtectedRoute><Onboarding /></ProtectedRoute>} 
        />
        <Route 
          path="/select-plan" 
          element={<ProtectedRoute><SelectPlan /></ProtectedRoute>} 
        />
        <Route 
          path="/checkout" 
          element={<ProtectedRoute><Checkout /></ProtectedRoute>} 
        />

        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardLayout isDark={isDark} setIsDark={setIsDark} />
            </ProtectedRoute>
          }
        >
           <Route index element={<Dashboard />} />
           <Route path="factures" element={<FacturesList />} />
           <Route path="factures/nouvelle" element={<CreateInvoiceForm />} />
           <Route path="devis" element={<Devis />} />
           <Route path="paiements" element={<Paiements />} />
           <Route path="clients" element={<ClientsList />} />
           <Route path="catalogue" element={<Catalogue />} />
           <Route path="statistiques" element={<Statistiques />} />
           <Route path="parametres" element={<Settings />} />
        </Route>

        {/* Isolated Super Admin zone — its own layout, sidebar, header */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminLayout isDark={isDark} setIsDark={setIsDark} />
            </ProtectedRoute>
          }
        >
           <Route index element={<AdminDashboard />} />
           <Route path="utilisateurs" element={<AdminUsers />} />
           <Route path="parametres" element={<AdminSettings />} />
           <Route path="rapports" element={<AdminReports />} />
        </Route>
      </Routes>

    </div>
  );
}