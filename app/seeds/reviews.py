from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review1 = Review(
        user_id=3,
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
        user_id=5,
        product_id=5,
        comment="My go-to White Tea. Great flavor and mouth feel. Easy to like.",
        rating=5
    )
    review6 = Review(
        user_id=3,
        product_id=4,
        comment="This tea is amazing and fresh.",
        rating=5
    )
    review7 = Review(
        user_id=3,
        product_id=6,
        comment="I spent many years in England, and fell in love with English Breakfast, but this is even better than any other variety!",
        rating=5
    )
    review8 = Review(
        user_id=6,
        product_id=6,
        comment="Not my favorite but good alternative to earl gray.",
        rating=4
    )
    review9 = Review(
        user_id=2,
        product_id=7,
        comment="This is such a warming, soothing tea. We drink it for our afternoon teatime and prior to using the sauna.",
        rating=5
    )
    review10 = Review(
        user_id=4,
        product_id=7,
        comment="I love the taste of this tea and it is a part of my daily tea regime. I fast until noon and follow warm lemon water, my first beverage, with a pot of this tea.",
        rating=5
    )
    review11 = Review(
        user_id=3,
        product_id=7,
        comment="I truly love this tea, whether it is loose or in sachets. It is simply wonderful any time of the day and any time of the year!",
        rating=5
    )
    review12 = Review(
        user_id=2,
        product_id=8,
        comment="Such a well-balanced, sweet, and mellow oolong! ",
        rating=5
    )
    review13 = Review(
        user_id=3,
        product_id=8,
        comment="Love Ruby Oolong, I have been a devoted tea lover for years. The rich flavor is wonderful.",
        rating=5
    )
    review14 = Review(
        user_id=4,
        product_id=8,
        comment="I really like the ball rolled Ruby Oolong tea and I can get three to five cups with one serving. In the afternoon, the Ruby Oolong offers me great flavor and it's a nice pick-me-up for the day.",
        rating=4
    )
    review15 = Review(
        user_id=6,
        product_id=9,
        comment="I love Jade cloud. A really good green.",
        rating=5
    )
    review16 = Review(
        user_id=5,
        product_id=9,
        comment="I enjoyed this tea on my first cup. It has a nice light flavor and smooth finish.",
        rating=5
    )
    review17 = Review(
        user_id=4,
        product_id=10,
        comment="If you are looking for a delicate white tea, laced with rose flavor, this should be your go-to drink.",
        rating=5
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review9)
    db.session.add(review10)
    db.session.add(review11)
    db.session.add(review12)
    db.session.add(review13)
    db.session.add(review14)
    db.session.add(review15)
    db.session.add(review16)
    db.session.add(review17)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
