import React, {  Component } from 'react'
import './Product.css'

export class Product extends Component {
    

    render() {
        const { product } = this.props;
        return (
            <div key={product.id} className="col-sm-6 col-md-3">
                <div className="product" >
                    <img src={product.image} alt={product.name} />
                    <div className="image_overlay"/>
                    <div className="view_details">Add to cart</div>
                    <div className="stats">
                        <div className="stats-container">
                            <span className="product_price">{product.price}</span>
                            <span className="product_name">{product.name}</span>
                            <p>{product.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}