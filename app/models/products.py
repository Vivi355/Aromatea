from .db import db, environment, SCHEMA, add_prefix_for_prod


class Product(db.Model):
    __tablename__ = 'products'


    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('categories.id')))
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(2000))
    price = db.Column(db.Float, nullable=False)
    size = db.Column(db.String(50))
    primary_img = db.Column(db.String(255))
    secondary_img = db.Column(db.String(255))
    created_at = db.Column(db.DateTime(), default=datetime.now())
    updated_at = db.Column(db.DateTime(), default=datetime.now())


    # relatioships
    user = db.relationship('User', back_populates='products')
    category = db.relationship('Category', back_populates='products')


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'categoryId': self.category_id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'size': self.size,
            'primaryImg': self.primary_img,
            'secondaryImg': self.secondary_img,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
