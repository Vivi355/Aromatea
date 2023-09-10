import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CartPage.css"
import { thunkLoadProducts, thunkEditQty, thunkDeleteFromCart } from "../../store/carts";
import { thunkGetSingleProduct } from "../../store/products";

function CartPage() {
    const dispatch = useDispatch();
    const cart = useSelector(state => {
        // console.log("UPADTED CART STATE:", state.cart.cart);
        return state.cart.cart;
    });


    const [detailCart, setDetailCart] = useState([])

    const fetchProductDetails = async () => {
        let tempCart = Object.values(cart).map(async item => {
            const productDetails = await dispatch(thunkGetSingleProduct(item.productId));
            return {
                ...item,
                product: productDetails
            };
        });

        Promise.all(tempCart).then(completedCart => {
            setDetailCart(completedCart);
        });
    }

    useEffect(() => {
        dispatch(thunkLoadProducts());
    }, [dispatch]);

    useEffect(() => {
        if (cart && Object.keys(cart).length) {
            fetchProductDetails();
        }
    }, [dispatch, cart]);


    const handleIncrement = async (cartItemId) => {
        await dispatch(thunkEditQty(cartItemId, 1));
        fetchProductDetails();
    }

    const handleDecrement = async (cartItemId) => {
        const currentItem = cart[cartItemId];
        if (currentItem.qty <= 1) {
        // Here, you can either delete the item
        dispatch(thunkDeleteFromCart(cartItemId));
        // Or just return to prevent decrementing further
        // return;
        } else {
            await dispatch(thunkEditQty(cartItemId, -1));
            fetchProductDetails();
        }
    }

    const handleDelete  = async (cartItemId) => {
        await dispatch(thunkDeleteFromCart(cartItemId))
        fetchProductDetails()
    }

    // total
    const subtotal = detailCart.reduce((acc, item) => {
        return acc + (item.product?.price * item.qty)
    }, 0)
    const totalItems = detailCart.reduce((acc, item) => {
        return acc + item.qty;
    }, 0);

    return (
        <div className="cart-contaienr">
            <h1>My Cart ({totalItems} {totalItems === 1 ?  'item' : 'items'})</h1>
            <ul>
                {detailCart.map(item => (
                    <div className="one-product" key={item.id}>
                        <img src={item.product?.primaryImg} alt={item.product?.name} />
                        <div>{item.product?.name}</div>
                        <div>${item.product?.price}</div>
                        <div>
                            <button onClick={() => handleDecrement(item.id)} disabled={item.qty <= 1}>-</button>
                            {item.qty}
                            <button onClick={() => handleIncrement(item.id)}>+</button>
                        </div>
                        <div>
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </ul>
            <div className="subtotal">
                <strong>Subtotal</strong> ${subtotal.toFixed(2)}
            </div>
        </div>
    )
}

export default CartPage;
