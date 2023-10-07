from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import UniqueConstraint

class Wishlist(db.Model):
    __tablename__ = 'wishlists'

    __table_args__ = (
        UniqueConstraint('user_id', 'product_id', name='unique_combination_constraint'),
        {'schema': SCHEMA} if environment == "production" else None,
    )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)

    # relationships
    users = db.relationship('User', back_populates='wishlists')
    product = db.relationship('Product', back_populates='wishlists')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'productId': self.product_id,
        }
