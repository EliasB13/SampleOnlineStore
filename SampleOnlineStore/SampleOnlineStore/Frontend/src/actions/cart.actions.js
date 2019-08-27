import { cartConstants } from '../constants';
import { cartService } from '../services';
import { alertActions } from './'

export const cartActions = {
    getCartContent,
    addToCart,
    removeItem,
    updateQuantity,
    orderCheckout
}

function getCartContent() {
    return dispatch => {
        dispatch(request());

        cartService.getCartContent()
            .then(
                cart => dispatch(success(cart)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    }

    function request() { return { type: cartConstants.GET_CART_CONTENT_REQUEST } }
    function success(cart) { return { type: cartConstants.GET_CART_CONTENT_SUCCESS, cart } }
    function failure(error) { return { type: cartConstants.GET_CART_CONTENT_FAILURE } }
}

function addToCart(productId, quantity) {
    return dispatch => {
        dispatch(request(productId, quantity));

        cartService.addToCart(productId, quantity)
            .then(
                () => dispatch(success()),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    }

    function request(productId, quantity) { return { type: cartConstants.ADD_TO_CART_REQUEST, productId, quantity } }
    function success() { return { type: cartConstants.ADD_TO_CART_SUCCESS } }
    function failure(error) { return { type: cartConstants.ADD_TO_CART_FAILURE, error } }
}

function removeItem(orderLineId) {
    return dispatch => {
        dispatch(request(orderLineId));

        cartService.removeItem(orderLineId)
            .then(
                () => {
                    dispatch(success());
                    dispatch(cartActions.getCartContent());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    }

    function request(orderLineId) { return { type: cartConstants.REMOVE_ITEM_REQUEST, orderLineId } }
    function success() { return { type: cartConstants.REMOVE_ITEM_SUCCESS } }
    function failure(error) { return { type: cartConstants.REMOVE_ITEM_FAILURE, error } }
}

function updateQuantity(orderLineId, quantity) {
    return dispatch => {
        dispatch(request(orderLineId, quantity));

        cartService.updateQuantity(orderLineId, quantity)
            .then(
                () => {
                    dispatch(success());
                    dispatch(cartActions.getCartContent());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    }

    function request(orderLineId, quantity) { return { type: cartConstants.UPDATE_QUANTITY_REQUEST, orderLineId, quantity } }
    function success() { return { type: cartConstants.UPDATE_QUANTITY_SUCCESS } }
    function failure(error) { return { type: cartConstants.UPDATE_QUANTITY_FAILURE, error } }
}

function orderCheckout() {
    return dispatch => {
        dispatch(request());

        cartService.orderCheckout()
            .then(
                () => {
                    dispatch(success());
                    dispatch(cartActions.getCartContent());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    }

    function request() { return { type: cartConstants.ORDER_CHECKOUT_REQUEST } }
    function success() { return { type: cartConstants.ORDER_CHECKOUT_SUCCESS } }
    function failure(error) { return { type: cartConstants.ORDER_CHECKOUT_FAILURE, error } }
}