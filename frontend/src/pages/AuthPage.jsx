import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Zap, ArrowLeft, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

export default function AuthPage({ initialMode = 'login' }) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Password strength logic
  const strength = Math.min(Math.floor(password.length / 3), 3);
  const strengthColors = ['bg-red-500', 'bg-amber-500', 'bg-emerald-500', 'bg-cyan-400'];

  const navigate = useNavigate();

  const handleSimulatedSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-[#030712] overflow-hidden font-sans relative">
      
      {/* Background Animated Particle/Mesh Area */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-[60vw] h-[60vw] bg-[radial-gradient(ellipse_at_center,_rgba(34,26,183,0.3)_0%,_transparent_70%)] rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-[radial-gradient(ellipse_at_center,_rgba(24,173,242,0.2)_0%,_transparent_70%)] rounded-full blur-[100px]" 
        />
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-5xl h-[750px] lg:h-[650px] bg-[#0F172A]/80 backdrop-blur-3xl rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-[0_0_100px_rgba(34,26,183,0.2)] overflow-hidden flex flex-col lg:block">
        
        {/* ========================================================= */}
        {/* 1. THE FORM PANEL (Slides Left/Right)                       */}
        {/* ========================================================= */}
        <div 
          className={`absolute top-0 w-full lg:w-1/2 h-full z-20 flex flex-col justify-center p-8 sm:p-16 transition-all duration-[1200ms] ease-[cubic-bezier(0.87,0,0.13,1)] ${
            isLogin ? 'left-0' : 'left-0 lg:translate-x-full'
          }`}
        >
          {/* Solid BG for the form panel to cover the background overlay */}
          <div className="absolute inset-0 bg-[#0F172A] z-0" />

          {/* Desktop Back button in Form (Mobile only visible) */}
          <div className="lg:hidden flex justify-between items-center absolute top-8 left-8 right-8 z-20">
             <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#221ab7] to-[#18adf2] text-white flex items-center justify-center font-black">S</div>
              <span className="font-black tracking-tighter text-white uppercase">SI-PRO</span>
            </div>
            <Link to="/" className="text-white/50 hover:text-white"><ArrowLeft size={20}/></Link>
          </div>

          <div className="relative z-10 w-full max-w-sm mx-auto h-[500px]">
            <AnimatePresence mode="wait">
              {isLogin ? (
                /* --- LOGIN FORM CONTENT --- */
                <motion.div 
                  key="login" 
                  variants={staggerContainer} 
                  initial="hidden" animate="visible" exit="exit" 
                  className="absolute inset-0 flex flex-col"
                >
                  <motion.h2 variants={staggerItem} className="text-3xl font-black text-white mb-2">Connexion</motion.h2>
                  <motion.p variants={staggerItem} className="text-[#94A3B8] mb-8">Accédez à votre tableau de bord SI-PRO.</motion.p>
                  
                  <motion.div variants={staggerItem} className="grid grid-cols-2 gap-4 mb-6">
                    <SocialButton icon={GitHubIcon} text="GitHub" />
                    <SocialButton icon={GoogleIcon} text="Google" />
                  </motion.div>
                  
                  <motion.div variants={staggerItem}><Divider text="Ou avec votre email" /></motion.div>

                  <motion.form variants={staggerItem} className="space-y-4 mt-6" onSubmit={handleSimulatedSubmit}>
                    <InputField icon={Mail} label="Adresse Email" type="email" placeholder="amine@entreprise.ma" />
                    <InputField icon={Lock} label="Mot de passe" type="password" placeholder="••••••••" forgotLink />
                    <SubmitButton text="Se Connecter" isLoading={isLoading} />
                  </motion.form>

                  <motion.p variants={staggerItem} className="lg:hidden text-center text-sm text-[#94A3B8] mt-8">
                    Nouveau ? <button onClick={() => setIsLogin(false)} className="text-[#18adf2] font-bold">Créer un compte</button>
                  </motion.p>
                </motion.div>
              ) : (
                /* --- REGISTER FORM CONTENT --- */
                <motion.div 
                  key="register" 
                  variants={staggerContainer} 
                  initial="hidden" animate="visible" exit="exit" 
                  className="absolute inset-0 flex flex-col"
                >
                  <motion.h2 variants={staggerItem} className="text-3xl font-black text-white mb-2">Créer un compte</motion.h2>
                  <motion.p variants={staggerItem} className="text-[#94A3B8] mb-8">Rejoignez 650+ PME Marocaines aujourd'hui.</motion.p>
                  
                  <motion.div variants={staggerItem} className="grid grid-cols-2 gap-4 mb-6">
                    <SocialButton icon={GitHubIcon} text="GitHub" />
                    <SocialButton icon={GoogleIcon} text="Google" />
                  </motion.div>
                  
                  <motion.div variants={staggerItem}><Divider text="Ou avec votre email" /></motion.div>

                  <motion.form variants={staggerItem} className="space-y-4 mt-6" onSubmit={handleSimulatedSubmit}>
                    <InputField icon={User} label="Nom Complet" type="text" placeholder="Amine Tazi" />
                    <InputField icon={Mail} label="Adresse Email" type="email" placeholder="amine@entreprise.ma" />
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-white/80 uppercase tracking-wider">Mot de passe</label>
                      <div className="relative group/input">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#526e9c] group-focus-within/input:text-[#18adf2] transition-colors"><Lock size={16} /></div>
                        <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-[#526e9c] focus:ring-2 focus:ring-[#18adf2] focus:border-transparent transition-all outline-none" />
                        <div className="absolute inset-0 border border-[#18adf2] rounded-xl opacity-0 scale-95 group-focus-within/input:opacity-100 group-focus-within/input:scale-100 transition-all duration-300 pointer-events-none shadow-[0_0_15px_rgba(24,173,242,0.3)]" />
                      </div>
                      {password.length > 0 && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex gap-1 h-1 w-full bg-white/5 rounded-full overflow-hidden mt-2">
                          {[0, 1, 2, 3].map((level) => (
                            <div key={level} className={`h-full transition-all duration-300 w-1/4 ${strength >= level ? strengthColors[level] : 'bg-transparent'}`} />
                          ))}
                        </motion.div>
                      )}
                    </div>

                    <SubmitButton text="Créer mon compte" isLoading={isLoading} />
                  </motion.form>

                  <motion.p variants={staggerItem} className="lg:hidden text-center text-sm text-[#94A3B8] mt-8">
                    Déjà membre ? <button onClick={() => setIsLogin(true)} className="text-[#18adf2] font-bold">Se connecter</button>
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. THE BRANDING OVERLAY (Slides Right/Left)                 */}
        {/* ========================================================= */}
        <div 
          className={`hidden lg:flex absolute top-0 w-1/2 h-full z-10 transition-all duration-[1200ms] ease-[cubic-bezier(0.87,0,0.13,1)] overflow-hidden ${
            isLogin ? 'left-1/2' : 'left-0'
          }`}
        >
          {/* Deep Animated Gradient Mesh Background */}
          <div className="absolute inset-0 bg-[#080C16] overflow-hidden">
             <motion.div 
                animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg_at_50%_50%,#221ab7,#18adf2,#131B2C,#221ab7)] opacity-40 blur-[80px]"
             />
          </div>
          
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-40 mix-blend-overlay" />
          
          <div className="absolute top-10 left-10 flex items-center gap-6 z-20">
            <Link to="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-bold bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
              <ArrowLeft size={16} /> Retour
            </Link>
          </div>

          <div className="relative w-full h-full flex flex-col items-center justify-center p-16 text-center z-20">
            
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div 
                  key="overlay-login"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1, transition: { delay: 0.3, duration: 0.5 } }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
                  className="flex flex-col items-center"
                >
                  <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 5, repeat: Infinity }} className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center mb-8 shadow-2xl">
                    <Zap size={32} className="text-[#18adf2]" />
                  </motion.div>
                  <h2 className="text-5xl font-black text-white mb-6 leading-tight">Nouveau ici ?</h2>
                  <p className="text-white/80 text-lg mb-10 max-w-sm">
                    Inscrivez-vous pour découvrir comment automatiser votre facturation et gagner un temps précieux chaque jour.
                  </p>
                  <button 
                    onClick={() => setIsLogin(false)}
                    className="px-10 py-4 rounded-xl font-black text-white border-2 border-white/30 bg-white/10 backdrop-blur-md hover:bg-white hover:text-[#221ab7] transition-all duration-300 w-full max-w-xs shadow-xl"
                  >
                    Créer un compte
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="overlay-register"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1, transition: { delay: 0.3, duration: 0.5 } }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
                  className="flex flex-col items-center"
                >
                  <div className="w-20 h-20 rounded-2xl bg-[#221ab7]/40 backdrop-blur-xl border border-[#221ab7]/50 flex items-center justify-center mb-8 shadow-2xl text-white font-black text-4xl">S</div>
                  <h2 className="text-5xl font-black text-white mb-6 leading-tight">Content de <br/>vous revoir !</h2>
                  <p className="text-white/80 text-lg mb-10 max-w-sm">
                    Connectez-vous pour accéder à votre tableau de bord et suivre l'évolution de votre trésorerie.
                  </p>
                  <button 
                    onClick={() => setIsLogin(true)}
                    className="px-10 py-4 rounded-xl font-black text-white border-2 border-white/30 bg-white/10 backdrop-blur-md hover:bg-white hover:text-[#221ab7] transition-all duration-300 w-full max-w-xs shadow-xl"
                  >
                    Se connecter
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </div>
  );
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

function InputField({ icon: Icon, label, type, placeholder, forgotLink }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <label className="text-xs font-bold text-white/80 uppercase tracking-wider">{label}</label>
        {forgotLink && <a href="#" className="text-xs font-bold text-[#18adf2] hover:text-white transition-colors hover:underline">Oublié ?</a>}
      </div>
      <div className="relative group/input">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#526e9c] group-focus-within/input:text-[#18adf2] transition-colors z-10"><Icon size={16} /></div>
        <input type={type} placeholder={placeholder} className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-[#526e9c] focus:ring-2 focus:ring-[#18adf2] focus:border-transparent transition-all outline-none relative z-10" />
        {/* Glow border effect on focus */}
        <div className="absolute inset-0 border border-[#18adf2] rounded-xl opacity-0 scale-95 group-focus-within/input:opacity-100 group-focus-within/input:scale-100 transition-all duration-300 pointer-events-none shadow-[0_0_15px_rgba(24,173,242,0.3)] z-0" />
      </div>
    </div>
  );
}

function SubmitButton({ text, isLoading }) {
  return (
    <button disabled={isLoading} className="w-full py-3.5 rounded-xl font-black text-white bg-gradient-to-r from-[#221ab7] to-[#18adf2] hover:opacity-90 transition-all shadow-[0_0_30px_rgba(24,173,242,0.4)] flex items-center justify-center gap-2 group mt-8 disabled:opacity-70">
      {isLoading ? <Loader2 size={18} className="animate-spin" /> : text}
      {!isLoading && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
    </button>
  );
}

function Divider({ text }) {
  return (
    <div className="relative flex items-center py-2">
      <div className="flex-grow border-t border-white/5"></div>
      <span className="flex-shrink-0 mx-4 text-[10px] font-bold text-[#526e9c] uppercase tracking-widest">{text}</span>
      <div className="flex-grow border-t border-white/5"></div>
    </div>
  );
}

function SocialButton({ icon: Icon, text }) {
  return (
    <button className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm font-bold text-white group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[150%] group-hover:animate-[shimmer_1.5s_infinite]" />
      <Icon /> {text}
    </button>
  );
}

// Bulletproof SVGs
const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400 group-hover:scale-110 transition-transform">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" x2="12" y1="8" y2="8"/><line x1="3.95" x2="8.54" y1="6.06" y2="14"/><line x1="10.88" x2="15.46" y1="21.94" y2="14"/>
  </svg>
);