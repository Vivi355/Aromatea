import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import { thunkLoadProducts, thunkEditQty, thunkDeleteFromCart, thunkClearCart } from '../../store/carts';
import Cart from '../CartPage/Cart';
import { useModal } from '../../context/Modal';
import './CartModal.css'

const CartModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const cart = useSelector(state => state.cart.cart);
    const {closeModal} = useModal();

    const handleQtyChange = async (cartItemId, change) => {
        const updatedQty = cart[cartItemId]?.qty + change || 1;
        if (updatedQty > 0) {
            await dispatch(thunkEditQty(cartItemId, updatedQty));
            dispatch(thunkLoadProducts());
        } else {
            await dispatch(thunkDeleteFromCart(cartItemId));
            dispatch(thunkLoadProducts());
        }
    };

    const handleDelete = async (cartItemId) => {
        await dispatch(thunkDeleteFromCart(cartItemId));
        dispatch(thunkLoadProducts());
    };

    const handleCheckout = () => {
        dispatch(thunkClearCart());
        history.push('/order');
    };

    const calculateSubtotal = () => {
        return Object.values(cart).reduce((total, product) => total + product.price * product.qty, 0);
    };

    // const itemsInCart = Object.values(cart).length;
    const cartItemCount = Object.values(cart).reduce((acc, product) => acc + product.qty, 0);

    return (
        <div className='cart-modal-container'>
            <div className='cart-top'>
                <div>Your Cart</div>
                <button onClick={closeModal} className='x-btn' style={{cursor: 'pointer'}}><i className="fas fa-times"></i></button>
            </div>

            {cartItemCount > 0 ? (
                <>
                    <div className='scroll-section'>
                        <Cart
                            cart={cart}
                            handleQtyChange={handleQtyChange}
                            handleDelete={handleDelete}
                            handleCheckout={handleCheckout}
                            isModal={true}
                        />
                    </div>

                    <div className='cart-b'>
                        <div className='subtotal-section'>
                            <div>
                                Subtotal ({cartItemCount} {cartItemCount === 1 ? 'item' : 'items'})
                            </div>
                            <div>
                                ${calculateSubtotal().toFixed(2)}
                            </div>
                        </div>

                        <div className='c-pop'>
                            <NavLink to='/cart'>
                                <button onClick={closeModal} className='c-v'>VIEW CART</button>
                            </NavLink>
                            <button className='c-c' onClick={closeModal}>Continue Shopping</button>
                        </div>
                    </div>
                </>
            ): (
                <div className="empty-cart">
                    <div className="empty-msg">Your cart is empty</div>
                    <NavLink to="/products/all">
                        <button onClick={closeModal} className="go-b">SHOP NOW</button>
                    </NavLink>
            </div>
            )}
        </div>
    )
}


export default CartModal;
