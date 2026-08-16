import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ptBR from './locales/pt-BR.json';
import enUS from './locales/en-US.json';
import esES from './locales/es-ES.json';

export const resources = {
  'pt-BR': { translation: ptBR },
  'en-US': { translation: enUS },
  'es-ES': { translation: esES },
} as const;

export const SUPPORTED_LANGUAGES = [
  { code: 'pt-BR', label: 'pt-BR', name: 'Português', flag: 'BR' },
  { code: 'en-US', label: 'en-US', name: 'English', flag: 'US' },
  { code: 'es-ES', label: 'es-ES', name: 'Español', flag: 'ES' },
] as const;

export type SupportedLanguageCode = (typeof SUPPORTED_LANGUAGES)[number]['code'];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt-BR',
    supportedLngs: ['pt-BR', 'en-US', 'es-ES'],
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false, // React already handles XSS
    },
    react: {
      useSuspense: false,
    },
  });

// Update html lang attribute on initialization and language change
if (typeof document !== 'undefined') {
  document.documentElement.lang = i18n.language || 'pt-BR';
  i18n.on('languageChanged', (lng) => {
    document.documentElement.lang = lng;
  });
}

export default i18n;
