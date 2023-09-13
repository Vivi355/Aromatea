import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { thunkGetSingleProduct } from "../../store/products";
import { thunkAddProduct } from "../../store/carts";
import './ProductDetail.css'
import { ReviewShow } from "../Reviews/ReviewShow";
import StarRating from "../Reviews/StarRating";
import { thunkLoadProducts } from "../../store/carts";

export const ProductDetail = () => {
    const dispatch = useDispatch();
    const {productId} = useParams();
    const product = useSelector(state => state.products.singleProduct);
    const currentUser = useSelector(state => state.session.user);
    const reviews = Object.values(useSelector(state => state.reviews.productReviews));
    // ref for the review section
    const reviewSectionRef = React.useRef(null);

    useEffect(() => {
        dispatch(thunkGetSingleProduct(productId));
    }, [dispatch, productId])

    // handle click for product add to cart
    const handleAddToCart = async () => {
        await dispatch(thunkAddProduct(product.id, 1))
        dispatch(thunkLoadProducts())
    }

    // scroll to review section
    const scrollToReviewSection = () => {
        reviewSectionRef.current.scrollIntoView({behavior: 'smooth'})
    }

    const avgRating = reviews.length ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(2) : 0;


    if (!product || Object.keys(product).length === 0) return null;

    return (
        <>
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

                    <div id="single-right">
                        <div className="star-and-reviews" onClick={scrollToReviewSection}>
                            <div>
                                <StarRating rating={avgRating} />
                            </div>
                            <div>
                                ({reviews.length})
                            </div>
                        </div>
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
                            <hr></hr>
                        </div>
                        <div className="addcart-btn">
                            <button
                            onClick={handleAddToCart}
                            disabled={currentUser?.id === product.userId}
                            >ADD TO CART <span>&#183;</span> ${product.price} </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="review-section" ref={reviewSectionRef}>
                <ReviewShow />
            </div>
        </>
    )
}
