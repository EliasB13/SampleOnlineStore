import React, { Component } from 'react';
import { connect } from 'react-redux';
import { cartActions } from '../../actions';
import { Spinner } from 'reactstrap';
import { CartItemList } from './CartItemList';
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'

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

    renderCartContent(cart) {
        return (
            <React.Fragment>
                <CartItemList cartItems={cart.orderItems} />
                <div className="row my-2">
                    <div className="col-md-4 d-flex align-items-center pl-0">
                        <div className="pr-5 btn-block">
                            <Link to="/" className="btn btn-primary">Continue Shopping</Link>
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4 pr-0">
                        <div className="p-4 clearfix rounded" style={{ backgroundColor: '#e3f2fd' }}>
                            <span className="float-left mb-2">Total:</span>
                            <span className="float-right mb-2">${ cart.total }</span>
                            <Button className="btn btn-block btn-warning" style={{ display: 'inline-block' }}>Checkout</Button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
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
                            this.renderCartContent(cart) :
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