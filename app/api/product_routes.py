from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
# from sqlalchemy.orm import joinedload
from app.models import Product, ProductSize, db, CategoryEnum
from app.forms import CreateProductForm


product_routes = Blueprint('products', __name__)

# current user products
@product_routes.route('/current')
@login_required
def user_all_products():
    """"
    Display all current user's products
    """
    products = Product.query.filter(Product.user_id == current_user.id).all()
    return {'products': [product.to_dict() for product in products]}

# all products route
@product_routes.route('/all')
def all_products():
    """
    Products homepage displays all products
    """
    # query all products
    products = Product.query.all()

    if not products:
        return {'error': 'No products found'}

    return {'products': [product.to_dict() for product in products]}


# single product route
@product_routes.route('/<int:id>')
def one_product(id):
    """
    Query for a product by id
    """
    one_product = Product.query.get(id)

    if not one_product:
        return {'error': 'Product not found'}

    return one_product.to_dict()


# create new product route
@product_routes.route('/new', methods=['POST'])
@login_required
def create_product():
    """
    Create a new product
    """

    form = CreateProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # convert price to float before validating form
    if 'price' in request.json:
        try:
            form.price.data = float(request.json['price'])
        except ValueError:
            return {'errors': ['Invalid price value']}, 400

    if form.validate_on_submit():
        new_product = Product(
            user_id=current_user.id,
            category=CategoryEnum(form.data['category']),
            name=form.data['name'],
            description=form.data['description'],
            size=ProductSize(form.data['size']),
            price=form.data['price'],
            primary_img=form.data['primary_img'],
            secondary_img=form.data['secondary_img'],
        )

        db.session.add(new_product)
        db.session.commit()
        return new_product.to_dict()

    return {'errors': form.errors}, 400


# edit product route
@product_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def update_product(id):
    """
    Edit the product based on id
    """
    form = CreateProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        product_to_edit = Product.query.get(id)
        product_to_edit.category=CategoryEnum(form.data['category'])
        product_to_edit.name = form.data['name']
        product_to_edit.description = form.data['description']
        product_to_edit.size=ProductSize(form.data['size'])
        product_to_edit.price=form.data['price']
        product_to_edit.primary_img = form.data['primary_img']
        product_to_edit.secondary_img = form.data['secondary_img']


        db.session.commit()
        return product_to_edit.to_dict()

    return {'errors': form.errors}, 400


# delete product
@product_routes.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def delete_product(id):
    """
    Delete current user's product
    """
    to_delete = Product.query.get(id)
    db.session.delete(to_delete)
    db.session.commit()
    # return to_delete.to_dict()
    return {"Message": "Product Deleted Successfully"}
