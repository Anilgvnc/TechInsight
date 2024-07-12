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

export function updateAccount(id, accountData) {
    return axios.put(BACKEND_URL + `/account/${id}.json`, accountData);
}

export function deleteAccount(id) {
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

//Fetch one of the product
export async function getProduct(id) {
    const response = await axios.get(BACKEND_URL + `/product/${id}.json`);

    const product = {
        pName: response.data.pName,
        url: response.data.url,
        date: new Date(response.data.date),
        description: response.data.description,
    };

    return product;
}

export function updateProduct(id, productData) {
    return axios.put(BACKEND_URL + `/product/${id}.json`, productData);
}

export function deleteProduct(id) {
    return axios.delete(BACKEND_URL + `/product/${id}.json`);
}

//Add Review
export async function addReview(productId, reviewData) {
    const response = await axios.post(BACKEND_URL + `/product/${productId}/reviews.json`, reviewData);
    const id = response.data.name;
    return id;
}

//Fetch Reviews
export async function fetchReviews(productId) {
    const response = await axios.get(BACKEND_URL + `/product/${productId}/reviews.json`);

    const reviews = [];

    for (const key in response.data) {
        const dataObj = {
            id: key,
            rTitle: response.data[key].rTitle,
            rMessage: response.data[key].rMessage,
            rRate: response.data[key].rRate,
            date: new Date(response.data[key].date)
        };
        reviews.push(dataObj);
    }

    return reviews;
}
//Delete Review
export function deleteReview(productId, reviewId) {
    return axios.delete(BACKEND_URL + `/product/${productId}/reviews/${reviewId}.json`);
}