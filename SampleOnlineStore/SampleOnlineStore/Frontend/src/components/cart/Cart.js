import React, { Component } from 'react';
import { connect } from 'react-redux';
import { cartActions } from '../../actions';
import { Spinner } from 'reactstrap';
import { CartItemList } from './CartItemList';

class Cart extends Component {

    constructor(props) {
        super(props);

        this.props.getCartContent();

        this.state = {
            cart: {},
            isCartContentLoading: false,
            isCartContentLoaded: false
        }
    }

    render() {
        const { isCartContentLoading, isCartContentLoaded, cart } = this.props;
        
        return (
            <div>
                {
                    isCartContentLoading ? 
                        <div className="row justify-content-center">
                            <Spinner color="dark" />
                        </div> : 
                    isCartContentLoaded && cart.orderItems.length > 0 ? 
                        <CartItemList cartItems={ isCartContentLoaded ? cart.orderItems : []} /> :
                        <h3>Your cart is empty</h3>
                        
                }
            </div>
        );
    }
}

function mapState(state) {
    return {
        cart: state.cart.cart,
        isCartContentLoading: state.cart.isLoading,
        isCartContentLoaded: state.cart.isLoaded
    }
}

const actionCreators = {
    getCartContent: cartActions.getCartContent,
    removeItem: cartActions.removeItem,
    updateQuantity: cartActions.updateQuantity
};

const connectedCart = connect(mapState, actionCreators)(Cart);
export { connectedCart as Cart };