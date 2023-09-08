import React from "react"
import { Link, useLocation } from "react-router-dom";

export const ProductItem = ({product}) => {
    const location = useLocation();

    return (
        <div>
            <div title={product.name}>
                <div className="product-container">
                    <div className="first-img">
                        <Link to={`/products/${product.id}`}>
                            <img src={product.primaryImg} alt={product.name}></img>
                        </Link>
                        {location.pathname === '/products/current' && (
                            <div className="product-btns">
                                <button>Edit</button>
                                <button>Delete</button>
                            </div>
                        )}
                    </div>

                    <div className="product-detail">
                        <div className="product-name">
                            {product.name}
                        </div>
                        <div className="product-price">
                            ${product.price}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
