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
            <h1>Confirm Delete</h1>
            <p>Are your sure you want to delete this review?</p>

            <button
                className="delete-review"
                onClick={() => handleDelete(reviewId)}
            >
                Yes (Delete Review)
            </button>

            <button
                className="keep-review"
                onClick={closeModal}
            >
                No (Keep Review)
            </button>
        </div>
    )
}
