import React, { Component } from 'react'
import { Product } from './Product.js'
import { cartActions } from '../../actions/index.js';
import { connect } from 'react-redux' 

class ProductPage extends Component {

    constructor(props) {
        super(props);

        
        const { handle } = this.props.match.params;


    }

    handleAddToCartClick() {
        this.props.addToCart()
    }

    render() { 
        return (
            <div></div>
        );
    }  
}

function mapState(state) {
    return {}
}

const actionCreators = {
    addToCart: cartActions.addToCart,
};

const connectedProductPage = connect(mapState, actionCreators)(ProductPage);
export { connectedProductPage as ProductPage };