const ALL_REVIEWS = "review/ALL_REVIEWS"
const CREATE_REVIEW = "review/CREATE_REVIEW"
const UPDATE_REVIEW = "review/EDIT_REVIEW"
const DELETE_REVIEW = "review/DELETE_REVIEW"

const getAllReviews = (reviews) => ({
    type: ALL_REVIEWS,
    reviews
})

const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
})

const updateReview = (updatedReview) => ({
    type: UPDATE_REVIEW,
    review: updatedReview
})

const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})

/**************** thunks **********************/
export const thunkGetAllReviews = (productId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${productId}`);

    if (res.ok) {
        const reviews = await res.json();
        dispatch(getAllReviews(reviews.reviews));
        return reviews;
    } else {
        const errors = await res.json();
        throw errors;
    }
}


export const thunkCreateReview = (review, productId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${productId}/new`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(review)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(createReview(data))
        return data;
    } else {
        const errors = await res.json()
        throw errors
    }
}

export const thunkUpdateReview = (reviewId, updatedReview) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatedReview)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(updateReview(data))
        return data;
    } else {
        const error = await res.json()
        throw error
    }
}


export const thunkDeleteReview = (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}/delete`, {
        method: "DELETE"
    })

    if (res.ok) {
        dispatch(deleteReview(reviewId))
    } else {
        const error = await res.json()
        throw error
    }
}

/**************** reducer *********************/
const initialState = {productReviews: {}}

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case ALL_REVIEWS: {
            newState = {...state, productReviews: {}}
            action.reviews.forEach(review => {
                newState.productReviews[review.id] = review
            })
            return newState;
        }

        case CREATE_REVIEW: {
            newState = {...state, productReviews: {...state.productReviews}};
            newState.productReviews[action.review.id] = action.review;
            return newState;
        }

        case UPDATE_REVIEW:
            return {
                ...state,
                productReviews: {...state.productReviews, [action.review.id]: {...action.review}}
            }

        case DELETE_REVIEW: {
            newState = {...state, productReviews: {...state.productReviews}};
            delete newState.productReviews[action.reviewId];
            return newState;
        }

        default:
            return state;
    }
}

export default reviewReducer
