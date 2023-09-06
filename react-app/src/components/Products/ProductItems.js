import React from "react"
import { Link } from "react-router-dom";

export const ProductItem = ({product}) => {

    return (
        <div>
            <div title={product.name}>
                <div className="product-container">
                    <div className="first-img">
                        <Link to={`/products/${product.id}`}>
                            <img src={product.primaryImg} alt={product.name}></img>
                        </Link>
                    </div>

                    <div className="product-detail">
                        {/* <div className="product-description">
                            {product.description}
                        </div> */}
                        <div className="product-name">
                            {product.name}
                        </div>
                        <div className="product-price">
                            from ${product.variants[1].price}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
