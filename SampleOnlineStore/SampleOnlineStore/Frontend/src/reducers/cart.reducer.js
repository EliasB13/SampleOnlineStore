import { cartConstants } from '../constants';

export function cart(state = { isLoading: false, isLoaded: false }, action) {
    switch (action.type) {
        case cartConstants.ADD_TO_CART_REQUEST:
            return {
                productId: action.productId,
                quantity: action.quantity
            };
        case cartConstants.ADD_TO_CART_SUCCESS:
            return {};
        case cartConstants.ADD_TO_CART_FAILURE:
            return { error: action.error };

        case cartConstants.GET_CART_CONTENT_REQUEST:
            return {
                isLoading: true,
                isLoaded: false
            };
        case cartConstants.GET_CART_CONTENT_SUCCESS:
            return {
                isLoading: false,
                isLoaded: true,
                cart: action.cart
            };
        case cartConstants.GET_CART_CONTENT_FAILURE:
            return {
                isLoading: false,
                isLoaded: false,
                error: action.error
            };

        case cartConstants.REMOVE_ITEM_REQUEST:
            return {
                orderLineId: action.orderLineId,
                isLoading: true,
                isLoaded: false
            };
        case cartConstants.REMOVE_ITEM_SUCCESS:
            return {
                isLoaded: true,
                isLoading: true
            };
        case cartConstants.REMOVE_ITEM_FAILURE:
            return {
                error: action.error,
                isLoaded: false,
                isLoading: true
            };

        case cartConstants.UPDATE_QUANTITY_REQUEST:
            return {
                orderLineId: action.orderLineId,
                quantity: action.quantity,
                isLoading: true,
                isLoaded: false
            };
        case cartConstants.UPDATE_QUANTITY_SUCCESS:
            return {
                isLoading: true,
                isLoaded: true
            };
        case cartConstants.UPDATE_QUANTITY_FAILURE:
            return {
                error: action.error,
                isLoading: false,
                isLoaded: false
            };

        case cartConstants.ORDER_CHECKOUT_REQUEST:
            return {
                isLoading: true,
                isLoaded: false
            }
        case cartConstants.ORDER_CHECKOUT_SUCCESS:
            return {
                isLoading: true,
                isLoaded: true
            }
        case cartConstants.ORDER_CHECKOUT_FAILURE:
            return {
                isLoading: false,
                isLoaded: false
            }

        default:
            return state;
    }
}