export const productsService = {
    getAll
};

function getAll(page, size) {
    return fetch(`${process.env.REACT_APP_DEFAULT_API_URL}/products`)
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