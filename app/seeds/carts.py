from app.models import db, Cart, environment, SCHEMA
from sqlalchemy.sql import text

def seed_carts():
    # cart1 = Cart(
    #     user_id=1,
    #     product_id=1,
    #     qty=2
    # )
    # cart2 = Cart(
    #     user_id=1,
    #     product_id=2,
    #     qty=1
    # )
    cart3 = Cart(
        user_id=2,
        product_id=4,
        qty=1
    )
    cart4 = Cart(
        user_id=3,
        product_id=5,
        qty=1
    )


    # db.session.add(cart1)
    # db.session.add(cart2)
    db.session.add(cart3)
    db.session.add(cart4)
    db.session.commit()

def undo_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM carts"))

    db.session.commit()
