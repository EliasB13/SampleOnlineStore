import { productsConstants } from '../constants';

export function loadingProducts(state = { isLoaded: false }, action) {
    switch (action.type) {
        case productsConstants.GET_PRODUCTS_REQUEST:
            return { 
                isLoading: true,
                isLoaded: false,
                parameters: {
                    page: action.page,
                    size: action.size,
                    platformId: action.platformId,
                    productTypeId: action.productTypeId
                }
            };
        case productsConstants.GET_PRODUCTS_SUCCESS:
            return { 
                isLoading: false,
                isLoaded: true,
                productsPage: action.productsPage
            };
        case productsConstants.GET_PRODUCTS_FAILURE:
            return { 
                isLoading: false, 
                isLoaded: false,
                error: action.error
            };
        default:
            return state;
    }
}