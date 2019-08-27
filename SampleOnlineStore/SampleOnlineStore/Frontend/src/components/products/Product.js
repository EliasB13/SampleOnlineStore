import React, {  Component } from 'react';
import './Product.css';
import { cartActions } from '../../actions';
import { connect } from 'react-redux';

class Product extends Component {
    
    constructor(props) {
        super(props);

        this.handleAddToCartClick = this.handleAddToCartClick.bind(this);
    }

    handleAddToCartClick() {
        this.props.addToCart(this.props.product.id, 1);
    }

    handleSeeMoreClick() {
        alert('Not implemented yet');
    }

    render() {
        const { product } = this.props;
        return (
            <div key={product.id} className="col-sm-6 col-md-3">
                <div className="product" >
                    <img src={process.env.REACT_APP_DEFAULT_API_URL + '/' + product.imageUrl} alt={product.name} />
                    <div className="image_overlay"/>
                    <div className="add_to_cart" onClick={this.handleAddToCartClick}>Add to cart</div>
                    <div className="see_more" onClick={this.handleSeeMoreClick}>See more</div>
                    <div className="stats">
                        <div className="stats-container">
                            <span className="product_price">{'$'+ product.price}</span>
                            <span className="product_name">{product.name}</span>
                            <p>{product.productType}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    return {};
}

const actionCreators = {
    addToCart: cartActions.addToCart
};

const connectedProduct = connect(mapState, actionCreators)(Product);
export { connectedProduct as Product };