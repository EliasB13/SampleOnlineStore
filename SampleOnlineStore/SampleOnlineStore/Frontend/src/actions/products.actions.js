import { productsConstants } from '../constants';
import { productsService } from '../services';
import { alertActions } from './'

export const productsActions = {
    getAll
};

function getAll(page, size) {
    return dispatch => {
        dispatch(request(page, size));

        productsService.getAll(page, size)
            .then(
                productsPage => dispatch(success(productsPage)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    }

    function request(page, size) { return { type: productsConstants.GET_PRODUCTS_REQUEST } }
    function success(productsPage) { return { type: productsConstants.GET_PRODUCTS_SUCCESS, productsPage } }
    function failure(error) { return { type: productsConstants.GET_PRODUCTS_FAILURE, error } }
}