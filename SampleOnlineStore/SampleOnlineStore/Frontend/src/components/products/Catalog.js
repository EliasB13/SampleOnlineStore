import React, { Component } from 'react';
import { productsActions } from '../../actions';
import { connect } from 'react-redux';
import { ProductList } from './ProductsList';
import { Spinner, Label } from 'reactstrap';
import Select from 'react-select';
import { Pagination } from '../../helpers/pagination'
import './Product.css'

class Catalog extends Component {
    static displayName = Catalog.name;

    constructor(props) {
        super(props);

        this.state = {
            productsPage: {},
            selectedPlatformFilter: -1,
            selectedProductTypeFilter: -1,
            selectedPage: 1,
            pageSize: 5
        }

        this.props.getAll(this.state.selectedPage, this.state.pageSize);
        
        this.handlePlatformChange = this.handlePlatformChange.bind(this);
        this.handleProductTypeChange = this.handleProductTypeChange.bind(this);
        this.refreshProductsList = this.refreshProductsList.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    }

    handlePlatformChange(e) {
        this.setState({ selectedPlatformFilter: e.value }, () => this.refreshProductsList(this.state.selectedPage, this.state.pageSize));
    }

    handleProductTypeChange(e) {
        this.setState({ selectedProductTypeFilter: e.value }, () => this.refreshProductsList(this.state.selectedPage, this.state.pageSize));
    }

    handlePageSizeChange(e) {
        this.setState({ pageSize: e.value, selectedPage: 1 }, () => this.refreshProductsList(this.state.selectedPage, this.state.pageSize));
    }

    handlePageClick(data) {
        this.setState({ selectedPage: data }, () => {
            this.refreshProductsList(this.state.selectedPage, this.state.pageSize);
        });
    }

    refreshProductsList(page, size) {
            this.props.getAll(
                page, 
                size, 
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

    getPageSizeOptions() {
        return [ 
            { value: 2, label: '2' }, 
            { value: 5, label: '5' }, 
            { value: 10, label: '10' } 
        ];
    }

    render() {
        const { productsPage, isLoadingProducts, isLoadedProducts } = this.props;
        const platformOptions = isLoadedProducts ? this.getPlatformsOptions(productsPage) : [];
        const productTypeOptions = isLoadedProducts ? this.getProductTypesOptions(productsPage) : [];

        return (
            <div className="home">
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
                            isLoadedProducts && productsPage.productsPageItems.length > 0 ?
                                <React.Fragment>
                                    <ProductList products={productsPage.productsPageItems} />
                                    <div className="clearfix">
                                        <div className="float-left" style={{ width: '10%' }}>
                                            <Select 
                                                options={this.getPageSizeOptions()} 
                                                onChange={this.handlePageSizeChange} 
                                                defaultValue={ { value: this.state.pageSize, label: this.state.pageSize } }/>
                                        </div>
                                        <div className="float-left" style={{ marginTop: '0.5em', marginLeft: '1em' }}>
                                            <strong>Total items: {productsPage.paginationInfo.totalItems}</strong>
                                        </div>
                                        <div className="float-right">
                                            <Pagination
                                                pageCount={productsPage.paginationInfo.totalPages} 
                                                selectedPage={this.state.selectedPage}
                                                onClick={this.handlePageClick} />
                                        </div>
                                    </div>
                                </React.Fragment> : <h4>No results match your query</h4>
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