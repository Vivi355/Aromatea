from flask.cli import AppGroup
from .users import seed_users, undo_users
from .products import seed_products, undo_products
from .carts import seed_carts, undo_carts
from .reviews import seed_reviews, undo_reviews
from .wishlists import seed_wishlists, undo_wishlists

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_wishlists()
        undo_reviews()
        undo_carts()
        undo_products()
        undo_users()

    # Add other seed functions here
    seed_users()
    seed_products()
    seed_carts()
    seed_reviews()
    seed_wishlists()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_wishlists()
    undo_reviews()
    undo_carts()
    undo_products()
    undo_users()
    # Add other undo functions here
