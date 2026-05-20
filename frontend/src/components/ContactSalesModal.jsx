import React, { useState, useEffect, useCallback } from 'react';
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../services/api';

// ---------------------------------------------------------------------------
// Toast — lightweight self-dismissing notification, no external deps
// ---------------------------------------------------------------------------
function Toast({ message, type, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4500);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const isSuccess = type === 'success';

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-[100] flex items-start gap-3
        px-5 py-4 rounded-2xl shadow-2xl max-w-sm w-full
        border backdrop-blur-sm
        animate-slide-up
        ${isSuccess
          ? 'bg-[#0a1628]/95 border-emerald-500/40 text-emerald-300'
          : 'bg-[#0a1628]/95 border-red-500/40 text-red-300'
        }
      `}
      role="alert"
    >
      {isSuccess
        ? <CheckCircle size={20} className="text-emerald-400 shrink-0 mt-0.5" />
        : <AlertCircle size={20} className="text-red-400 shrink-0 mt-0.5" />
      }
      <span className="text-sm font-medium leading-snug">{message}</span>
      <button
        onClick={onDismiss}
        className="ml-auto text-white/30 hover:text-white/70 transition-colors shrink-0"
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// InputField — reusable dark-themed field
// ---------------------------------------------------------------------------
function InputField({ id, label, type = 'text', placeholder, value, onChange, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        {label} {required && <span className="text-[#18adf2]">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="
          w-full rounded-xl px-4 py-3 text-sm
          bg-[#0a1628] border border-white/10
          text-white placeholder-slate-600
          focus:outline-none focus:border-[#18adf2]/60 focus:ring-2 focus:ring-[#18adf2]/20
          transition-all duration-200
        "
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// ContactSalesModal
// ---------------------------------------------------------------------------
export default function ContactSalesModal({ isOpen, onClose }) {
  const INITIAL_FORM = { name: '', email: '', company: '', message: '' };

  const [form, setForm]       = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [toast, setToast]     = useState(null); // { message, type }

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const dismissToast = useCallback(() => setToast(null), []);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/contact-sales', form);

      setToast({
        message: 'Message sent successfully. Our team will contact you soon.',
        type: 'success',
      });
      setForm(INITIAL_FORM);
      // Close the modal after a short pause so the user sees the success state
      setTimeout(onClose, 1200);
    } catch (error) {
      // Prefer Laravel validation messages, then a generic fallback
      const laravelErrors = error.response?.data?.errors;
      const laravelMessage = error.response?.data?.message;
      const firstError = laravelErrors
        ? Object.values(laravelErrors).flat()[0]
        : laravelMessage || 'Something went wrong. Please try again.';
      setToast({ message: firstError, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Backdrop                                                            */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
        aria-labelledby="contact-sales-title"
      >
        {/* ---------------------------------------------------------------- */}
        {/* Modal Card                                                        */}
        {/* ---------------------------------------------------------------- */}
        <div
          className="
            relative w-full max-w-lg rounded-3xl
            bg-[#0D1526] border border-white/10
            shadow-[0_40px_120px_rgba(0,0,0,0.8)]
            p-8 md:p-10
            overflow-hidden
          "
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative glow blob */}
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(24,173,242,0.12) 0%, transparent 70%)',
            }}
          />

          {/* Close button */}
          <button
            id="contact-sales-close"
            onClick={onClose}
            className="
              absolute top-5 right-5 p-2 rounded-xl
              text-slate-500 hover:text-white hover:bg-white/10
              transition-all duration-200
            "
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="mb-8">
            <span className="inline-block text-[10px] font-black uppercase tracking-[0.2em] text-[#18adf2] mb-3">
              Enterprise Plan
            </span>
            <h2
              id="contact-sales-title"
              className="text-2xl md:text-3xl font-black text-white leading-tight"
            >
              Let's talk about your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#18adf2] to-[#5048e5]">
                business needs.
              </span>
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Fill in the form below and our team will get back to you within 24 hours.
            </p>
          </div>

          {/* Form */}
          <form id="contact-sales-form" onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InputField
                id="cs-name"
                label="Full Name"
                placeholder="Amine Tazi"
                value={form.name}
                onChange={handleChange('name')}
                required
              />
              <InputField
                id="cs-email"
                label="Work Email"
                type="email"
                placeholder="amine@company.ma"
                value={form.email}
                onChange={handleChange('email')}
                required
              />
            </div>

            <InputField
              id="cs-company"
              label="Company Name"
              placeholder="Nord-Sud Logistics"
              value={form.company}
              onChange={handleChange('company')}
              required
            />

            {/* Message textarea */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="cs-message" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Message <span className="text-[#18adf2]">*</span>
              </label>
              <textarea
                id="cs-message"
                rows={4}
                placeholder="Tell us about your team size, current challenges, and what you'd like to achieve with SmartInvoice Pro..."
                value={form.message}
                onChange={handleChange('message')}
                required
                className="
                  w-full rounded-xl px-4 py-3 text-sm
                  bg-[#0a1628] border border-white/10
                  text-white placeholder-slate-600
                  focus:outline-none focus:border-[#18adf2]/60 focus:ring-2 focus:ring-[#18adf2]/20
                  transition-all duration-200 resize-none
                "
              />
            </div>

            {/* Submit */}
            <button
              id="contact-sales-submit"
              type="submit"
              disabled={loading}
              className="
                w-full flex items-center justify-center gap-2.5
                py-3.5 px-6 rounded-xl
                font-bold text-sm text-white
                bg-gradient-to-r from-[#221ab7] to-[#18adf2]
                hover:opacity-90 active:scale-[0.98]
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200 shadow-lg shadow-[#221ab7]/30
                mt-1
              "
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Sending…
                </>
              ) : (
                <>
                  <Send size={15} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Toast rendered outside the modal card but inside the portal fragment */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onDismiss={dismissToast} />
      )}

      {/* Inline keyframe for the toast slide-up animation */}
      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(1rem); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.16,1,0.3,1) forwards;
        }
      `}</style>
    </>
  );
}
