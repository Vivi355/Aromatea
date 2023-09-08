import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { thunkGetSingleProduct } from "../../store/products";
import './ProductDetail.css'

export const ProductDetail = () => {
    const dispatch = useDispatch();
    const {productId} = useParams();
    const product = useSelector(state => state.products.singleProduct);
    // console.log(product);
    // const [selectedSize, setSelectedSize] = useState(product.variants ? product.variants[0] : null);
    // console.log(selectedSize);

    useEffect(() => {
        dispatch(thunkGetSingleProduct(productId));
    }, [dispatch, productId])

    // const handleSizeClick = (variant) => {
    //     setSelectedSize(variant)
    // }

    if (!product || Object.keys(product).length === 0) return null;

    return (
        <div id="detail-page">
            <div className="back-to-products">
                <NavLink to={`/products/all`}>
                    <i className="fas fa-arrow-left" ></i>
                    BACK TO ALL TEAS
                </NavLink>
            </div>

            <div id="single-product-container">
                <div className="images">
                    <img src={product.primaryImg} alt={product.name} style={{paddingBottom: "10px"}}></img>
                    {product.secondaryImg ? <img src={product.secondaryImg} alt={product.name}></img> : null}
                </div>
                {/* <div className="second-image">
                </div> */}

                <div id="single-right">
                    <div className="name-price">
                        <div className="detail-name">{product.name}</div>
                        <div className="detail-price">${product.price}</div>
                    </div>
                    <div className="product-description">
                        {product.description}
                    </div>
                    <div className="product-size">
                        <hr></hr>
                        SIZE: {product.size}
                        {/* {product.variants && product.variants.map(variant => (
                        <span
                            key={variant.id}
                            onClick={() => handleSizeClick(variant)}
                            style={{cursor: "pointer"}}
                        >
                            {variant.size}
                        </span>
                    ))} */}
                        <hr></hr>
                    </div>
                    <div className="addcart-btn">
                        <button>ADD TO CART <span>&#183;</span> ${product.price} </button></div>
                </div>
            </div>
        </div>
    )
}
