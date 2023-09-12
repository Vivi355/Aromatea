import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetAllReviews } from '../../store/reviews';
import './ReviewShow.css'
import StarRating from './StarRating';

export const ReviewShow = () => {
    const dispatch = useDispatch()
    const {productId} = useParams();

    const reviews = Object.values(useSelector(state => state.reviews.productReviews))
    const currentUser = useSelector(state => state.session.user);
    const product = useSelector(state => state.products?.singleProduct)

    useEffect(() => {
        dispatch(thunkGetAllReviews(productId))
    }, [dispatch, productId])

    // buttons to post review
    const reviewBtn = () => {
        if (!currentUser) return false;

        // check if current user has written review
        const checkReview = reviews.some(review => review.userId === currentUser.id)
        if (checkReview) return false;

        return product && product.userId && currentUser.id !== product.userId
    }

    // avg rating
    const avgRating = reviews.length ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(2) : 0

    // render stars
    // const renderStars = (rating) => {
    //     let stars = [];
    //     const fullStars = Math.floor(rating);
    //     const halfStar = rating % 1 >= 0.5;
    //     const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    //     for (let i = 0; i < fullStars; i++) {
    //         stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    //     }

    //     if (halfStar) {
    //         stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    //     }

    //     for (let j = 0; j < emptyStars; j++) {
    //         stars.push(<i key={`empty-${j}`} className="far fa-star"></i>);
    //     }

    //     return stars;
    // };

    // format date
    function formatDate(dateStr) {
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        const date = new Date(dateStr)
        return `${months[date.getMonth()]} ${date.getFullYear()}`
    }

    return (
        <div>
            <h1>Customer Reviews</h1>
            <div className='stars-and-btn'>
                <div className='stats-reviews'>
                    <div>
                        <StarRating rating={avgRating} />
                    </div>
                    <div>
                        {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                    </div>
                </div>
                <div className='post-review-btn'>
                    {reviewBtn() && <button>WRITE A REVIEW</button>}
                </div>
            </div>

            <div>
                {reviews.length === 0 && currentUser && product && product.userId && currentUser.id !== product.userId ? <p>Be the first to post a review!</p>
                :
                reviews.map(review => (
                    <div key={review.id} className='review-item'>
                        <div className='author'>
                            {review.Author &&
                                <span className='author'>
                                    {review.Author.firstName} {review.Author.lastName[0]}
                                </span>
                            }
                            <span>
                                {formatDate(review.createdAt)}
                            </span>
                        </div>
                        <div className='stars'>
                            {/* {renderStars(review.rating)} */}
                            <StarRating rating={review.rating}/>
                            <p>{review.comment}</p>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    )
}
