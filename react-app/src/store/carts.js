const LOAD_PRODUCTS = "cart/LOAD_PRODUCTS"
const ADD_PRODUCT_TO_CART = "cart/ADD_PRODUCT_TO_CART"
const UPDATE_QTY = "cart/UPDATE_QTY"
const REMOVE_PRODUCT_FROM_CART = "cart/REMOVE_PRODUCT"
const CLEAR_CART = "cart/CLEAR_CART"

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

const clearCart = () => ({
    type: CLEAR_CART
})

/************* Thunks ******************************/
export const thunkLoadProducts = () => async (dispatch, getState) => {
    // console.log('IN THE THUNK LOAD PRODUCTS');
    try {
        const response = await fetch('/api/cart/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Convert the array of products to an object with product ids as keys
        const productsObject = {};
        data.cart.forEach(product => {
            productsObject[product.id] = product;
        });

        dispatch(loadProducts(productsObject));
    } catch (error) {
        console.error("Error fetching cart items:", error);
    }
};


export const thunkAddProduct = (productId, qty) => async (dispatch, getState) => {
    // console.log('IN the thunk add product');
    try {
        const response = await fetch('/api/cart/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId: productId, qty:qty }),
        });

        if (response.ok) {
            const product = await response.json();
            dispatch(addProduct(product));
        } else {
            const errors = await response.json()
            throw errors
        }

    } catch (error) {
        console.error("Error adding product to cart:", error);
    }
};

export const thunkEditQty = (cartItemId, qty) => async (dispatch, getState) => {
    try {
        const response = await fetch(`/api/cart/${cartItemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ qty }),
        });

        if (response.ok) {
            const updatedProduct = await response.json();
            dispatch(updateQty(cartItemId, updatedProduct.qty));
        } else {
            const errors = await response.json()
            throw errors
        }

    } catch (error) {
        console.error("Error updating product quantity:", error);
    }
};


export const thunkDeleteFromCart = (cartItemId) => async(dispatch, getState) => {
    try {
        const response = await fetch(`/api/cart/${cartItemId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            dispatch(removeProduct(cartItemId));
        } else {
            const errors = await response.json()
            throw errors
        }

    } catch (error) {
        console.error("Error deleting product from cart:", error);
    }
};

export const thunkClearCart = () => async(dispatch, getState) => {
    try {
        const res = await fetch(`/api/cart/clear`, {
            method: "DELETE"
        })

        if (res.ok) {
            dispatch(clearCart())
        } else {
            const errors = await res.json()
            throw errors;
        }
    } catch(error) {
        console.error('Error clearing the cart:', error)
    }
}


/******************* Reducer *******************/
const initialState = {cart: {}}

const cartReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case LOAD_PRODUCTS:
            newState = { ...state, cart: { ...state.cart, ...action.products } };
            return newState;

        case ADD_PRODUCT_TO_CART:
            // console.log('in the reducer');
            newState = { ...state };
            newState.cart[action.product.id] = action.product;
            return newState;

        case UPDATE_QTY:
            newState = { ...state };
            if (newState.cart[action.payload.cartItemId]) {
                newState.cart[action.payload.cartItemId].qty = action.payload.qty;
            }
            return newState;

        case REMOVE_PRODUCT_FROM_CART:
            newState = {...state};
            delete newState.cart[action.cartItemId];
            return newState

        case CLEAR_CART:
            newState = {...state, cart: {}}
            return newState

        default:
            return state;
    }
}

export default cartReducer;
