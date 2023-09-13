import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCurrentUserProducts } from "../../store/products";
import { ProductItem } from "./ProductItems";
import './UserProducts.css'
import { Link } from "react-router-dom";

const UserProducts = () => {
    const dispatch = useDispatch();
    const userProducts = useSelector(state => state.products.userProducts);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(thunkCurrentUserProducts()).then(() => {
            setLoading(false);
        });
    }, [dispatch])

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <div id="my-product-page">
            <div>
                <h2>My Products</h2>
                <Link to="/products/new">Create New Product</Link>
            </div>

            <div id="user-products-container">
                {userProducts && Object.values(userProducts).map(product => (
                    <div className="single-product" key={product.id}>
                        <ProductItem product={product} />
                    </div>
                ))}
            </div>

        </div>
    );
}


export default UserProducts;
