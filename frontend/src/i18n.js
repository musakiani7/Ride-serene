import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// RTL languages
const rtlLanguages = ['ur', 'ar'];

i18n
  .use(HttpBackend) // Load translations using http (default public/assets/locals/en/translation.json)
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n down to react-i18next
  .init({
    fallbackLng: 'en',
    debug: false, // Set to true for development debugging
    
    // Supported languages
    supportedLngs: ['en', 'fr', 'nl', 'es', 'ur', 'zh', 'ja'],
    
    // Language detection options
    detection: {
      // Order of detection methods
      order: ['localStorage', 'navigator', 'htmlTag'],
      
      // Cache user language
      caches: ['localStorage'],
      
      // Keys for localStorage
      lookupLocalStorage: 'i18nextLng',
    },
    
    // Backend options
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    
    // React options
    react: {
      useSuspense: true,
    },
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

// Change HTML direction and lang attribute when language changes
i18n.on('languageChanged', (lng) => {
  const htmlTag = document.documentElement;
  
  // Set language attribute
  htmlTag.setAttribute('lang', lng);
  
  // Set direction attribute
  if (rtlLanguages.includes(lng)) {
    htmlTag.setAttribute('dir', 'rtl');
  } else {
    htmlTag.setAttribute('dir', 'ltr');
  }
  
  // Store in localStorage
  localStorage.setItem('i18nextLng', lng);
});

export default i18n;
