import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';

export { LanguageSwitcher } from './LanguageSwitcher';

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-300 rounded-xl active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-[#221ab7] dark:bg-[#5048e5] text-white hover:opacity-90 shadow-[0_0_20px_rgba(34,26,183,0.4)] dark:shadow-[0_0_20px_rgba(80,72,229,0.4)]",
    secondary: "bg-[#18adf2] text-white hover:opacity-90 shadow-lg",
    outline: "border-2 border-[#526e9c]/20 hover:bg-[#526e9c]/10 text-[#0F172A] dark:text-white backdrop-blur-sm",
    ghost: "hover:bg-[#526e9c]/10 text-[#526e9c] hover:text-[#0F172A] dark:hover:text-white",
  };
  
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Badge({ children, variant = 'default', pulse = false, className = '' }) {
  const variants = {
    default: "bg-[#526e9c]/10 text-[#526e9c] border-[#526e9c]/20",
    primary: "bg-[#221ab7]/10 text-[#221ab7] dark:text-[#5048e5] border-[#221ab7]/20",
    success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    info: "bg-[#18adf2]/10 text-[#18adf2] border-[#18adf2]/20"
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-widest ${variants[variant]} ${className}`}>
      {pulse && (
        <span className={`w-2 h-2 rounded-full animate-pulse ${
          variant === 'success' ? 'bg-emerald-500' :
          variant === 'warning' ? 'bg-amber-500' :
          variant === 'info' ? 'bg-[#18adf2]' :
          variant === 'primary' ? 'bg-[#221ab7] dark:bg-[#5048e5]' :
          'bg-[#526e9c]'
        }`} />
      )}
      {children}
    </div>
  );
}

export function Card({ className = '', children, ...props }) {
  return (
    <div className={`bg-white dark:bg-[#1e293b] rounded-2xl border border-[#526e9c]/20 shadow-sm overflow-hidden ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children, ...props }) {
  return <div className={`p-6 pb-4 flex flex-col gap-1 ${className}`} {...props}>{children}</div>;
}

export function CardTitle({ className = '', children, ...props }) {
  return <h3 className={`text-xl font-bold text-[#0F172A] dark:text-white leading-tight ${className}`} {...props}>{children}</h3>;
}

export function CardContent({ className = '', children, ...props }) {
  return <div className={`p-6 pt-0 ${className}`} {...props}>{children}</div>;
}

export function Input({ className = '', icon: Icon, wrapperClassName = '', ...props }) {
  return (
    <div className={`relative group/input w-full ${wrapperClassName}`}>
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#526e9c] group-focus-within/input:text-[#18adf2] transition-colors">
          <Icon size={16} />
        </div>
      )}
      <input 
        className={`w-full ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3 rounded-xl border border-[#526e9c]/20 dark:border-white/10 bg-white/50 dark:bg-[#080C16] text-[#0F172A] dark:text-white placeholder-[#526e9c] focus:ring-2 focus:ring-[#18adf2] focus:border-transparent transition-all outline-none ${className}`}
        {...props}
      />
    </div>
  );
}


// ==========================================
// NEW PREMIUM VISUAL PRIMITIVES
// ==========================================

export function SpotlightCard({ children, className = '' }) {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => { setIsFocused(true); setOpacity(1); };
  const handleBlur = () => { setIsFocused(false); setOpacity(0); };
  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(24,173,242,0.1), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}

export function AnimatedCounter({ value, className = '' }) {
  const nodeRef = useRef(null);
  
  useEffect(() => {
    const node = nodeRef.current;
    const controls = animate(0, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(v) {
        if (node) {
          node.textContent = new Intl.NumberFormat('fr-MA').format(Math.floor(v));
        }
      }
    });
    return () => controls.stop();
  }, [value]);

  return <span ref={nodeRef} className={className}>0</span>;
}

export function MagneticWrapper({ children }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
