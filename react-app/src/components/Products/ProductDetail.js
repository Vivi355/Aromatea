import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { thunkGetSingleProduct } from "../../store/products";
import { thunkAddProduct } from "../../store/carts";
import './ProductDetail.css'
import { ReviewShow } from "../Reviews/ReviewShow";
import StarRating from "../Reviews/StarRating";
import { thunkLoadProducts } from "../../store/carts";

// modal use
import { useModal } from "../../context/Modal";
import CartModal from "../CartModal";

export const ProductDetail = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {productId} = useParams();
    const product = useSelector(state => state.products.singleProduct);
    const currentUser = useSelector(state => state.session.user);
    const reviews = Object.values(useSelector(state => state.reviews.productReviews));
    // ref for the review section, scroll to that section when click
    const reviewSectionRef = React.useRef(null);

    // modal
    const {openModal} = useModal();

    useEffect(() => {
        dispatch(thunkGetSingleProduct(productId));
    }, [dispatch, productId])

    // handle product add to cart functionality
    const handleAddToCart = async () => {
        if (!currentUser) {
            history.push('/login')
        } else {
            await dispatch(thunkAddProduct(product.id, 1))
            dispatch(thunkLoadProducts());
            openModal(<CartModal />)
        }
    }

    // scroll to review section
    const scrollToReviewSection = () => {
        reviewSectionRef.current.scrollIntoView({behavior: 'smooth'})
    }

    // calculate the average rating for review section
    const avgRating = reviews.length ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(2) : 0;


    if (!product || Object.keys(product).length === 0) return null;

    return (
        <>
            <div id="detail-page">
                <div className="single-product-container">
                    <div className="images">
                        <div className="nav-back">
                            <NavLink to={'/products/all'}>All Tea</NavLink><i className="fas fa-slash fa-rotate-270 fa-xs"></i> {product.name}
                        </div>
                        <img src={product.primaryImg} alt={product.name} style={{paddingBottom: "10px"}}></img>
                        {product.secondaryImg ? <img src={product.secondaryImg} alt={product.name}></img> : null}
                    </div>

                    <div id="single-right">
                        <div className="star-and-reviews" onClick={scrollToReviewSection}>
                            <div className="stars-up">
                                <StarRating rating={avgRating} />
                            </div>
                            <div className="count-up">
                                ({reviews.length})
                            </div>
                        </div>
                        <div className="name-price">
                            <div className="detail-name">{product.name}</div>
                            <div className="detail-price">${product.price}</div>
                        </div>
                        <div className="detail-type">
                            Organic {product.category} Tea
                        </div>
                        <div className="product-description">
                            {product.description}
                        </div>
                        <div className="product-size">
                            SIZE: {product.size}
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
