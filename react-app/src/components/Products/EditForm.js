import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetSingleProduct } from "../../store/products";
import CreateProduct from "./CreateProduct"

const EditForm = () => {
    const {productId} = useParams()
    const dispatch = useDispatch()
    const product = useSelector(state => state.products.singleProduct)

    useEffect(() => {
        dispatch(thunkGetSingleProduct(productId))
    }, [dispatch, productId])


    return (
        product && Object.keys(product).length > 1 && (
            <>
                <CreateProduct
                    product={product}
                    formType="Update Product"
                />
            </>
        )
    )
}

export default EditForm;
