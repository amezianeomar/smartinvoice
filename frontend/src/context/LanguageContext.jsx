import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../locales';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Check localStorage first, fallback to 'fr'
    const saved = localStorage.getItem('language');
    if (saved && (saved === 'fr' || saved === 'en')) {
      return saved;
    }
    return 'fr';
  });

  // Save to localStorage whenever language changes
  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const switchLanguage = (lang) => {
    if (lang === 'fr' || lang === 'en') {
      setLanguage(lang);
    }
  };

  // The translation function
  // It takes a dot.separated.path like "hero.title1" and returns the string
  const t = (path) => {
    const keys = path.split('.');
    let current = translations[language];
    
    for (const key of keys) {
      if (current[key] === undefined) {
        console.warn(`Missing translation key: ${path} for language: ${language}`);
        return path; // Fallback to returning the key itself
      }
      current = current[key];
    }
    
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
