const GET_ALL_PRODUCTS = "products/GET_ALL"
const GET_SINGLE_PRODUCTS = "products/GET_SINGLE"

/****************************action types ***************************/
const getAllProducts = (products) => ({
    type: GET_ALL_PRODUCTS,
    products
})

const getSingleProduct = (product) => ({
    type: GET_SINGLE_PRODUCTS,
    product
})


/************************* thunks *************************/
export const thunkGetAllProducts = () => async (dispatch) => {
    const res = await fetch('/api/products/all');

    if (res.ok) {
        const products = await res.json();
        dispatch(getAllProducts(products.products));
        return products
    }
}

export const thunkGetSingleProduct = (id) => async (dispatch) => {
    const res = await fetch(`/api/products/${id}`);

    if (res.ok) {
        const product = await res.json();
        dispatch(getSingleProduct(product));
        return product
    }
}


/************************** Reducer ***********************/
const initialState = {allProducts: {}, singleProduct: {}};

const productsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            newState = {...state, allProducts: {...state.allProducts}, singleProduct: {}};
            action.products.forEach(product => {
                newState.allProducts[product.id] = product
            })
            return newState;
        case GET_SINGLE_PRODUCTS:
            newState = {...state};
            newState.singleProduct = action.product;
            return newState;
        default:
            return state;
    }
}

export default productsReducer;
