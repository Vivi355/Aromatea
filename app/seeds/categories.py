# from app.models import db, Category, environment, SCHEMA
# from sqlalchemy.sql import text

# def seed_categories():
#     black = Category(name='Black')
#     green = Category(name='Green')
#     white = Category(name='White')
#     botanical = Category(name='Botanical')
#     oolong = Category(name='Oolong')


#     db.session.add(black)
#     db.session.add(green)
#     db.session.add(white)
#     db.session.add(botanical)
#     db.session.add(oolong)
#     db.session.commit()


# def undo_categories():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM categories"))

#     db.session.commit()
