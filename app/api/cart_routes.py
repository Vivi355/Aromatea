from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from sqlalchemy import and_
from app.models import Cart, db, Product

cart_routes = Blueprint('carts', __name__)

# load products
@cart_routes.route('/')
@login_required
def load_products():
    """
    Load all products in the cart for the current user
    """
    cart_products = Cart.query.filter(Cart.user_id == current_user.id).all()
    return {'cart': [product.to_dict() for product in cart_products]}


# add product to cart
@cart_routes.route('/', methods=['POST'])
@login_required
def add_products():
    """
    Add product to the cart
    """
    data = request.json
    productId = data.get('productId')
    qty = data.get('qty')

    # check if qty is positive int
    if not isinstance(qty, int) or qty <= 0:
        return {'error': 'Product quantity must be a positive number'}

    # check of product exists
    product = Product.query.get(productId)
    if not product:
        return {'error': "Product not found"}

    # check if product exist in the cart
    cart_product = Cart.query.filter(and_(Cart.user_id == current_user.id, Cart.product_id == productId)).first()

    if cart_product:
        cart_product.qty += qty
    else:
        cart_product = Cart(user_id=current_user.id, product_id=productId, qty=qty)
        db.session.add(cart_product)
    db.session.commit()

    return cart_product.to_dict()


# update qty of a product
@cart_routes.route('/<int:productId>', methods=['PUT'])
@login_required
def update_qty(productId):
    """
    Update product quantity in the cart
    """
    data = request.json
    qty = data.get('qty')

    cart_product = Cart.query.filter_by(user_id=current_user.id, product_id=productId).first()

    if cart_product:
        cart_product.qty = qty
        db.session.commit()
        return cart_product.to_dict()
    else:
        return {'error': 'Product not found in cart'}


# delete product from cart
@cart_routes.route('/<int:productId>', methods=['DELETE'])
@login_required
def delete_product_cart(productId):
    """
    Delete a product from the cart
    """
    cart_product = Cart.query.filter_by(user_id=current_user.id, product_id=productId).first()

    if cart_product:
        db.session.delete(cart_product)
        db.session.commit()
        return {'message': 'Product successfully deleted from cart'}
    else:
        return {'error': 'Product not found in cart'}
