import React from 'react';
import ComingSoonState from '../components/ui/ComingSoonState';
import { useLanguage } from '../context/LanguageContext';

export default function Devis() {
  const { t } = useLanguage();
  return <ComingSoonState featureName={t('sidebar.quotes')} />;
}
