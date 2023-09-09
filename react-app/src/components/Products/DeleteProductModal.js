import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteProduct, thunkCurrentUserProducts } from "../../store/products";
import "./DeleteProduct.css"
import { useHistory } from "react-router-dom";


export const DeleteProduct = ({productId}) => {
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const history = useHistory()

    const deleteProduct = async() => {
        await dispatch(thunkDeleteProduct(productId))
        closeModal();
        await dispatch(thunkCurrentUserProducts())
        history.push('/products/current')
    }

    return (
        <div id="delete-product-modal">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this product from the listings?</p>

            <div className="yes-no-btns">
                <button onClick={deleteProduct}>Yes</button>
                <button onClick={closeModal}>No</button>
            </div>
        </div>
    )
}
