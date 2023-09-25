import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CartPage.css"
import { thunkLoadProducts, thunkEditQty, thunkDeleteFromCart, thunkClearCart } from "../../store/carts";
import { NavLink, useHistory } from "react-router-dom";
import Cart from "./Cart";

const CartPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
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

    // const itemsInCart = Object.values(cart).length;
    const cartItemCount = Object.values(cart).reduce((acc, product) => acc + product.qty, 0);

    const handleCheckout = () => {
        dispatch(thunkClearCart())
        history.push('/order')
    }

    return (
        <div className="cartPage">
            <div className="cart-title">Your Cart ({cartItemCount} {cartItemCount === 1 ? 'item' : 'items'})</div>

            {cartItemCount > 0 ? (
                <>
                    {/* {Object.values(cart).map(product => (
                <div key={product.id} className="cartItem">
                    <NavLink to={`/products/${product.productId}`}>
                        <img src={product.primaryImg} alt={product.name} />
                    </NavLink>

                    <div className="rcart">
                        <div className="productDetails">
                            <div className="productName">{product.name}</div>
                            <div className="qtyControl">
                                <button onClick={() => handleQtyChange(product.id, -1)}>
                                    -
                                </button>
                                <span className="productQty">{product.qty}</span>
                                <button onClick={() => handleQtyChange(product.id, 1)}
                                disabled={product.qty >= 10}
                                className="plus"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="cdelete">
                            <button onClick={() => handleDelete(product.id)}><i className="far fa-trash-alt"></i></button>
                            <div className="productPrice">${product.price}</div>
                        </div>
                    </div>

                </div>
            ))} */}
                <div className="scroll-container">
                    <Cart
                        cart={cart}
                        handleQtyChange={handleQtyChange}
                        handleDelete={handleDelete}
                        handleCheckout={handleCheckout}
                        isModal={false}
                    />
                </div>
                    <div className="cbottom">
                        <div className="subtotal">
                            Total: ${calculateSubtotal().toFixed(2)}
                        </div>
                        <div className="checkout-btn">
                            <button className="ok-btn" onClick={handleCheckout}>CHECKOUT</button>
                            <NavLink to="/products/all">
                                <button className="no-btn">Continue Shopping</button>
                            </NavLink>
                        </div>
                    </div>
                </>
            ): (
                <div className="empty-cart">
                    <div className="empty-msg">You cart is empty</div>
                    <NavLink to="/products/all">
                        <button className="go-btn">SHOP NOW</button>
                    </NavLink>
                </div>
            )}



        </div>
    );
};

export default CartPage;
