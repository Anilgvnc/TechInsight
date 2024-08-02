import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useContext, useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';

import { AuthNavigation } from './src/navigation/StackNavigator';
import AuthContextProvider from './src/store/auth-context';
import { AuthContext } from './src/store/auth-context';
import ProductsContextProvider from './src/store/products-context';
import ThemeContextProvider from './src/store/ThemeContext';

SplashScreen.preventAutoHideAsync();

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);

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
  }, []);


  if (!isTryingLogin) {
    SplashScreen.hideAsync();
  }

  return <AuthNavigation />;
}

const App = () => (
  <ThemeContextProvider>
    <AuthContextProvider>
      <ProductsContextProvider>
        <Root />
      </ProductsContextProvider>
    </AuthContextProvider>
  </ThemeContextProvider>
);

export default App;


