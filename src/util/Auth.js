import axios from 'axios';
import { LOGIN_URL } from '@env';
import { REGISTER_URL } from '@env';

export async function createUser(displayName, email, password) {
    const response = await axios.post(REGISTER_URL, {
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
    const response = await axios.post(LOGIN_URL, {
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