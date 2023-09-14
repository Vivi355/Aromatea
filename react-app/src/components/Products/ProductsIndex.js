import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { thunkGetAllProducts } from "../../store/products";
import { ProductItem } from "./ProductItems";
import { NavLink } from "react-router-dom";
import "./ProductsIndex.css"


export const ProductsIndex = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.allProducts);


    useEffect(() => {
        dispatch(thunkGetAllProducts());
    }, [dispatch])

    if (!products || Object.keys(products).length === 0) return null;

    return (
        <div id="products-page">
            <img src="https://capstone-aromatea.s3.us-west-1.amazonaws.com/content-pixie-m-gqDRzbJLQ-unsplash.jpg" alt="tea"></img>
            <div className="header-section">
                <NavLink to={'/'}>HOME</NavLink><i class="fas fa-slash fa-rotate-270 fa-xs"></i>All Tea
            </div>
            <ul className="main-page">
                {Object.values(products).map(product => (
                    <ProductItem
                        product={product}
                        key={product.id}
                    />
                ))}
            </ul>
        </div>
    )
}
