import { productsConstants } from '../constants';
import { productsService } from '../services';
import { alertActions } from './'

export const productsActions = {
    getAll
};

function getAll(page, size, platformId, productTypeId) {
    return dispatch => {
        dispatch(request(page, size, platformId, productTypeId));

        productsService.getAll(page, size, platformId, productTypeId)
            .then(
                productsPage => dispatch(success(productsPage)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    }

    function request(page, size, platformId, productTypeId) { return { type: productsConstants.GET_PRODUCTS_REQUEST, page, size, platformId, productTypeId } }
    function success(productsPage) { return { type: productsConstants.GET_PRODUCTS_SUCCESS, productsPage } }
    function failure(error) { return { type: productsConstants.GET_PRODUCTS_FAILURE, error } }
}