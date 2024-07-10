import { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
    StoreNameInfo: (nameValue) => { },
    nameInfo: '',
    StoreMailInfo: (mailValue) => { },
    mailInfo: '',
    token: '',
    isAuthenticated: false,
    authenticate: (token) => { },
    logout: () => { },
});

function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState();
    const [authNameInfo, setAuthNameInfo] = useState();
    const [authMailInfo, setAuthMailInfo] = useState();

    function StoreName(nameValue) {
        setAuthNameInfo(nameValue);
        AsyncStorage.setItem('displayName', nameValue);
    }

    function StoreMail(mailValue) {
        setAuthMailInfo(mailValue);
        AsyncStorage.setItem('email', mailValue);
    }

    function authenticate(token) {
        setAuthToken(token);
        AsyncStorage.setItem('token', token);
    }

    function logout() {
        //name
        setAuthNameInfo(null);
        AsyncStorage.removeItem('displayName');
        //mail
        setAuthMailInfo(null);
        AsyncStorage.removeItem('email');
        //token
        setAuthToken(null);
        AsyncStorage.removeItem('token');
    }

    const value = {
        StoreNameInfo: StoreName,
        nameInfo: authNameInfo,
        StoreMailInfo: StoreMail,
        mailInfo: authMailInfo,
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;