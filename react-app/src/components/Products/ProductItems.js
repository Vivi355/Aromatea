import React from "react"
import { Link, useLocation } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { DeleteProduct } from "./DeleteProductModal";
import { useState } from "react";

export const ProductItem = ({product}) => {
    const location = useLocation();
    const {openModal} = useModal();

    // delete modal
    const deleteClick = (productId) => {
        openModal(<DeleteProduct productId={productId} />)
    }

    const [isHovered, setIsHovered] = useState(false);

    // handle image change based on mouse
    const handleMouseOver = () => {
        setIsHovered(true);
    }
    const handleMouseOut = () => {
        setIsHovered(false);
    }

    return (
        <div>
            <div title={product.name}>
                <div className="product-container">
                    <div className="first-img" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                        <Link to={`/products/${product.id}`}>
                            <img className={`primary-image ${isHovered ? 'image-fade-out' : ''}`} src={product.primaryImg} alt={product.name}></img>

                            <img className={`secondary-image ${isHovered ? 'image-fade-in' : ''}`} src={product.secondaryImg} alt={product.name}></img>
                        </Link>

                        {location.pathname === '/products/current' && (
                            <div className="product-btns">
                                <Link to={`/products/${product.id}/edit`}><i className="far fa-edit"></i></Link>
                                <button
                                    onClick={() => deleteClick(product.id)}
                                    className="p-delete"
                                ><i className="fas fa-trash-alt"></i></button>
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
                    <div className="product-type">
                        Organic {product.category} Tea
                    </div>
                </div>
            </div>
        </div>
    )
}
