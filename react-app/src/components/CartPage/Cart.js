import React from 'react';
import { NavLink } from "react-router-dom";
import './CartPage.css';

const Cart = ({
    cart,
    handleQtyChange,
    handleDelete,
    handleCheckout,
    isModal
}) => {

  return (
    <div className={`cart ${isModal ? 'cart-modal' : 'cart-page'}`}>
      {Object.values(cart).map(product => (
        <div key={product.id} className='cartItem'>
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
                <button
                  onClick={() => handleQtyChange(product.id, 1)}
                  disabled={product.qty >= 10}
                  className="plus"
                >
                  +
                </button>
              </div>
            </div>
            <div className="cdelete">
              <button onClick={() => handleDelete(product.id)} className='dbtn'>
                <i className="far fa-trash-alt"></i>
              </button>
              <div className="productPrice">${product.price}</div>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
};

export default Cart;
