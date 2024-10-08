import axios from 'axios';

const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

/* Account */
export async function PostAccountInfo(accountData) {
    const response = await axios.post(backendUrl + '/account.json', accountData);
    const id = response.data.name;
    return id;
}

export async function fetchProfile(id) {
    const response = await axios.get(backendUrl + '/account/${id}.json');

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
    return axios.put(backendUrl + `/account/${id}.json`, accountData);
}

export function deleteAccount(id) {
    return axios.delete(backendUrl + `/account/${id}.json`);
}

// Product
export async function addProduct(productData) {
    const response = await axios.post(backendUrl + '/product.json', productData);
    const id = response.data.name;
    return id;
}

// Fetching all products 
export async function fetchProduct() {
    const response = await axios.get(backendUrl + '/product.json');

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
    const response = await axios.get(backendUrl + `/product/${id}.json`);

    const product = {
        pName: response.data.pName,
        url: response.data.url,
        description: response.data.description,
        specifications: response.data.specifications,
    };

    return product;
}

export function updateProduct(id, productData) {
    return axios.put(backendUrl + `/product/${id}.json`, productData);
}

export function deleteProduct(id) {
    return axios.delete(backendUrl + `/product/${id}.json`);
}

//Add Review
export async function addReview(productId, reviewData) {
    const response = await axios.post(backendUrl + `/product/${productId}/reviews.json`, reviewData);
    const id = response.data.name;
    return id;
}

//Fetch Reviews
export async function fetchReviews(productId) {
    const response = await axios.get(backendUrl + `/product/${productId}/reviews.json`);

    const reviews = [];

    for (const key in response.data) {
        const dataObj = {
            id: key,
            rAuthor: response.data[key].rAuthor,
            rMail: response.data[key].rMail,
            rTitle: response.data[key].rTitle,
            rMessage: response.data[key].rMessage,
            rRate: response.data[key].rRate,
            date: response.data[key].createdOn
        };
        reviews.push(dataObj);
    }

    return reviews;
}

//Fetch one of the review
export async function fetchReview(productId, reviewId) {
    const response = await axios.get(backendUrl + `/product/${productId}/reviews/${reviewId}.json`);

    const review = {
        rAuthor: response.data.rAuthor,
        rMail: response.data.rMail,
        rTitle: response.data.rTitle,
        rMessage: response.data.rMessage,
        rRate: response.data.rRate,
        date: response.data.createdOn
    };

    return review;
}

//Update Review
export function updateReview(productId, reviewId, reviewData) {
    return axios.put(backendUrl + `/product/${productId}/reviews/${reviewId}.json`, reviewData);
}

//Delete Review
export function deleteReview(productId, reviewId) {
    return axios.delete(backendUrl + `/product/${productId}/reviews/${reviewId}.json`);
}

//Forum
export async function addForum(forumData) {
    const response = await axios.post(backendUrl + '/forums.json', forumData);
    const id = response.data.name;
    return id;
}

export async function fetchForums() {
    const response = await axios.get(backendUrl + '/forums.json/');

    const forums = [];

    for (const key in response.data) {
        const forumData = {
            id: key,
            fAuthor: response.data[key].fAuthor,
            fMail: response.data[key].fMail,
            fTitle: response.data[key].fTitle,
            fMessage: response.data[key].fMessage,
            date: response.data[key].createdOn,
        }
        forums.push(forumData);
    }
    return forums;
}

export async function fetchForum(forumId) {
    const response = await axios.get(backendUrl + `/forums/${forumId}.json`);

    const forumData = {
        fAuthor: response.data.fAuthor,
        fMail: response.data.fMail,
        fTitle: response.data.fTitle,
        fMessage: response.data.fMessage,
        date: response.data.createdOn
    }
    return forumData;
}

export function updateForum(forumId, forumData) {
    return axios.put(backendUrl + `/forums/${forumId}.json`, forumData);
}

export function deleteForum(forumId) {
    return axios.delete(backendUrl + `/forums/${forumId}.json`);
}

//Forum reply
export async function addReply(forumId, replyData) {
    const response = await axios.post(backendUrl + `/forums/${forumId}/replys.json`, replyData);
    const id = response.data.name;
    return id;
}

export async function fetchReplys(forumId) {
    const response = await axios.get(backendUrl + `/forums/${forumId}/replys.json/`);

    const replys = [];

    for (const key in response.data) {
        const replyData = {
            id: key,
            rAuthor: response.data[key].rAuthor,
            rMail: response.data[key].rMail,
            rTitle: response.data[key].rTitle,
            rMessage: response.data[key].rMessage,
            date: response.data[key].createdOn
        }
        replys.push(replyData);
    }
    return replys;
}

export async function fetchReply(forumId, replyId) {
    const response = await axios.get(backendUrl + `/forums/${forumId}/replys/${replyId}.json`);

    const review = {
        rAuthor: response.data.rAuthor,
        rMail: response.data.rMail,
        rTitle: response.data.rTitle,
        rMessage: response.data.rMessage,
        date: response.data.createdOn
    };

    return review;
}

export function updateReply(forumId, replyId, replyData) {
    return axios.put(backendUrl + `/forums/${forumId}/replys/${replyId}.json`, replyData);
}

export function deleteReply(forumId, replyId) {
    return axios.delete(backendUrl + `/forums/${forumId}/replys/${replyId}.json`);
}

/*
//Get point of user
export function getPoints(userMail) {
    const points = [];
    const response = axios.get(backendUrl + `/product/reviews/${userMail}.json`);
    for (const key in response.data) {
        const dataObj = {
            id: key,
        };
        points.push(dataObj);
    }
    return points.length;
}
    */