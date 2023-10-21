const GET_ALL_PRODUCTS = "products/GET_ALL"
const GET_SINGLE_PRODUCTS = "products/GET_SINGLE"
const CREATE_PRODUCT = "product/CREATE_PRODUCT"
const EDIT_PRODUCT = "product/EDIT_PRODUCT"
const DELETE_PRODUCT = "product/DELETE_PRODUCT"
const CURRENT_USER_PRODUCTS = "products/CURRENT_USER_PRODUCTS"
const SEARCH_PRODUCT = "products/SEARCH_PRODUCT"

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

const getCurrentUserProducts = (products) => ({
    type: CURRENT_USER_PRODUCTS,
    products
})

const searchProduct = (products) => ({
    type: SEARCH_PRODUCT,
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

export const thunkGetSingleProduct = (id) => async (dispatch) => {
    try {
        if (!id) {
            return;
        }
        const res = await fetch(`/api/products/${id}`);


        if (res.ok) {
            const product = await res.json();
            dispatch(getSingleProduct(product));
            return product

        } else {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to fetch product')
        }

    } catch (error) {
        console.error('Failed to fetch single product:', error);
    }
}

export const thunkCreateProduct = (formData) => async (dispatch) => {
    const res = await fetch(`/api/products/new`, {
        method: "POST",
        body: formData
        // headers: {'Content-Type': 'application/json'},
        // body: JSON.stringify(product)
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

export const thunkUpdateProduct = (formData) => async (dispatch) => {
    const productId = formData.get("id");
    const res = await fetch(`/api/products/${productId}/edit`, {
        method: "PUT",
        // headers: {'Content-Type': 'application/json'},
        // body: JSON.stringify(formData)
        body: formData
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(updateProduct(data));
        return data;
    } else {
        const error = await res.json()
        throw error
    }
}

export const thunkDeleteProduct = (productId) => async (dispatch) => {
    const res = await fetch(`/api/products/delete/${productId}`, {
        method: 'DELETE',
    })

    if (res.ok) {
        await dispatch(deleteProduct(productId))
    }
}

export const thunkCurrentUserProducts = () => async (dispatch) => {
    const res = await fetch('/api/products/current');

    if (res.ok) {
        const {products: products} = await res.json();
        dispatch(getCurrentUserProducts(products));
    }
}

export const thunkSearchProduct = (searchWord) => async (dispatch) => {
    const res = await fetch('/api/products/search', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'searchWord': searchWord})
    })

    const search = await res.json();
        if (res.ok) {
            if (search.error) {
                return search.error;
            }
            dispatch(searchProduct(search.products))
    } else {
		return ["An error occurred. Please try again."];
    }
}

/************************** Reducer ***********************/
const initialState = {allProducts: {}, singleProduct: {}, userProducts: {}};

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

        case CURRENT_USER_PRODUCTS:
            return {
                ...state,
                userProducts: action.products || {}
            };

        case DELETE_PRODUCT:
            newState = { ...state, allProducts: { ...state.allProducts }, singleProduct: { ...state.singleProduct }, userProducts: { ...state.userProducts } }
            delete newState.allProducts[action.productId]
            delete newState.userProducts[action.productId]
            delete newState.singleProduct;
            return { ...newState, allProducts: { ...newState.allProducts }, userProducts: { ...newState.userProducts }, singleProduct: { ...newState.singleProduct } };

        case SEARCH_PRODUCT:
            newState = {...state, allProducts: {}, singleProduct: {}};
            if (Array.isArray(action.products)) {
                action.products.forEach(product => {
                    newState.allProducts[product.id] = product
                })
            }
            return newState;

        default:
            return state;
    }
}

export default productsReducer;
