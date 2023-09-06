from app.models import db, Product, ProductSize, ProductVariant, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    product1 = Product(
        user_id=1,
        category_id=1,
        name='Earl Grey',
        description='A special reserve for Earl Grey lovers, top grades of Yunnan Dianhong black tea with the essential oil pressed from real bergamot citrus fruits.',
        primary_img='https://cdn.discordapp.com/attachments/1134917911941742615/1149069118125920396/Rishi-PDP-Carousel-EarlGreySupreme-TC_1500x.jpg',
        secondary_img='https://cdn.discordapp.com/attachments/1134917911941742615/1149070093200937070/Rishi-PDP-Carousel-EarlGreySupreme-LS-1_1500x.jpg'
    )

    variant1_1 = ProductVariant(
        product=product1,
        size=ProductSize.ONE_POUND,
        price=51.45
    )

    variant1_2 = ProductVariant(
        product=product1,
        size=ProductSize.QUARTER_POUND,
        price=18.45
    )

##################################################################
    product2 = Product(
        user_id=2,
        category_id=4,
        name='Cinnamon Plum',
        description='A warming and sweet blend combining the succulent flavors of sun ripened plums, forest red currants and tangy hibiscus with festive Saigon cinnamon.',
        primary_img='https://cdn.discordapp.com/attachments/1134917911941742615/1149073470387396608/Rishi-PDP-Carousel-CinnamonPlum-TC_1500x.jpg'
    )

    variant2_1 = ProductVariant(
        product=product2,
        size=ProductSize.ONE_POUND,
        price=30.45
    )

    variant2_2 = ProductVariant(
        product=product2,
        size=ProductSize.QUARTER_POUND,
        price=12.45
    )

#############################################################
    product3 = Product(
        user_id=3,
        category_id=2,
        name='Jasmine',
        description='A super fine jasmine green tea scented and elegant sweetness.',
        primary_img='https://cdn.discordapp.com/attachments/1134917911941742615/1149075590310281266/Rishi-PDP-Carousel-JasmineGreenTea-TC_1500x.jpg'
    )
    variant3_1 = ProductVariant(
        product=product3,
        size=ProductSize.ONE_POUND,
        price=47.25
    )

    variant3_2 = ProductVariant(
        product=product3,
        size=ProductSize.QUARTER_POUND,
        price=17.85
    )

##############################################################
    product4 = Product(
        user_id=1,
        category_id=5,
        name='Tropical Coconut',
        description='Tropical Coconut combines floral and delicately sweet Bao Zhong oolong tea with real juicy pineapple and creamy coconut.',
        primary_img='https://cdn.discordapp.com/attachments/1134917911941742615/1149076899293839390/Rishi-PDP-Carousel-TropicalCoconut-TC_1500x.jpg',
    )

    variant4_1 = ProductVariant(
        product=product4,
        size=ProductSize.ONE_POUND,
        price=57.75
    )

    variant4_2 = ProductVariant(
        product=product4,
        size=ProductSize.QUARTER_POUND,
        price=22.05
    )

#################################################
    product5 = Product(
        user_id=2,
        category_id=3,
        name='Silver Needles',
        description='Widely esteemed for its delicate appearance, elegant sweetness and noble character, Silver Needles tea is comprised of pure, individually plucked tea buds harvested only in the early springtime.',
        primary_img='https://cdn.discordapp.com/attachments/1134917911941742615/1149077775693664266/Rishi-PDP-Carousel-SilverNeedles-TC_1500x.jpg',
    )

    variant5_1 = ProductVariant(
        product=product5,
        size=ProductSize.ONE_POUND,
        price=163.85
    )

    variant5_2 = ProductVariant(
        product=product5,
        size=ProductSize.QUARTER_POUND,
        price=40.95
    )

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(variant1_1)
    db.session.add(variant1_2)
    db.session.add(variant2_1)
    db.session.add(variant2_2)
    db.session.add(variant3_1)
    db.session.add(variant3_2)
    db.session.add(variant4_1)
    db.session.add(variant4_2)
    db.session.add(variant5_1)
    db.session.add(variant5_2)

    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
