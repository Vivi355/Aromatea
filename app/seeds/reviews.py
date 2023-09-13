from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review1 = Review(
        user_id=1,
        product_id=2,
        comment="My favorite way to start the day! It's yummy flavor and fragrance and soothing, not overpowering. It's good hot or iced.",
        rating=5
    )

    review2 = Review(
        user_id=2,
        product_id=1,
        comment="Delicious. My Favorite Of All.",
        rating=5
    )
    review3 = Review(
        user_id=2,
        product_id=3,
        comment="I drink jasmine green tea every morning with local honey.",
        rating=4
    )
    review4 = Review(
        user_id=3,
        product_id=2,
        comment="You can really taste the cinnamon and the fruit. It is woodsy and perfect for a cold night!",
        rating=4
    )
    review5 = Review(
        user_id=1,
        product_id=5,
        comment="My go-to White Tea. Great flavor and mouth feel. Easy to like.",
        rating=5
    )
    review6 = Review(
        user_id=3,
        product_id=4,
        comment="This tea is amazing and fresh.",
        rating=4
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
