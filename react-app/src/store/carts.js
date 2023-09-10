const LOAD_PRODUCTS = "cart/LOAD_PRODUCTS"
const ADD_PRODUCT_TO_CART = "cart/ADD_PRODUCT_TO_CART"
const UPDATE_QTY = "cart/UPDATE_QTY"
const REMOVE_PRODUCT_FROM_CART = "cart/REMOVE_PRODUCT"

/*********** action types **************************/
const loadProducts = (products) => ({
    type: LOAD_PRODUCTS,
    products
})

const addProduct = (product) => ({
    type: ADD_PRODUCT_TO_CART,
    product
})

const updateQty = (cartItemId, qty) => ({
    type: UPDATE_QTY,
    payload: {cartItemId, qty}
})

const removeProduct = (cartItemId) => ({
    type: REMOVE_PRODUCT_FROM_CART,
    cartItemId
})

/************* Thunks ******************************/
export const thunkLoadProducts = () => async (dispatch, getState) => {
    const localCart = localStorage.getItem('cart');

    if (localCart) {
        const parsedCart = JSON.parse(localCart);
        dispatch(loadProducts(parsedCart));

    } else {
        const res = await fetch('/api/cart/');

        if (res.ok) {
            const products = await res.json();
            localStorage.setItem('cart', JSON.stringify(products));  // Save to local storage
            dispatch(loadProducts(products));
        } else {
            const error = await res.json();
            throw error;
        }
    }
}

export const thunkAddProduct = (product) => async (dispatch, getState) => {
    const res = await fetch('/api/cart/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(product)
    })

    if (res.ok) {
        const product = await res.json()
        dispatch(addProduct(product));
        localStorage.setItem('cart', JSON.stringify(getState().cart.cart))
        return product;
    } else {
        const error = await res.json()
        throw error
    }
}

export const thunkEditQty = (cartItemId, adjustAmount) => async (dispatch, getState) => {
    // console.log('IN THE EDIT THUNK!!!!!!!!');
    const cartItems = Object.values(getState().cart.cart);
    const cartItem = cartItems.find(item => item.id === cartItemId);

    if (!cartItem) {
        console.error("Product not found in cart:", cartItemId);
        return;
    }

    const currQty = cartItem.qty;
    const newQty = currQty + adjustAmount;

    const res = await fetch(`/api/cart/${cartItemId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({qty: newQty})
    })
    // console.log('SERVER RESPONSE', res);

    if (res.ok) {
        const data = await res.json();
        dispatch(updateQty(data.id, data.qty))
        localStorage.setItem('cart', JSON.stringify(getState().cart.cart))
        return data;
    } else {
        const error = await res.json();
        throw error;
    }
}


export const thunkDeleteFromCart = (cartItemId) => async(dispatch, getState) => {
    const res = await fetch(`/api/cart/${cartItemId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        await dispatch(removeProduct(cartItemId))
        localStorage.setItem('cart', JSON.stringify(getState().cart.cart))
    } else {
        const error = await res.json()
        throw error
    }
}


/******************* Reducer *******************/
const initialState = {cart: {}}

const cartReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case LOAD_PRODUCTS:
            return {
                ...state,
                cart: action.products
            }

        case ADD_PRODUCT_TO_CART:
            newState = {...state, cart: {...state.cart, [action.product.id]: action.product}};
            return newState;

        case UPDATE_QTY:
            // console.log('Inside reducer action', action);
            if (!state.cart[action.payload.cartItemId]) return state;
            newState = {...state};
            newState.cart[action.payload.cartItemId].qty = action.payload.qty;
            return newState;

        case REMOVE_PRODUCT_FROM_CART:
            newState = {...state};
            delete newState.cart[action.cartItemId];
            return newState
        default:
            return state;
    }
}

export default cartReducer;
