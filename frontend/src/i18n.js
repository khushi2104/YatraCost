import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationMR from './locales/mr/translation.json';

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  mr: {
    translation: translationMR,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en', // use if selected language is not available

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
