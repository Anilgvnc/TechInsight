import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useContext, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import { AuthNavigation } from './src/navigation/StackNavigator';
import AuthContextProvider from './src/store/auth-context';
import { AuthContext } from './src/store/auth-context';
import ProductsContextProvider from './src/store/products-context';
import ThemeContextProvider, { PreferencesContext } from './src/store/ThemeContext';
import { I18nContext, I18nProvider } from './src/store/i18n-context';

SplashScreen.preventAutoHideAsync();

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);
  const i18nCtx = useContext(I18nContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      const storedName = await AsyncStorage.getItem('displayName');
      const storedMail = await AsyncStorage.getItem('email');

      if (storedToken) {
        authCtx.authenticate(storedToken);
        authCtx.StoreNameInfo(storedName);
        authCtx.StoreMailInfo(storedMail);
      }

      setIsTryingLogin(false);
    }
    fetchToken();

    //i18n
    async function SetLocale() {
      const storedLangPref = await AsyncStorage.getItem('langPref');

      if (storedLangPref) {
        i18nCtx.SetLang(storedLangPref);
      }
    }
    SetLocale();
  }, []);


  if (!isTryingLogin) {
    SplashScreen.hideAsync();
  }

  return <AuthNavigation />;
}

const App = () => (
  <ThemeContextProvider>
    <I18nProvider>
      <AuthContextProvider>
        <ProductsContextProvider>
          <Root />
        </ProductsContextProvider>
      </AuthContextProvider>
    </I18nProvider>
  </ThemeContextProvider>
);

export default App;


