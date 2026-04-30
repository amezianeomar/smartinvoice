import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Simulated Card State
  const [cardName, setCardName] = useState(user?.nom || '');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  // We assume intent is 'pro' from SelectPlan
  const planName = 'SI-PRO';
  const price = 199.00;

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!cardNumber || !expiry || !cvc || !cardName) {
      setError("Veuillez remplir tous les champs de la carte.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 1. Call checkout endpoint to get intent (Simulated)
      const checkoutRes = await api.post('/subscription/checkout', {
        abonnement: 'pro'
      });
      
      const { amount } = checkoutRes.data.data;

      // Simulate payment processing delay (1.5s)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate occasional random failure for testing robustness (Uncomment to test)
      // if (Math.random() > 0.8) throw new Error("La banque a refusé la transaction.");

      // 2. Call success endpoint to finalize payment
      const successRes = await api.post('/subscription/success', {
        abonnement: 'pro',
        amount: amount
      });

      if (successRes.data.success) {
        // Since we don't have react-hot-toast, we'll use a custom success state or rely on navigation
        // For a seamless feel, just navigate directly to dashboard
        navigate('/dashboard?payment_success=true');
      }

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Erreur lors du traitement du paiement.");
      setIsLoading(false);
    }
  };

  // Auto-format card number
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
    if (formattedValue.length <= 19) {
      setCardNumber(formattedValue);
    }
  };

  // Auto-format expiry
  const handleExpiryChange = (e) => {
    const value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (value.length >= 2 && !value.includes('/')) {
      setExpiry(value.substring(0, 2) + '/' + value.substring(2, 4));
    } else if (value.length <= 4) {
      setExpiry(value);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans flex items-center justify-center">
      
      {/* Background Mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} 
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[radial-gradient(ellipse_at_center,_rgba(34,26,183,0.15)_0%,_transparent_60%)] rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(ellipse_at_center,_rgba(24,173,242,0.15)_0%,_transparent_60%)] rounded-full blur-[120px]" 
        />
      </div>

      <div className="max-w-5xl w-full mx-auto relative z-10 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Column: Order Summary */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
          className="w-full lg:w-1/3 bg-[#0F172A]/60 backdrop-blur-xl rounded-[2rem] border border-white/10 p-8 flex flex-col shadow-2xl"
        >
          <Link to="/select-plan" className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-white transition-colors mb-8">
            <ArrowLeft size={16} /> Changer d'abonnement
          </Link>

          <h2 className="text-xl font-black text-white mb-6">Résumé de la commande</h2>
          
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="font-bold text-white">{planName}</p>
              <p className="text-sm text-[#94A3B8]">Abonnement Mensuel</p>
            </div>
            <span className="font-black text-white">{price} DH</span>
          </div>

          <div className="border-t border-white/10 my-4 pt-4">
            <div className="flex justify-between items-center">
              <p className="font-bold text-white text-lg">Total</p>
              <span className="font-black text-[#18adf2] text-xl">{price} DH</span>
            </div>
          </div>

          <div className="mt-auto pt-8 flex items-start gap-3">
            <ShieldCheck className="text-[#18adf2] flex-shrink-0" size={20} />
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Vos paiements sont sécurisés. Nous utilisons un cryptage SSL 256 bits pour protéger vos informations.
            </p>
          </div>
        </motion.div>

        {/* Right Column: Payment Details */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full lg:w-2/3 bg-gradient-to-b from-[#1E293B] to-[#0F172A] backdrop-blur-xl rounded-[2.5rem] border-2 border-[#18adf2]/30 p-8 sm:p-12 shadow-[0_0_50px_rgba(24,173,242,0.1)] relative"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-[#221ab7] to-[#18adf2] rounded-xl flex items-center justify-center shadow-lg">
              <CreditCard size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">Paiement</h2>
              <p className="text-[#94A3B8] text-sm">Entrez vos informations de carte</p>
            </div>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl flex items-start gap-3">
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handlePayment} className="space-y-6">
            
            {/* Cardholder Name */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/80 uppercase tracking-wider">Nom sur la carte</label>
              <div className="relative group/input">
                <input 
                  type="text" 
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Jean Dupont"
                  className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-[#526e9c] focus:ring-2 focus:ring-[#18adf2] focus:border-transparent transition-all outline-none" 
                />
              </div>
            </div>

            {/* Card Number */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/80 uppercase tracking-wider">Numéro de carte</label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  {/* Fake Visa/Mastercard Icon */}
                  <svg className="h-6 w-10 text-white/40" viewBox="0 0 36 24" fill="none">
                    <rect width="36" height="24" rx="4" fill="currentColor"/>
                    <circle cx="13" cy="12" r="6" fill="#EA001B"/>
                    <circle cx="23" cy="12" r="6" fill="#F79E1B" fillOpacity="0.8"/>
                  </svg>
                </div>
                <input 
                  type="text" 
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="0000 0000 0000 0000"
                  className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-[#526e9c] focus:ring-2 focus:ring-[#18adf2] focus:border-transparent transition-all outline-none font-mono tracking-wider" 
                />
              </div>
            </div>

            {/* Expiry and CVC */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/80 uppercase tracking-wider">Date d'exp.</label>
                <div className="relative group/input">
                  <input 
                    type="text" 
                    value={expiry}
                    onChange={handleExpiryChange}
                    placeholder="MM/AA"
                    maxLength="5"
                    className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-[#526e9c] focus:ring-2 focus:ring-[#18adf2] focus:border-transparent transition-all outline-none font-mono" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-white/80 uppercase tracking-wider">CVC</label>
                <div className="relative group/input">
                  <input 
                    type="text" 
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, '').substring(0, 4))}
                    placeholder="123"
                    className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-[#526e9c] focus:ring-2 focus:ring-[#18adf2] focus:border-transparent transition-all outline-none font-mono" 
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 mt-4 rounded-xl font-black text-white bg-gradient-to-r from-[#221ab7] to-[#18adf2] hover:opacity-90 transition-all shadow-[0_0_30px_rgba(24,173,242,0.4)] flex justify-center items-center gap-2 disabled:opacity-50 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin relative z-10" size={20} />
                  <span className="relative z-10">Traitement en cours...</span>
                </>
              ) : (
                <span className="relative z-10">Payer {price} DH</span>
              )}
            </button>
          </form>
        </motion.div>

      </div>
    </div>
  );
}
