import { authHeader } from '../helpers';

export const cartService = {
    getCartContent,
    addToCart,
    removeItem,
    updateQuantity
};

function getCartContent() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${process.env.REACT_APP_DEFAULT_API_URL}/cart`, requestOptions)
        .then(handleResponse)
}

function addToCart(productId, quantity) {
    let addToCartBody = quantity ? { productId, quantity } : { productId };
    const requestOptions = { 
        method: 'POST',
        headers: { ...authHeader(), 'Content-type': 'application/json' },
        body: JSON.stringify(addToCartBody)
    };

    return fetch(`${process.env.REACT_APP_DEFAULT_API_URL}/cart/add`, requestOptions)
        .then(handleResponse);
}

function removeItem(orderLineId) {
    const requestOptions = { 
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${process.env.REACT_APP_DEFAULT_API_URL}/cart/${orderLineId}`, requestOptions)
        .then(handleResponse);
}

function updateQuantity(orderLineId, quantity) {
    const requestOptions = { 
        method: 'PUT',
        headers: authHeader()
    };

    return fetch(`${process.env.REACT_APP_DEFAULT_API_URL}/cart/${orderLineId}/${quantity}`, requestOptions)
        .then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}