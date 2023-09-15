import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkCreateReview } from "../../store/reviews";
import './CreateReview.css'
import { thunkGetAllReviews } from "../../store/reviews";


export const CreateReview = ({productId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {closeModal} = useModal();
    const [errors, setErrors] = useState({})
    const [comment, setComment] = useState('');

    // init stars array
    const starArray = [1, 2, 3, 4, 5];
    const [selectedStars, setSelectedStars] = useState(0);
    const [hoverStars, setHoverStars] = useState(0);

    useEffect(() => {
        const errors = {};
        if (comment.length < 5 || comment.length > 200) errors.comment = "Comment must be 5 characters or more"
        if (selectedStars < 1) errors.selectedStars = 'Stars must be between 1 and 5'

        setErrors(errors)
    }, [comment, selectedStars])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newReview = {
            comment,
            rating: selectedStars,
        }

        const createdReview = await dispatch(thunkCreateReview(newReview, productId));
        if (!createdReview.errors) {

            dispatch(thunkGetAllReviews(productId))
            setComment('');
            setSelectedStars(0);
            closeModal();
            history.push(`/products/${productId}`)
        } else {
            setErrors(createdReview);
        }
    }


    return (
        <div id="review-popup">
        <form onSubmit={handleSubmit} className="rform">
            <div className="reviewt">Enter your review: </div>
            <div className="review-box">
                {/* {errors.comment && <p className="error">{errors.comment}</p>} */}
                <textarea
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="Leave your review here..."
                    required
                />
            </div>

            <div className="stars">
                {/* {errors.selectedStars && <p className="error">{errors.selectedStars}</p>} */}
                {starArray.map((star, i) => (
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
                    Submit Your Review
                </button>
            </div>
        </form>
      </div>
    )
}
