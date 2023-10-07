import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { thunkAllList, thunkCreateList } from "../../store/wishlist";
// import { useModal } from "../../context/Modal";
import { ProductItem } from "../Products/ProductItems";
import './Wishlist.css'
import { thunkAddProduct, thunkLoadProducts } from "../../store/carts";
import CartModal from "../CartModal";
import { useModal } from "../../context/Modal";


const Wishlists = () => {
    const dispatch = useDispatch();
    // const history = useHistory();
    const user = useSelector(state => state.session.user)
    const lists = useSelector(state => state.wishlist.allList);
    const [loading, setLoading] = useState(true)
    const {openModal} = useModal();

    // dispatch all items in the wishlist
    useEffect(() => {
        dispatch(thunkAllList(user.id)).then(() => {
            setLoading(false)
        })
    }, [dispatch])

    // remove item from wishlist
    const handleHeartClick = async (productId) => {
        if(user) {
            await dispatch(thunkCreateList(user.id, productId));
            await dispatch(thunkAllList(user.id))
        }
    }

    // add item to cart from wishlist
    const handleAddCart = async (productId) => {
        await dispatch(thunkAddProduct(productId, 1));
        dispatch(thunkLoadProducts());
        openModal(<CartModal />)

        // setAddedToCart(prev => [...prev, productId]);
    }

    // items in wishlist?
    const listItem = Object.values(lists).length;

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div id="my-product-page">
            <div className="my-header">
                <div className="my-title">My Wishlist</div>
            </div>

            {listItem > 0 ? (
                <>
                    <div id="user-products-container">
                        {lists && Object.values(lists).map(product => (
                            <div className="single-product" key={product.id}>
                                <ProductItem product={product} />
                                <div className="c-and-h">
                                    <button className="list-cart" onClick={() => handleAddCart(product.id)}> ADD TO CART
                                        {/* {addedToCart.includes(product.id) ? "ADDED TO CART" : "ADD TO CART"} */}
                                    </button>
                                    <button className="heart-button" onClick={() => handleHeartClick(product.id)}>
                                        <i className="fas fa-heart heart-icon-on-hover"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ):(
                <div className="empty-cart">
                    <div className="empty-msg">My Wishlist is empty</div>
                    <NavLink to="/products/all">
                        <button className="go-b">SHOP NOW</button>
                    </NavLink>
                </div>
            )}
        </div>

    )
}

export default Wishlists;
