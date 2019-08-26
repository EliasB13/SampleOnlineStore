import { productsConstants } from '../constants';

export function loadingProducts(state = {}, action) {
    switch (action.type) {
        case productsConstants.GET_PRODUCTS_REQUEST:
            return { 
                isLoadingProducts: true,
            };
        case productsConstants.GET_PRODUCTS_SUCCESS:
            return { 
                isLoadingProducts: false,
                productsPage: action.productsPage
            };
        case productsConstants.GET_PRODUCTS_FAILURE:
            return { 
                isLoadingProducts: false 
            };
        default:
            return state;
    }
}