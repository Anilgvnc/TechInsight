import { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
    StorePersonalInfo: (personalFormValues) => { },
    personalInfos: '',
    token: '',
    isAuthenticated: false,
    authenticate: (token) => { },
    logout: () => { },
});

function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState();
    const [authPersonalInfos, setAuthPersonalInfos] = useState();

    function StorePersonalInfo(personalFormValues) {
        setAuthPersonalInfos(personalFormValues);
    }

    function authenticate(token) {
        setAuthToken(token);
        AsyncStorage.setItem('token', token);
    }

    function logout() {
        setAuthToken(null);
        AsyncStorage.removeItem('token');
    }

    const value = {
        StorePersonalInfo: StorePersonalInfo,
        personalInfos: authPersonalInfos,
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;