from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Review, db, User, Product
from app.forms import CreateReviewForm

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/<int:productId>')
def all_reviews(productId):
    """
    Fetch all reviews by product id
    """
    reviews = Review.query.filter(Review.product_id == productId).all()
    lst = []
    res = {"reviews": lst}
    for review in reviews:
        user = User.query.filter(User.id == review.user_id).first()
        new_review = review.to_dict()
        new_review["Author"] = user.to_dict()
        res['reviews'].append(new_review)
    return res

@review_routes.route('/<int:productId>/new', methods=["POST"])
@login_required
def create_review(productId):
    """
    Create new review
    """
    form = CreateReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_review = Review(
            user_id=current_user.id,
            product_id=productId,
            comment=form.data["comment"],
            rating=form.data["rating"]
        )

        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()

    if form.errors:
        print(form.errors)
        return {'errors': form.errors}

@review_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_review(id):
    """
    Updata a review by id
    """
    review_to_edit = Review.query.get(id)

    form = CreateReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review_to_edit.comment = form.data['comment']
        review_to_edit.rating = form.data['rating']

        db.session.commit()
        return review_to_edit.to_dict()

    if form.errors:
        print(form.errors)
        return {'errors': form.errors}


@review_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_review(id):
    """
    Delete a review by id
    """
    to_delete = Review.query.get(id)
    db.session.delete(to_delete)
    db.session.commit()
    return {"Message": "Review Deleted Successfully"}
