import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { thunkGetAllProducts } from "../../store/products";
import { ProductItem } from "./ProductItems";
import { NavLink } from "react-router-dom";
import "./ProductsIndex.css"


export const ProductsIndex = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.allProducts);

    const [sort, setSort] = useState(null);
    const [isAcs, setIsAsc] = useState(true);

    let defaultProducts = Object.values(products);
    if (sort) {
        defaultProducts = [...defaultProducts].sort((a, b) => {
            if (sort === 'lowToHigh') return a.price - b.price;
            if (sort === 'highToLow') return b.price - a.price;
            return 0;
        })
    }

    const toggleSort = () => {
        setIsAsc(!isAcs);
        setSort(isAcs ? 'highToLow' : 'lowToHigh')
    }

    useEffect(() => {
        dispatch(thunkGetAllProducts());
    }, [dispatch])

    if (!products || Object.keys(products).length === 0) return null;

    return (
        <div id="products-page">
            <img src="https://capstone-aromatea.s3.us-west-1.amazonaws.com/content-pixie-m-gqDRzbJLQ-unsplash.jpg" alt="tea"></img>
            <div className="header-section">
                <div className="back-link">
                    <NavLink to={'/'}>HOME</NavLink><i className="fas fa-slash fa-rotate-270 fa-xs"></i>All Tea
                </div>
                <div className="sort-section">
                    Sort: Price
                    <button className="sort-price" onClick={toggleSort}><i className={isAcs ? "fas fa-sort-up" : "fas fa-sort-down"}></i></button>
                </div>
            </div>
            <ul className="main-page">
                {defaultProducts.map(product => (
                    <ProductItem
                        product={product}
                        key={product.id}
                    />
                ))}
            </ul>
        </div>
    )
}
