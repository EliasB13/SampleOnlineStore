import React, { Component } from 'react'
import { CartItem } from './CartItem'

export class CartItemList extends Component {

    render() {
        return (
            <div className="row mt-3">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" className="border-0 bg-light">
                                    <span style={ { width: '24px', height: '24px' } }></span>
                                </th>
                                <th scope="col" className="border-0 bg-light">
                                    <div className="p-2 px-3 text-uppercase">Product</div>
                                </th>
                                <th scope="col" className="border-0 bg-light text-center">
                                    <div className="py-2 text-uppercase">Price</div>
                                </th>
                                <th scope="col" className="border-0 bg-light text-center">
                                    <div className="py-2 text-uppercase">Quantity</div>
                                </th>
                                <th scope="col" className="border-0 bg-light text-center">
                                    <div className="py-2 text-uppercase">Total</div>
                                </th>
                            </tr>
                        </thead>
                        {this.props.cartItems.map(item =>
                            <CartItem key={item.id} cartItem={item} />
                        )}
                    </table>
                </div>
            </div>
        );
    }
}