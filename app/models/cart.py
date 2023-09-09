from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy import UniqueConstraint

class Cart(db.Model):
    __tablename__ = 'carts'

    __table_args__ = (
        UniqueConstraint('user_id', 'product_id', name='unique_combination_constraint'),
        {'schema': SCHEMA} if environment == "production" else None,
    )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    qty = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.now())
    updated_at = db.Column(db.DateTime(), default=datetime.now())

    # relationships
    user = db.relationship('User', back_populates='carts')
    product = db.relationship('Product', back_populates='carts')


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'productId': self.product_id,
            'qty': self.qty,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
        }
