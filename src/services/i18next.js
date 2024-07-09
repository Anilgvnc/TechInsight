import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '../locales/en.json'
import es from '../locales/es.json'
import tr from '../locales/tr.json'

export const languageResources = {
    en: { translation: en },
    es: { translation: es },
    tr: { translation: tr },
};

i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        lng: 'en',
        fallbackLng: 'en',
        resources: languageResources,
    });

export default i18next;