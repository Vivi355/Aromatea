import React from "react"
import { Link, useLocation } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { DeleteProduct } from "./DeleteProductModal";

export const ProductItem = ({product}) => {
    const location = useLocation();
    const {openModal} = useModal();

    // delete modal
    const deleteClick = (productId) => {
        openModal(<DeleteProduct productId={productId} />)
    }


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
                                <Link to={`/products/${product.id}/edit`}>Edit</Link>
                                <button
                                    onClick={() => deleteClick(product.id)}
                                >Delete</button>
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
