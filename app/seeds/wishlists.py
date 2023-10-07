from app.models import db, environment, SCHEMA, Wishlist
from sqlalchemy.sql import text

def seed_wishlists():

    list1 = Wishlist(
        product_id=2,
        user_id=1,
    )
    list2 = Wishlist(
        product_id=4,
        user_id=1,
    )
    list3 = Wishlist(
        product_id=6,
        user_id=1,
    )

    db.session.add(list1)
    db.session.add(list2)
    db.session.add(list3)
    db.session.commit()

def undo_wishlists():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.wishlists RESTART IDENTITY CASCADE;")
  else:
      db.session.execute(text("DELETE FROM wishlists"))

  db.session.commit()
