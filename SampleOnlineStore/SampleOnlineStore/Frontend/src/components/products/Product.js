import React, {  Component } from 'react'
import './Product.css'

export class Product extends Component {
    
    render() {
        const { product } = this.props;
        return (
            <div key={product.id} className="col-sm-6 col-md-3">
                <div className="product" >
                    <img src={process.env.REACT_APP_DEFAULT_API_URL + '/' + product.imageUrl} alt={product.name} />
                    <div className="image_overlay"/>
                    <div className="add_to_cart">Add to cart</div>
                    <div className="see_more">See more</div>
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