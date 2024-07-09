import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useContext, useEffect } from 'react';
import AppLoading from 'expo-app-loading';

import { AuthNavigation } from './src/navigation/StackNavigator';
import AuthContextProvider from './src/store/auth-context';
import { AuthContext } from './src/store/auth-context';
import ProductsContextProvider from './src/store/products-context';
import ThemeContextProvider from './src/store/ThemeContext';

function Root() {

  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  /*
  if (isTryingLogin) {
    return <AppLoading />;
  }
  */

  return <AuthNavigation />;
}

const App = () => (
  <ProductsContextProvider>
    <ThemeContextProvider>
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </ThemeContextProvider>
  </ProductsContextProvider>
);

export default App;


