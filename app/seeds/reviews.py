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
        user_id=4,
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
    review18 = Review(
        user_id=4,
        product_id=11,
        comment="A wonderful tea, refreshing when served either hot or cold.",
        rating=5
    )
    review19 = Review(
        user_id=3,
        product_id=11,
        comment="The Blueberry Rooibos is my #1 pick. It not only smells amazing, but it's such a tasty treat.",
        rating=5
    )
    review20 = Review(
        user_id=2,
        product_id=11,
        comment="This makes the best iced tea I have ever had.",
        rating=5
    )
    review21 = Review(
        user_id=5,
        product_id=11,
        comment="The blueberry rooibos is so aromatic and delicious and fresh. One tablespoon is enough for 12 ounces of robust and satisfying tea.",
        rating=5
    )
    review22 = Review(
        user_id=6,
        product_id=12,
        comment="Love it - never disappoints.",
        rating=5
    )
    review23 = Review(
        user_id=4,
        product_id=12,
        comment="My favorite morning tea by far!",
        rating=5
    )
    review24 = Review(
        user_id=2,
        product_id=12,
        comment="I love the organic loose leaf chai. I have been ordering it for more than 3 years.",
        rating=5
    )
    review25 = Review(
        user_id=6,
        product_id=13,
        comment="Love, love, love this tea! Aromatea has made me a regular tea drinker.",
        rating=5
    )
    review26 = Review(
        user_id=4,
        product_id=13,
        comment="This is my absolute favorite tea. I never want to be out of it.",
        rating=5
    )
    review27 = Review(
        user_id=5,
        product_id=13,
        comment="This is absolutely my favorite tea. I cold brew or hot brew it.",
        rating=5
    )
    review28 = Review(
        user_id=2,
        product_id=13,
        comment="This oolong tea is different from the ones I have tried before, but very nice! It has a dry, fruity taste, but savory rather than sweet or floral.",
        rating=5
    )
    review29 = Review(
        user_id=2,
        product_id=14,
        comment="I love all kinds of tea, but Jasmine Pearl is by far my favorite.",
        rating=5
    )
    review30 = Review(
        user_id=3,
        product_id=14,
        comment="Great Jasmine Tea. Delicious and refreshingly light flavor.",
        rating=5
    )
    review31 = Review(
        user_id=5,
        product_id=14,
        comment="I will definitely be ordering more!! Taste so good.",
        rating=5
    )
    review32 = Review(
        user_id=6,
        product_id=14,
        comment="beautiful experience to share with my family",
        rating=5
    )
    review33 = Review(
        user_id=3,
        product_id=15,
        comment="Makes an excellent ice tea. One of my favorites.",
        rating=5
    )
    review34 = Review(
        user_id=5,
        product_id=15,
        comment="The most amazing tea I've ever had! Love I simply love it!",
        rating=5
    )
    review35 = Review(
        user_id=6,
        product_id=15,
        comment="This tea is well balanced and refreshing.",
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
    db.session.add(review18)
    db.session.add(review19)
    db.session.add(review20)
    db.session.add(review21)
    db.session.add(review22)
    db.session.add(review23)
    db.session.add(review24)
    db.session.add(review25)
    db.session.add(review26)
    db.session.add(review27)
    db.session.add(review28)
    db.session.add(review29)
    db.session.add(review30)
    db.session.add(review31)
    db.session.add(review32)
    db.session.add(review33)
    db.session.add(review34)
    db.session.add(review35)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
