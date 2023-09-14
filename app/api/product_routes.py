from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Product, ProductSize, db, CategoryEnum
from app.forms import CreateProductForm, UpdateProductForm

from .aws_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3

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
        return {'error': 'Product not found'}, 404

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
    # try:
    #     form.price.data = float(request.json['price'])
    # except ValueError:
    #     return {'errors': ['Invalid price value']}, 400

    if form.validate_on_submit():

        # aws validator
        primary_img = form.data["primary_img"]
        primary_img.filename = get_unique_filename(primary_img.filename)
        primary_upload = upload_file_to_s3(primary_img)

        secondary_img = form.data["secondary_img"]
        secondary_img.filename = get_unique_filename(secondary_img.filename)
        secondary_upload = upload_file_to_s3(secondary_img)

        if "url" not in primary_upload:
            return {'errors': primary_upload}

        if "url" not in secondary_upload:
            return {'errors': secondary_upload}

        new_product = Product(
            user_id=current_user.id,
            category=CategoryEnum(form.data['category']),
            name=form.data['name'],
            description=form.data['description'],
            size=ProductSize(form.data['size']),
            price=form.data['price'],
            # primary_img=form.data['primary_img'],
            primary_img=primary_upload["url"],
            # secondary_img=form.data['secondary_img'],
            secondary_img=secondary_upload["url"],
        )

        print('new product created', new_product)

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
    form = UpdateProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    product_to_edit = Product.query.get(id)
    if not product_to_edit:
        return {"errors": ["Product not found"]}, 404

    if form.validate_on_submit():
        # aws
        if form.data['primary_img']:
            primary_img = form.data['primary_img']
            primary_img.filename = get_unique_filename(primary_img.filename)
            primary_upload = upload_file_to_s3(primary_img)

            if "url" not in primary_upload:
                return {'errors': primary_upload}

            product_to_edit.primary_img = primary_upload["url"]

        if form.data['secondary_img']:
            secondary_img = form.data['secondary_img']
            secondary_img.filename = get_unique_filename(secondary_img.filename)
            secondary_upload = upload_file_to_s3(secondary_img)

            if "url" not in secondary_upload:
                return {'errors': secondary_upload}

            product_to_edit.secondary_img = secondary_upload["url"]


        product_to_edit.category=CategoryEnum(form.data['category'])
        product_to_edit.name = form.data['name']
        product_to_edit.description = form.data['description']
        product_to_edit.size=ProductSize(form.data['size'])
        product_to_edit.price=form.data['price']


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
