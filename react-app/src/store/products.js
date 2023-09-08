const GET_ALL_PRODUCTS = "products/GET_ALL"
const GET_SINGLE_PRODUCTS = "products/GET_SINGLE"
const CREATE_PRODUCT = "product/CREATE_PRODUCT"
const EDIT_PRODUCT = "product/EDIT_PRODUCT"
const DELETE_PRODUCT = "product/DELETE_PRODUCT"

/****************************action types ***************************/
const getAllProducts = (products) => ({
    type: GET_ALL_PRODUCTS,
    products
})

const getSingleProduct = (product) => ({
    type: GET_SINGLE_PRODUCTS,
    product
})

const createProduct = (product) => ({
    type: CREATE_PRODUCT,
    product
})

const updateProduct = (product) => ({
    type: EDIT_PRODUCT,
    product
})

const deleteProduct = (productId) => ({
    type: DELETE_PRODUCT,
    productId
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
    console.log('thunk single id', id);

    if (res.ok) {
        const product = await res.json();
        dispatch(getSingleProduct(product));
        return product

    } else {
        const errors = await res.json()
        throw errors
    }
}

export const thunkCreateProduct = (product) => async (dispatch) => {
    console.log('in the create thunk', product);
    const res = await fetch(`/api/products/new`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(product)
    })
    if (res.ok) {
        const product = await res.json();
        dispatch(createProduct(product));
        return product;
    } else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const thunkUpdateProduct = (product) => async (dispatch) => {
    console.log(' in the thunk update', product);
    const res = await fetch(`/api/products/${product.id}/edit`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(product)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(updateProduct(data))
    } else {
        const error = await res.json()
        throw error
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
        case CREATE_PRODUCT:
            return {
                ...state,
                allProducts: {...state.allProducts, [action.product.id]: action.product},
                singleProduct: action.product
            }
        case EDIT_PRODUCT:
            return {
                ...state,
                allProducts: {...state.allProducts, [action.product.id]: {...action.product}},
                singleProduct: {...action.product}
            }
        default:
            return state;
    }
}

export default productsReducer;
