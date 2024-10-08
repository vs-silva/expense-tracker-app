import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import En from './messages/en';

export default i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: process.env.NODE_ENV === 'development',
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        },
        resources: {
            en: En
        },

    });