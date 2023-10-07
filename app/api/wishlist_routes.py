from flask import Blueprint, session, request
from flask_login import login_required, current_user
from sqlalchemy import and_, select
from app.models import Wishlist, db, Product

wishlist_routes = Blueprint('wishlist', __name__)

# load wishlist
@wishlist_routes.route('/<int:userId>/allList')
@login_required
def user_wishlist(userId):
    """
    Load all products in the wishlist for the current user
    """
    res = []
    lists = Wishlist.query.filter_by(user_id=userId).all()

    for lst in lists:
        product = Product.query.filter_by(id=lst.product_id).first()
        if product:
            res.append(product.to_dict())

    return {"wishlist": res}


@wishlist_routes.route('/<int:userId>/<int:productId>/new', methods=['POST'])
@login_required
def add_wishlist(userId, productId):
    """
    Add or remove a product from wishlist
    """
    product = Product.query.get(productId)

    if not product:
        return {'error': 'Product not found'}, 404

    # check wishlist
    wishlist_item = Wishlist.query.filter_by(user_id=userId, product_id= productId).first()

    if not wishlist_item:
        new_list = Wishlist(user_id=userId, product_id=productId)

        db.session.add(new_list)
        db.session.commit()

        return {"wishlist": product.to_dict()}
    else:
        db.session.delete(wishlist_item)
        db.session.commit()
        return {"wishlist": product.to_dict(), 'Delete': 'DeleteList'}
