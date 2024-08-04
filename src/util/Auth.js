import axios from 'axios';

export async function createUser(displayName, email, password) {
    const registerUrl = process.env.EXPO_PUBLIC_REGISTER_URL;
    const response = await axios.post(registerUrl, {
        displayName: displayName,
        email: email,
        password: password,
        returnSecureToken: true,
    });

    const accountInfo = {
        token: response.data.idToken,
        displayName: response.data.displayName,
        mail: response.data.email,
    };

    return accountInfo;
}

export async function login(email, password) {
    const loginUrl = process.env.EXPO_PUBLIC_LOGIN_URL;

    const response = await axios.post(loginUrl, {
        email: email,
        password: password,
        returnSecureToken: true,
    });

    const accountInfo = {
        token: response.data.idToken,
        displayName: response.data.displayName,
        mail: response.data.email,
    };

    return accountInfo;
} 