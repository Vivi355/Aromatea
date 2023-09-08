from app.models import db, Product, ProductSize, CategoryEnum, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    product1 = Product(
        user_id=1,
        category=CategoryEnum.BLACK,
        name='Earl Grey',
        description='A special reserve for Earl Grey lovers, top grades of Yunnan Dianhong black tea with the essential oil pressed from real bergamot citrus fruits.',
        price=51.45,
        size=ProductSize.ONE_POUND,
        primary_img='https://cdn.discordapp.com/attachments/1134917911941742615/1149069118125920396/Rishi-PDP-Carousel-EarlGreySupreme-TC_1500x.jpg',
        secondary_img='https://cdn.discordapp.com/attachments/1134917911941742615/1149070093200937070/Rishi-PDP-Carousel-EarlGreySupreme-LS-1_1500x.jpg'
    )


##################################################################
    product2 = Product(
        user_id=2,
        category=CategoryEnum.BOTANICAL,
        name='Cinnamon Plum',
        description='A warming and sweet blend combining the succulent flavors of sun ripened plums, forest red currants and tangy hibiscus with festive Saigon cinnamon.',
        price=12.45,
        size=ProductSize.QUARTER_POUND,
        primary_img='https://cdn.discordapp.com/attachments/1134917911941742615/1149073470387396608/Rishi-PDP-Carousel-CinnamonPlum-TC_1500x.jpg'
    )



#############################################################
    product3 = Product(
        user_id=3,
        category=CategoryEnum.GREEN,
        name='Jasmine',
        description='A super fine jasmine green tea scented and elegant sweetness.',
        price=47.25,
        size=ProductSize.ONE_POUND,
        primary_img='https://cdn.discordapp.com/attachments/1134917911941742615/1149075590310281266/Rishi-PDP-Carousel-JasmineGreenTea-TC_1500x.jpg'
    )


##############################################################
    product4 = Product(
        user_id=1,
        category=CategoryEnum.OOLONG,
        name='Tropical Coconut',
        description='Tropical Coconut combines floral and delicately sweet Bao Zhong oolong tea with real juicy pineapple and creamy coconut.',
        price=22.05,
        size=ProductSize.QUARTER_POUND,
        primary_img='https://cdn.discordapp.com/attachments/1134917911941742615/1149076899293839390/Rishi-PDP-Carousel-TropicalCoconut-TC_1500x.jpg',
    )


#################################################
    product5 = Product(
        user_id=2,
        category=CategoryEnum.WHITE,
        name='Silver Needles',
        description='Widely esteemed for its delicate appearance, elegant sweetness and noble character, Silver Needles tea is comprised of pure, individually plucked tea buds harvested only in the early springtime.',
        price=163.85,
        size=ProductSize.ONE_POUND,
        primary_img='https://cdn.discordapp.com/attachments/1134917911941742615/1149077775693664266/Rishi-PDP-Carousel-SilverNeedles-TC_1500x.jpg',
    )


    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)

    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
