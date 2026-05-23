import React from 'react';
import { Download, Mail, Trash2, Eye, Edit } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function InvoiceActions({
  onView,
  onEdit,
  onDownload,
  onSendEmail,
  onDelete,
  busy = false,
  disableEdit = false,
}) {
  const { t } = useLanguage();
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        className="p-2 text-[#526e9c] hover:bg-[#18adf2]/10 hover:text-[#18adf2] rounded-lg transition-colors disabled:opacity-50"
        title={t("factures.actionView") || "Voir"}
        onClick={onView}
        disabled={busy}
      >
        <Eye size={18} />
      </button>
      <button
        type="button"
        className="p-2 text-[#526e9c] hover:bg-amber-500/10 hover:text-amber-500 rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-[#526e9c]"
        title={disableEdit ? "Non modifiable (Facture payée)" : "Modifier"}
        onClick={onEdit}
        disabled={busy || disableEdit}
      >
        <Edit size={18} />
      </button>
      <button
        type="button"
        className="p-2 text-[#526e9c] hover:bg-emerald-500/10 hover:text-emerald-500 rounded-lg transition-colors disabled:opacity-50"
        title={t("factures.actionDownload")}
        onClick={onDownload}
        disabled={busy}
      >
        <Download size={18} />
      </button>
      <button
        type="button"
        className="p-2 text-[#526e9c] hover:bg-[#18adf2]/10 hover:text-[#18adf2] rounded-lg transition-colors disabled:opacity-50"
        title={t("factures.actionEmail")}
        onClick={onSendEmail}
        disabled={busy}
      >
        <Mail size={18} />
      </button>
      <button
        type="button"
        className="p-2 text-[#526e9c] hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors disabled:opacity-50"
        title={t("factures.actionDelete")}
        onClick={onDelete}
        disabled={busy}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}