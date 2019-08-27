import React, { Component } from 'react';
import { productsActions } from '../../actions';
import { connect } from 'react-redux';
import { ProductList } from './ProductsList';
import { Spinner, Label } from 'reactstrap';
import Select from 'react-select';

class Catalog extends Component {
    static displayName = Catalog.name;

    constructor(props) {
        super(props);

        this.props.getAll(1, 10);

        this.state = {
            productsPage: {},
            isLoadingProducts: false,
            isLoadedProducts: false,
            selectedPlatformFilter: -1,
            selectedProductTypeFilter: -1,
        }
        
        this.handlePlatformChange = this.handlePlatformChange.bind(this);
        this.handleProductTypeChange = this.handleProductTypeChange.bind(this);
        this.refreshProductsList = this.refreshProductsList.bind(this);
    }

    handlePlatformChange(e) {
        this.setState({ selectedPlatformFilter: e.value }, () => this.refreshProductsList());
    }

    handleProductTypeChange(e) {
        this.setState({ selectedProductTypeFilter: e.value }, () => this.refreshProductsList());
    }

    refreshProductsList() {
            this.props.getAll(
                1, 
                10, 
                this.state.selectedPlatformFilter !== -1 ? this.state.selectedPlatformFilter : null, 
                this.state.selectedProductTypeFilter !== -1 ? this.state.selectedProductTypeFilter : null);
    }

    getPlatformsOptions(productsPage) {
        let platforms = productsPage.platforms.map(platform => {
            return {
                value: platform.id,
                label: platform.name
            };
        });
        platforms.push({ value: -1, label: 'All'});

        return platforms;
    }

    getProductTypesOptions(productsPage) {
        let types = productsPage.productTypes.map(productType => {
            return {
                value: productType.id,
                label: productType.name
            };
        });
        types.push({ value: -1, label: 'All'});

        return types
    }

    render() {
        const { productsPage } = this.props;
        const { isLoadingProducts } = this.props;
        const { isLoadedProducts } = this.props;
        const platformOptions = isLoadedProducts ? this.getPlatformsOptions(productsPage) : [];
        const productTypeOptions = isLoadedProducts ? this.getProductTypesOptions(productsPage) : [];

        return (
            <div className="home mt-5">
                <div className="row">
                    <div className="col-12">
                        <h2 className="mb-3">Products</h2>
                    </div>
                </div>
                <hr />

                <div className="row">
                    <div className="col-3">
                        <Label for="platforms">Platforms</Label>
                        <Select options={platformOptions} onChange={this.handlePlatformChange} defaultValue={ { value: -1, label: 'All' } } />
                    </div>
                    <div className="col-3">
                        <Label for="productTypes">Product types</Label>
                        <Select options={productTypeOptions} onChange={this.handleProductTypeChange} defaultValue={ { value: -1, label: 'All' } } />
                    </div>
                </div>

                <hr />
                { 
                    isLoadingProducts ? 
                        <div className="row justify-content-center">
                            <Spinner color="dark" />
                        </div> : 
                        <ProductList products={isLoadedProducts ? productsPage.productsPageItems : []} /> 
                }
            </div>
        );
    }
}


function mapState(state) {
    return {
        productsPage: state.loadingProducts.productsPage,
        isLoadingProducts: state.loadingProducts.isLoading,
        isLoadedProducts: state.loadingProducts.isLoaded
    }
}

const actionCreators = {
    getAll: productsActions.getAll,
};

const connectedHome = connect(mapState, actionCreators)(Catalog);
export { connectedHome as Catalog };