import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkGetAllReviews, thunkUpdateReview } from "../../store/reviews";

export const EditReview = ({review, productId}) => {
    const dispatch = useDispatch();
    // const history = useHistory();
    const {closeModal} = useModal();
    const [errors, setErrors] = useState({})

    const [comment, setComment] = useState(review.comment);

    const starArray = [1, 2, 3, 4, 5];
    const [selectedStars, setSelectedStars] = useState(review.rating);
    const [hoverStars, setHoverStars] = useState(review.rating);

    useEffect(() => {
        const errors = {};
        if (comment.length < 5 || comment.length > 200) errors.comment = "Comment must be 5 characters or more"
        if (selectedStars < 1) errors.selectedStars = 'Stars must be between 1 and 5'

        setErrors(errors)
    }, [comment, selectedStars])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const editedReview = {
            comment,
            rating: selectedStars,
        }

        const result = await dispatch(thunkUpdateReview(review.id, editedReview));

        if (!result.errors) {
            dispatch(thunkGetAllReviews(productId))
            closeModal();
        } else {
            setErrors(result)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <h2>Edit your review: </h2>
            <div className="review-box">
                {errors.comment && <p className="error">{errors.comment}</p>}
                <textarea
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="Update your review here..."
                />
            </div>

            <div className="stars">
                {errors.selectedStars && <p className="error">{errors.selectedStars}</p>}
                {starArray.map((_, i) => (
                <i
                    key={i}
                    className={i < (hoverStars || selectedStars) ? 'fas fa-star filled' : 'far fa-star'}
                    onMouseEnter={() => setHoverStars(i + 1)}
                    onMouseLeave={() => setHoverStars(0)}
                    onClick={() => setSelectedStars(i + 1)}
                />
                ))} Stars
            </div>

            <div className="submit-review-button">
                <button type="submit" disabled={comment.length < 5 || selectedStars === 0}>
                    Update Your Review
                </button>
            </div>
        </form>
        </div>
    )
}
