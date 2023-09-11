import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CartPage.css"
import { thunkLoadProducts, thunkEditQty, thunkDeleteFromCart } from "../../store/carts";
// import { thunkGetSingleProduct } from "../../store/products";

const CartPage = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart);

    useEffect(() => {
        dispatch(thunkLoadProducts())
    }, [dispatch])

    const handleQtyChange = async (cartItemId, change) => {
        const updatedQty = cart[cartItemId].qty + change;
        if (updatedQty > 0) {
            await dispatch(thunkEditQty(cartItemId, updatedQty));
            dispatch(thunkLoadProducts())
        } else {
            await dispatch(thunkDeleteFromCart(cartItemId));
            dispatch(thunkLoadProducts())
        }
    };

    const handleDelete = async (cartItemId) => {
        await dispatch(thunkDeleteFromCart(cartItemId))
        dispatch(thunkLoadProducts())
    }

    const calculateSubtotal = () => {
        return Object.values(cart).reduce((total, product) => total + product.price * product.qty, 0);
    };

    return (
        <div className="cartPage">
            <h2>Your Cart ({Object.values(cart).length} {Object.values(cart).length === 1 ? 'item' : 'items'})</h2>
            {Object.values(cart).map(product => (
                <div key={product.id} className="cartItem">
                    <img src={product.primaryImg} alt={product.name} />
                    <div className="productDetails">
                        <span className="productName">{product.name}</span>
                        <span className="productPrice">${product.price}</span>
                    </div>
                    <div className="qtyControl">
                        <button onClick={() => handleQtyChange(product.id, -1)}>-</button>
                        <span className="productQty">{product.qty}</span>
                        <button onClick={() => handleQtyChange(product.id, 1)}>+</button>
                    </div>
                    <div>
                        <button onClick={() => handleDelete(product.id)}>Delete</button>
                    </div>
                </div>
            ))}
            <div className="subtotal">
                Subtotal: ${calculateSubtotal().toFixed(2)}
            </div>
        </div>
    );
};

export default CartPage;
