from flask import Blueprint, session, request
from flask_login import login_required, current_user
from app.models import Category

category_routes = Blueprint('categories', __name__)


@category_routes.route('/')
def get_categories():
    categories = Category.query.all()
    return {"categories": [category.to_dict() for category in categories]}
