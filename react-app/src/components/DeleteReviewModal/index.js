import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteReview } from "../../store/reviews";
import './DeleteReview.css'

export const DeleteReview = ({reviewId, setReviewChange}) => {
    const dispatch = useDispatch()
    const {closeModal} = useModal();

    const handleDelete = async (reviewId) => {
        await dispatch(thunkDeleteReview(reviewId))
        closeModal();
        // setReviewChange(prev => !prev)
    }

    return (
        <div className="review-delete-popup">
            <h3>Confirm Delete</h3>
            <div>Are your sure you want to delete this review?</div>

            <div className="two-btns">
                <button
                    className="delete-review"
                    onClick={() => handleDelete(reviewId)}
                >
                    Delete
                </button>

                <button
                    className="keep-review"
                    onClick={closeModal}
                >
                    Keep
                </button>
            </div>
        </div>
    )
}
