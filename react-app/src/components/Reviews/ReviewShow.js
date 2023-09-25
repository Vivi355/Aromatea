import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetAllReviews } from '../../store/reviews';
import './ReviewShow.css'
import StarRating from './StarRating';
import { CreateReview } from './CreateReview';
import { useModal } from '../../context/Modal';
import { DeleteReview } from '../DeleteReviewModal';
import { EditReview } from './EditReview';

export const ReviewShow = () => {
    const dispatch = useDispatch()
    const {productId} = useParams();

    const reviews = Object.values(useSelector(state => state.reviews.productReviews))
    const currentUser = useSelector(state => state.session.user);
    const product = useSelector(state => state.products?.singleProduct)
    const {openModal} = useModal();

    // const [reviewCreated, setReviewCreated] = useState(false);

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

    // format date
    function formatDate(dateStr) {
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        const date = new Date(dateStr)
        return `${months[date.getMonth()]} ${date.getFullYear()}`
    }

    // create review modal
    const handleClick = () => {
        openModal(<CreateReview productId={productId} />)
    }

    // edit review
    const handleEdit = (review) => {
        openModal(<EditReview review={review} productId={productId} />)
    }

    // handle delete review
    const handleDelete = (reviewId) => {
        openModal(<DeleteReview reviewId={reviewId} />)
    }

    return (
        <div id='review-container'>
            <div className='review-title'>Customer Reviews</div>
            <div className='stars-and-btn'>
                <div className='bottom-border'></div>
                <div className='stats-reviews'>
                    <div className='rnumber'>
                        {avgRating}
                    </div>
                    <div className='rstars'>
                        <StarRating rating={avgRating} />
                    </div>
                    <div className='rcount'>
                        {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                    </div>
                </div>
                <div className='post-review-btn'>
                    {reviewBtn() && <button onClick={handleClick}>WRITE A REVIEW</button>}
                </div>
            </div>

            <div className='review-content'>
                {reviews.length === 0 && currentUser && product && product.userId && currentUser.id !== product.userId ? <p>Be the first to post a review!</p>
                :
                reviews.toReversed().map(review => (
                    <div key={review.id} className='review-item'>
                         <div className='bottom-border'></div>
                        <div className='rleft'>
                            <div className='circle-icon'>
                                <i className="fas fa-circle fa-lg"></i>
                            </div>
                            <div className='author-date'>
                                {review.Author &&
                                    <div className='author'>
                                        {review.Author.firstName} {review.Author.lastName[0]}
                                    </div>
                                }
                                <div className='rdate'>
                                    {formatDate(review.createdAt)}
                                </div>
                            </div>
                        </div>
                        <div className='rright'>
                            <div className='stars'>
                                <StarRating rating={review.rating}/>
                                <div className='rcomment'>{review.comment}</div>
                            </div>
                            <div className='delete-review'>
                                {currentUser && currentUser.id === review.userId && (
                                    <>
                                        <button className='ubtn' onClick={() => handleEdit(review)}><i className="far fa-edit"></i></button>
                                        <button className='dbtn' onClick={() => handleDelete(review.id)}><i className="fas fa-trash-alt"></i></button>
                                    </>
                                )}

                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    )
}
