import axios from 'axios';
import { BACKEND_URL } from '@env';

/* Account */
export async function PostAccountInfo(accountData) {
    const response = await axios.post(BACKEND_URL + '/account.json', accountData);
    const id = response.data.name;
    return id;
}

export async function fetchProfile(id) {
    const response = await axios.get(BACKEND_URL + '/account/${id}.json');

    const data = [];

    for (const key in response.data) {
        const accountDataObj = {
            id: key,
            name: response.data[key].name,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        };
        data.push(accountDataObj);
    }

    return data;
}

export function updateExpense(id, accountData) {
    return axios.put(BACKEND_URL + `/account/${id}.json`, accountData);
}

export function deleteExpense(id) {
    return axios.delete(BACKEND_URL + `/account/${id}.json`);
}

// Product
export async function addProduct(productData) {
    const response = await axios.post(BACKEND_URL + '/product.json', productData);
    const id = response.data.name;
    return id;
}

// Fetching all products 
export async function fetchProduct() {
    const response = await axios.get(BACKEND_URL + '/product.json');

    const products = [];

    for (const key in response.data) {
        const productDataObj = {
            id: key,
            pName: response.data[key].pName,
            url: response.data[key].url,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        };
        products.push(productDataObj);
    }

    return products;
}

export async function getProduct(id) {
    const response = axios.get(BACKEND_URL + `/product/${id}.json`);

    const product = {
        pName: response.data.pName,
        url: response.data.url,
        date: new Date(response.data.date),
        description: response.data.description,
    };

    return response;
}

export function updateProduct(id, productData) {
    return axios.put(BACKEND_URL + `/product/${id}.json`, productData);
}

export function deleteProduct(id) {
    return axios.delete(BACKEND_URL + `/product/${id}.json`);
}