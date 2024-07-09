import React from 'react';
import { useState, createContext, useCallback, useMemo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import {
    PaperProvider,
    MD2LightTheme,
    MD2DarkTheme,
} from 'react-native-paper';

import { I18nextProvider } from 'react-i18next';
import i18next from '../services/i18next';

const CombinedDefaultTheme = {
    ...MD2LightTheme,
    ...NavigationDefaultTheme,
    colors: {
        ...MD2LightTheme.colors,
        ...NavigationDefaultTheme.colors,
    },
};
const CombinedDarkTheme = {
    ...MD2DarkTheme,
    ...NavigationDarkTheme,
    colors: {
        ...MD2DarkTheme.colors,
        ...NavigationDarkTheme.colors,
    },
};

export const PreferencesContext = createContext({
    toggleTheme: () => { },
    isThemeDark: false,
});

const Stack = createStackNavigator();

function ThemeContextProvider({ children }) {
    const [isThemeDark, setIsThemeDark] = useState(false);

    let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

    const toggleTheme = useCallback(() => {
        return setIsThemeDark(!isThemeDark);
    }, [isThemeDark]);

    const preferences = useMemo(
        () => ({
            toggleTheme,
            isThemeDark,
        }),
        [toggleTheme, isThemeDark]
    );

    return (
        // Context is wired into the local state of our main component, so that its values could be propagated throughout the entire application
        <I18nextProvider i18n={i18next} defaultNS={'translation'}>
            <PreferencesContext.Provider value={preferences}>
                <PaperProvider theme={theme}>
                    <NavigationContainer theme={theme}>
                        {children}
                    </NavigationContainer>
                </PaperProvider>
            </PreferencesContext.Provider>
        </I18nextProvider>
    );
}

export default ThemeContextProvider;