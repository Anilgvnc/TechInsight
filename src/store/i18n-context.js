import i18next from '../services/i18next';
import { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const I18nContext = createContext({
    SetLang: (langPref) => { },
    lang: 'en'
})

export function I18nProvider({ children }) {
    const [locale, setLocale] = useState();

    function SetLang(langPref) {
        setLocale(langPref);
        AsyncStorage.setItem('langPref', langPref);
        i18next.changeLanguage(langPref);
    }

    const value = {
        SetLang: SetLang,
        lang: locale
    }

    return (
        <I18nContext.Provider value={value}>
            {children}
        </I18nContext.Provider>
    )
}