import React, { Component } from 'react'
import { Product } from './Product.js'

export class ProductList extends Component {

    render() { 
        return (
            <div className="row mt-3">
                { this.props.products.map(product =>
                    <Product key={product.id} product={product} />
                )}
            </div>
        );
    }
       
}