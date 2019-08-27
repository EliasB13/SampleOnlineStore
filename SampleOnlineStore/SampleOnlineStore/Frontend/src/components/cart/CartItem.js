import React, { Component } from 'react';
import './Cart.css';
import { Button } from 'reactstrap';
import { cartActions } from '../../actions';
import { connect } from 'react-redux';

class CartItem extends Component {

    constructor(props) {
        super(props);


        this.state = {
            quantity: this.props.cartItem.quantity
        };

        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.incrementQuantity = this.incrementQuantity.bind(this);
        this.decrementQuantity = this.decrementQuantity.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    handleFocus(e) {
        e.target.select();
    }

    handleQuantityChange(e) {
        e.preventDefault();

        let value = parseInt(e.target.value);
        if (value && value < 100 && value > 0) {
            this.setState((state, props) => ({
                quantity: value
            }));
        }
    }

    incrementQuantity() {
        this.setState((state, props) => ({
            quantity: state.quantity === 100 ? state.quantity : ++state.quantity
        }));
    }

    decrementQuantity() {
        this.setState((state, props) => ({
            quantity: state.quantity === 1 ? state.quantity : --state.quantity
        }));
    }

    updateQuantity() {
        this.props.updateQuantity(this.props.cartItem.id, this.state.quantity);
    }

    removeItem() {
        this.props.removeItem(this.props.cartItem.id);
    }

    render() {
        const { cartItem } = this.props;

        return (
            <tbody>
                <tr>
                    <td className="border-0 align-middle text-center">
                        <svg className="ico" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={this.removeItem}>
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" />
                            <path fill="none" d="M0 0h24v24H0V0z" />
                        </svg>
                    </td>
                    <th scope="row" className="border-0">
                        <div className="p-2">
                            <img src={process.env.REACT_APP_DEFAULT_API_URL + '/' + cartItem.imageUrl} alt={cartItem.productName} width="70" className="img-fluid rounded shadow-sm" />
                            <div className="ml-3 d-inline-block align-middle">
                                <h5 className="mb-0">
                                    <p href="#" className="text-dark d-inline-block align-middle">{cartItem.productName}</p>
                                </h5>
                                <span className="text-muted font-weight-normal font-italic d-block">Category: { cartItem.productType }</span>
                            </div>
                        </div>
                    </th>
                    <td className="border-0 align-middle text-center"><strong>{ cartItem.productPrice }</strong></td>
                    <td className="border-0 align-middle text-center">
                        <div className="input-group" style={ { width: '125px', margin: 'auto' } }>
                            <div className="input-group-prepend" onClick={this.decrementQuantity}>
                                <span className="input-group-text btn">-</span>
                            </div>
                            <input type="text" className="form-control text-center" value={ this.state.quantity } onChange={this.handleQuantityChange} onFocus={this.handleFocus} />
                            <div className="input-group-append" onClick={this.incrementQuantity}>
                                <span className="input-group-text btn">+</span>
                            </div>
                        </div>
                        <Button color="primary" size="sm" style={ { width: '125px', marginTop: "6px" } } onClick={this.updateQuantity}>Update</Button>
                    </td>
                    <td className="border-0 align-middle text-center"><strong>{ Math.round((cartItem.quantity * cartItem.productPrice) * 100 ) / 100 }</strong></td>
                </tr>
            </tbody>
        );
    }
}

function mapState(state) {
    return {};
}

const actionCreators = {
    updateQuantity: cartActions.updateQuantity,
    removeItem: cartActions.removeItem
};

const connectedCartItem = connect(mapState, actionCreators)(CartItem);
export { connectedCartItem as CartItem };