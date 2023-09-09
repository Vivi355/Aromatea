import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { thunkGetAllProducts } from "../../store/products";
import { ProductItem } from "./ProductItems";
import "./ProductsIndex.css"


export const ProductsIndex = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.allProducts);
    // console.log(products);

    useEffect(() => {
        dispatch(thunkGetAllProducts());
    }, [dispatch])

    if (!products || Object.keys(products).length === 0) return null;

    return (
        <div id="products-page">
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
