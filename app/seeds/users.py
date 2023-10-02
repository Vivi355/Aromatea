from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='User', email='demo@aa.io', password='password')
    marnie = User(
        first_name='Marnie', last_name='Smith', email='marnie@aa.io', password='password2')
    bobbie = User(
        first_name='Bobbie', last_name='Doe', email='bobbie@aa.io', password='password3')
    kathrine = User(
        first_name='Kathrine', last_name='Smith', email='kathrine@aa.io', password='password4')
    jane = User(
        first_name='Jane', last_name='Wilson', email='jane@aa.io', password='password5')
    scott = User(
        first_name='Scott', last_name='Cooper', email='scott@aa.io', password='password6')
    vivi = User(
        first_name='Vivi', last_name='Lii', email='vivi@aa.io', password='mysite')



    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(kathrine)
    db.session.add(jane)
    db.session.add(scott)
    db.session.add(vivi)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
