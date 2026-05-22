import React, { useState, useEffect } from 'react';
import { MessageSquare, Loader2, Mail, Building2, Calendar, ChevronDown, ChevronUp, Inbox } from 'lucide-react';
import api from '../services/api';

// Status badge config
const STATUS_STYLES = {
  nouveau:    'bg-[#18adf2]/10 text-[#18adf2] border border-[#18adf2]/20',
  en_cours:   'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  traité:     'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  archivé:    'bg-[#526e9c]/10 text-[#526e9c] border border-[#526e9c]/20',
};

const STATUS_LABELS = {
  nouveau:  'Nouveau',
  en_cours: 'En Cours',
  traité:   'Traité',
  archivé:  'Archivé',
};

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES['nouveau'];
  const label = STATUS_LABELS[status] ?? status;
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold capitalize ${style}`}>
      {label}
    </span>
  );
}

// Expandable message row
function MessageRow({ msg }) {
  const [expanded, setExpanded] = useState(false);

  const date = new Date(msg.created_at).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const preview = msg.message.length > 80
    ? msg.message.slice(0, 80) + '…'
    : msg.message;

  return (
    <>
      <tr
        className="hover:bg-[#526e9c]/5 transition-colors cursor-pointer group"
        onClick={() => setExpanded((p) => !p)}
      >
        {/* Date */}
        <td className="px-5 py-4 whitespace-nowrap">
          <div className="flex items-center gap-1.5 text-xs text-[#526e9c] font-medium">
            <Calendar size={13} />
            {date}
          </div>
        </td>

        {/* Name */}
        <td className="px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#221ab7] to-[#18adf2] p-0.5 shrink-0">
              <div className="w-full h-full rounded-full bg-[#0D1526] flex items-center justify-center font-black text-[#18adf2] uppercase text-sm">
                {msg.name.charAt(0)}
              </div>
            </div>
            <span className="text-sm font-bold text-white">{msg.name}</span>
          </div>
        </td>

        {/* Company */}
        <td className="px-5 py-4">
          <div className="flex items-center gap-1.5 text-sm text-[#526e9c]">
            <Building2 size={13} className="shrink-0" />
            {msg.company}
          </div>
        </td>

        {/* Email */}
        <td className="px-5 py-4">
          <div className="flex items-center gap-1.5 text-sm text-[#526e9c]">
            <Mail size={13} className="shrink-0" />
            <a
              href={`mailto:${msg.email}`}
              className="hover:text-[#18adf2] transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {msg.email}
            </a>
          </div>
        </td>

        {/* Message preview */}
        <td className="px-5 py-4 max-w-[200px]">
          <p className="text-xs text-[#526e9c] truncate">{preview}</p>
        </td>

        {/* Status */}
        <td className="px-5 py-4">
          <StatusBadge status={msg.status} />
        </td>

        {/* Expand toggle */}
        <td className="px-5 py-4 text-[#526e9c]">
          {expanded
            ? <ChevronUp size={16} className="text-[#18adf2]" />
            : <ChevronDown size={16} className="group-hover:text-white transition-colors" />
          }
        </td>
      </tr>

      {/* Expanded full message */}
      {expanded && (
        <tr className="bg-[#0a1628]/60">
          <td colSpan={7} className="px-8 py-5">
            <div className="rounded-xl border border-white/5 bg-[#080C16] p-4">
              <p className="text-xs font-bold text-[#526e9c] uppercase tracking-widest mb-2">Message Complet</p>
              <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{msg.message}</p>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────
export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get('/admin/messages');
        if (response.data.success) {
          setMessages(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch messages', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-[#18adf2]" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black text-[#0F172A] dark:text-white mb-1 tracking-tight flex items-center gap-3">
          <MessageSquare className="text-[#18adf2]" size={32} />
          Leads & Messages Sales
        </h1>
        <p className="text-[#526e9c] text-sm font-medium">
          Demandes reçues via le formulaire Contact Sales de la landing page.
        </p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total',    value: messages.length,                                        color: 'text-white' },
          { label: 'Nouveaux', value: messages.filter((m) => m.status === 'nouveau').length,  color: 'text-[#18adf2]' },
          { label: 'En Cours', value: messages.filter((m) => m.status === 'en_cours').length, color: 'text-amber-400' },
          { label: 'Traités',  value: messages.filter((m) => m.status === 'traité').length,   color: 'text-emerald-400' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl rounded-2xl border border-[#526e9c]/20 px-5 py-4"
          >
            <p className="text-xs font-bold text-[#526e9c] uppercase tracking-wider mb-1">{stat.label}</p>
            <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white/70 dark:bg-[#131B2C]/70 backdrop-blur-xl rounded-3xl border border-[#526e9c]/20 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#526e9c]/10 bg-[#526e9c]/5">
                {['Date', 'Contact', 'Entreprise', 'Email', 'Message', 'Statut', ''].map((col) => (
                  <th
                    key={col}
                    className="px-5 py-4 text-xs font-bold text-[#526e9c] uppercase tracking-wider"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#526e9c]/10">
              {messages.map((msg) => (
                <MessageRow key={msg.id} msg={msg} />
              ))}

              {messages.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <Inbox size={40} className="mx-auto mb-3 text-[#526e9c]/40" />
                    <p className="text-[#526e9c] font-medium">Aucun message reçu pour l'instant.</p>
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
