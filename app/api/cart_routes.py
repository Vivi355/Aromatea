from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from sqlalchemy import and_
from app.models import Cart, db, Product

cart_routes = Blueprint('carts', __name__)

# load products
@cart_routes.route('/')
@login_required
def user_cart():
    """
    Load all products in the cart for the current user
    """
    carts = Cart.query.filter_by(user_id=current_user.id).all()

    return {
        'cart': [cart.to_dict() for cart in carts]
    }


# add product to cart
@cart_routes.route('/', methods=['POST'])
@login_required
def add_products():
    """
    Add product to the cart
    """
    data = request.json
    product_id = data.get('productId')
    qty = data.get('qty')

    # check if product exist in the cart
    cart_item = Cart.query.filter_by(user_id=current_user.id, product_id=product_id).first()

    if cart_item:
        cart_item.qty += qty
    else:
        cart_item = Cart(user_id=current_user.id, product_id=product_id, qty=qty)
        db.session.add(cart_item)
    db.session.commit()

    return cart_item.to_dict()


# update qty of a product
@cart_routes.route('/<int:cartItemId>', methods=['PUT'])
@login_required
def update_qty(cartItemId):
    """
    Update product quantity in the cart
    """
    data = request.json
    qty = data.get('qty')


    cart_item = Cart.query.filter_by(user_id=current_user.id, id=cartItemId).first()

    if not cart_item:
        return {'error': 'Item not found in cart'}, 404

    cart_item.qty = qty
    db.session.commit()
    return cart_item.to_dict(), 200



# delete product from cart
@cart_routes.route('/<int:cartItemId>', methods=['DELETE'])
@login_required
def delete_product_cart(cartItemId):
    """
    Delete a product from the cart
    """
    cart_item = Cart.query.filter_by(user_id=current_user.id, id=cartItemId).first()

    if cart_item:
        db.session.delete(cart_item)
        db.session.commit()
        return {'message': 'Product successfully deleted from cart'}, 200
    else:
        return {'error': 'Product not found in cart'}, 404


# clear products from cart
@cart_routes.route('/clear', methods=['DELETE'])
@login_required
def clear_cart():
    """
    Clear all products in cart for the current user
    """
    Cart.query.filter_by(user_id=current_user.id).delete()
    db.session.commit()

    return {'message': 'Cart cleared successfully'}, 200
