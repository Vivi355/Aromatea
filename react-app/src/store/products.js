const GET_ALL_PRODUCTS = "products/GET_ALL"

const getAllProducts = (products) => ({
    type: GET_ALL_PRODUCTS,
    products
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
        default:
            return state;
    }
}

export default productsReducer;
