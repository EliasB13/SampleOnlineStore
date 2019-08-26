import React, { Component } from 'react';
import { productsActions } from '../../actions'
import { connect } from 'react-redux'
import { ProductList } from './ProductsList'
import { Spinner } from 'reactstrap'

class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);

        this.props.getAll();
    }

    render() {
        const { productsPage } = this.props.productsPage;
        const { isLoadingProducts } = this.props;
        debugger
        return (
            <div className="home mt-5">
                <div className="row">
                    <div className="col-12">
                        <h2 className="mb-3">Products</h2>
                    </div>
                </div>
                { 
                    isLoadingProducts ? 
                        <div className="row justify-content-center">
                            <Spinner color="dark" />
                        </div> : 
                        <ProductList products={productsPage ? productsPage.productsPageItems : []} /> 
                }
            </div>
        );
    }
}


function mapState(state) {
    return {
        productsPage: state.loadingProducts,
        isLoadingProducts: state.loadingProducts.isLoadingProducts
    }
}

const actionCreators = {
    getAll: productsActions.getAll,
};

const connectedHome = connect(mapState, actionCreators)(Home);
export { connectedHome as Home };