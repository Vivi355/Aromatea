from .db import db, environment, SCHEMA, add_prefix_for_prod
from enum import Enum
from datetime import datetime

class ProductSize(Enum):
    ONE_POUND = 'ONE_POUND'
    QUARTER_POUND = 'QUARTER_POUND'

class CategoryEnum(Enum):
    BLACK = "BLACK"
    GREEN = "GREEN"
    WHITE = "WHITE"
    BOTANICAL = "BOTANICAL"
    OOLONG = "OOLONG"


class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    category = db.Column(db.Enum(CategoryEnum), nullable=False)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    price = db.Column(db.Numeric(precision=10, scale=2), nullable=False)
    size = db.Column(db.Enum(ProductSize), nullable=False)
    primary_img = db.Column(db.String(255), nullable=False)
    secondary_img = db.Column(db.String(255))
    created_at = db.Column(db.DateTime(), default=datetime.now())
    updated_at = db.Column(db.DateTime(), default=datetime.now())


    # relatioships
    user = db.relationship('User', back_populates='products')
    carts = db.relationship('Cart', back_populates='product')


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'category': self.category.value,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'size': self.size.value,
            'primaryImg': self.primary_img,
            'secondaryImg': self.secondary_img,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
        }
