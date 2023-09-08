from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
# from sqlalchemy.orm import joinedload
from app.models import Product, ProductSize, db
from app.forms import CreateProductForm, VariantForm

from werkzeug.datastructures import MultiDict

product_routes = Blueprint('products', __name__)


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
    # form = CreateProductForm()

    form = CreateProductForm(data=request.json)
    form['csrf_token'].data = request.cookies['csrf_token']

    print('form variants data', form.variants.data)
    print("request data!!!!!!!!", request.json)
    print("FORM DATA!!!!!!!!", form.data)
    if form.validate_on_submit():
        print(" IN THE FORM SUBMIT!!!!!!!!!!!!!!!!!!!!!!")
        new_product = Product(
            user_id=current_user.id,
            category_id=form.data['category_id'],
            name=form.data['name'],
            description=form.data['description'],
            primary_img=form.data['primary_img'],
            secondary_img=form.data['secondary_img'],
        )
        # new variant add to the new product
        for variant_data in form.variants.data:
            variant = ProductVariant(size=variant_data['size'], price=variant_data['price'])
            new_product.variants.append(variant)

        db.session.add(new_product)
        db.session.commit()
        return new_product.to_dict()
    print('Form errors', form.errors)
    return {'errors': form.errors, 'form_data': form.data}, 400


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
    return {"Message": "Product Deleted Successfully"}
