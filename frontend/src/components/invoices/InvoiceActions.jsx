import React from 'react';
import { Download, Mail, Trash2, Eye } from 'lucide-react';

export default function InvoiceActions({
  onView,
  onDownload,
  onSendEmail,
  onDelete,
  busy = false,
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        className="p-2 text-[#526e9c] hover:bg-[#18adf2]/10 hover:text-[#18adf2] rounded-lg transition-colors disabled:opacity-50"
        title="Voir PDF"
        onClick={onView}
        disabled={busy}
      >
        <Eye size={18} />
      </button>
      <button
        type="button"
        className="p-2 text-[#526e9c] hover:bg-emerald-500/10 hover:text-emerald-500 rounded-lg transition-colors disabled:opacity-50"
        title="Télécharger PDF"
        onClick={onDownload}
        disabled={busy}
      >
        <Download size={18} />
      </button>
      <button
        type="button"
        className="p-2 text-[#526e9c] hover:bg-[#18adf2]/10 hover:text-[#18adf2] rounded-lg transition-colors disabled:opacity-50"
        title="Envoyer par email"
        onClick={onSendEmail}
        disabled={busy}
      >
        <Mail size={18} />
      </button>
      <button
        type="button"
        className="p-2 text-[#526e9c] hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors disabled:opacity-50"
        title="Supprimer"
        onClick={onDelete}
        disabled={busy}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}