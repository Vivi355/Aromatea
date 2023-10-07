const ALL_LIST = 'list/ALL_LIST'
const CREATE_LIST = 'list/CREATE_LIST'
const DELETE_LIST = 'list/DELETE_LIST'

const getAllList = (wishlists) => ({
    type: ALL_LIST,
    wishlists
})

const newList = (wishlists) => ({
    type: CREATE_LIST,
    wishlists
})

const deleteList = (wishlist) => ({
    type: DELETE_LIST,
    wishlist
})

export const thunkAllList = (userId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/wishlist/${userId}/allList`);
        if (res.ok){
            const lst = await res.json()
            dispatch(getAllList(lst))
        }
    } catch (error){
        console.error('Error fetching wishlist items:', error)
    }
}

export const thunkCreateList = (userId, productId) => async(dispatch) => {
    // let wishlist;
    try {
        const res = await fetch(`/api/wishlist/${userId}/${productId}/new`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                user_id: userId,
                product_id: productId,
            })
        })

        if (res.ok) {
            const response = await res.json();
            // wishlist = await res.json();
            if (response.status === 'added') {
                dispatch(newList(response));
            } else if(response.status === 'removed') {
                dispatch(deleteList(response))
            }
        } else {
            console.error("Error reponse from creating wishlist")
        }

    } catch (error) {
        console.error("Error creating wishlist:", error)
    }

    return null;
}

const initialState = {allList: {}}
export default function wishlistReducer(state = initialState, action) {
    let newState;
    switch(action.type) {
        case ALL_LIST:
            newState = {allList: {}};
            if (action.wishlists && action.wishlists.wishlist) {
                action.wishlists.wishlist.forEach(lst => {
                    newState.allList[lst.id] = lst;
                });
            }
            return newState;

        case CREATE_LIST:
            return {
                ...state,
                allList: {
                    ...state.allList,
                    [action.wishlists.wishlist.id]: action.wishlists.wishlist
                }
            };

        case DELETE_LIST: {
            newState = {...state};
            delete newState.allList[action.wishlist.wishlist.id]
            return newState;
        }

        default:
            return state
    }
}
