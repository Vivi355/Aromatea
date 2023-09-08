from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import Product, ProductVariant, ProductSize
from app.forms import CreateProductForm

product_routes = Blueprint('products', __name__)


# all products route
@product_routes.route('/all')
def all_products():
    """
    Products homepage displays all products
    """
    # joinedLoad joins product and productVariants table in one query
    products = Product.query.options(joinedload(Product.variants)).all()

    if not products:
        return {'error': 'No products found'}

    return {'products': [product.to_dict() for product in products]}


# single product route
@product_routes.route('/<int:id>')
def one_product(id):
    """
    Query for a product by id and return product in a dictionary
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

    if form.validate_on_submit():
        new_product = Product(
            user_id=current_user.id,
            category_id=form.data['category_id'],
            name=form.data['name'],
            description=form.data['description'],
            primary_img=form.data['primary_img'],
            secondary_img=form.data['secondary_img'],
        )
        # new variant add to the new product
        new_variant = ProductVariant(
            size=form.data['size'],
            price=form.data['price']
        )
        # append to new_product vairants attribute
        new_product.variants.append(new_variant)

        db.session.add(new_product)
        db.session.commit()
        return new_product.to_dict()
    return {'errors': validation_errors_to_error_message(form.errors)}, 401


# edit product route
@product_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def update_product(id):
    """
    Edit the product
    """
    form = CreateProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        product_to_edit = Product.query.get(id)
        product_to_edit.name = form.data['name']
        product_to_edit.description = form.data['description']
        product_to_edit.primary_img = form.data['primary_img']
        product_to_edit.secondary_img = form.data['secondary_img']

        # edit variants
        variant = product_to_edit.variants[0] # grab the first variant
        variant.size = form.data['size']
        variant.price = form.data['price']

        db.session.commit()
        return product_to_edit.to_dict()

    return {'errors': validation_errors_to_error_message(form.errors)}, 400


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
    return {"Message": "Product Deleted Successfully"}
