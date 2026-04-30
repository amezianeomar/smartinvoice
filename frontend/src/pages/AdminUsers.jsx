import React, { useState, useEffect } from 'react';
import { Users, Loader2, Mail, CheckCircle2, XCircle } from 'lucide-react';
import api from '../services/api';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/admin/users');
        if (response.data.success) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="animate-spin text-[#18adf2]" size={32} /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-[#0F172A] dark:text-white mb-1 tracking-tight flex items-center gap-3">
          <Users className="text-[#18adf2]" size={32} />
          Gestion des Utilisateurs
        </h1>
        <p className="text-[#526e9c] text-sm font-medium">Consultez tous les utilisateurs inscrits sur la plateforme.</p>
      </div>

      <div className="bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl rounded-3xl border border-[#526e9c]/20 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#526e9c]/10 bg-[#526e9c]/5">
                <th className="px-6 py-4 text-xs font-bold text-[#526e9c] uppercase tracking-wider">Utilisateur</th>
                <th className="px-6 py-4 text-xs font-bold text-[#526e9c] uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-xs font-bold text-[#526e9c] uppercase tracking-wider">Plan</th>
                <th className="px-6 py-4 text-xs font-bold text-[#526e9c] uppercase tracking-wider">Statut</th>
                <th className="px-6 py-4 text-xs font-bold text-[#526e9c] uppercase tracking-wider">Inscription</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#526e9c]/10">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-[#526e9c]/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#221ab7] to-[#18adf2] p-0.5">
                        <div className="w-full h-full rounded-full bg-white dark:bg-[#0F172A] flex items-center justify-center font-bold text-[#221ab7] uppercase">
                          {user.nom ? user.nom.charAt(0) : 'U'}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#0F172A] dark:text-white">{user.nom}</p>
                        <p className="text-xs text-[#526e9c]">{user.type_entreprise || 'Non spécifié'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-[#526e9c]">
                      <Mail size={14} />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                      user.abonnement === 'pro' 
                        ? 'bg-[#18adf2]/10 text-[#18adf2] border border-[#18adf2]/20' 
                        : 'bg-[#526e9c]/10 text-[#526e9c] border border-[#526e9c]/20'
                    }`}>
                      {user.abonnement === 'pro' ? 'Pro' : 'Gratuit'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                      user.statut_abonnement === 'actif'
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                        : 'bg-red-500/10 text-red-500 border border-red-500/20'
                    }`}>
                      {user.statut_abonnement === 'actif' ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                      {user.statut_abonnement === 'actif' ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#526e9c] font-medium">
                    {new Date(user.created_at).toLocaleDateString('fr-FR')}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-[#526e9c]">
                    Aucun utilisateur trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
