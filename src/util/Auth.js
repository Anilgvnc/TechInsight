import axios from 'axios';
import { LOGIN_URL } from '@env';
import { REGISTER_URL } from '@env';

export async function createUser(email, password) {
    const response = await axios.post(REGISTER_URL, {
        email: email,
        password: password,
        returnSecureToken: true,
    });

    const token = response.data.idToken;

    return token;
}

export async function login(email, password) {
    const response = await axios.post(LOGIN_URL, {
        email: email,
        password: password,
        returnSecureToken: true,
    });

    const token = response.data.idToken;

    return token;
} 