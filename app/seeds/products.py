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
        primary_img='https://capstone-aromatea.s3.us-west-1.amazonaws.com/EarlGreySupreme-1.jpg',
        secondary_img='https://capstone-aromatea.s3.us-west-1.amazonaws.com/EarlGreySupreme-2.jpg'
    )


##################################################################
    product2 = Product(
        user_id=2,
        category=CategoryEnum.BOTANICAL,
        name='Cinnamon Plum',
        description='A warming and sweet blend combining the succulent flavors of sun ripened plums, forest red currants and tangy hibiscus with festive Saigon cinnamon.',
        price=12.45,
        size=ProductSize.QUARTER_POUND,
        primary_img='https://capstone-aromatea.s3.us-west-1.amazonaws.com/CinnamonPlum-1.jpg',
        secondary_img='https://capstone-aromatea.s3.us-west-1.amazonaws.com/CinnamonPlum-2.jpg'
    )



#############################################################
    product3 = Product(
        user_id=3,
        category=CategoryEnum.GREEN,
        name='Jasmine',
        description='A super fine jasmine green tea scented and elegant sweetness.',
        price=47.25,
        size=ProductSize.ONE_POUND,
        primary_img='https://capstone-aromatea.s3.us-west-1.amazonaws.com/JasmineGreenTea-1.jpg',
        secondary_img='https://capstone-aromatea.s3.us-west-1.amazonaws.com/JasmineGreenTea-2.jpg'
    )


##############################################################
    product4 = Product(
        user_id=6,
        category=CategoryEnum.OOLONG,
        name='Tropical Coconut',
        description='Tropical Coconut combines floral and delicately sweet Bao Zhong oolong tea with real juicy pineapple and creamy coconut.',
        price=22.05,
        size=ProductSize.QUARTER_POUND,
        primary_img='https://capstone-aromatea.s3.us-west-1.amazonaws.com/TropicalCoconut-1.jpg',
        secondary_img='https://capstone-aromatea.s3.us-west-1.amazonaws.com/TropicalCoconut-2.jpg'
    )


#################################################
    product5 = Product(
        user_id=2,
        category=CategoryEnum.WHITE,
        name='Silver Needles',
        description='Widely esteemed for its delicate appearance, elegant sweetness and noble character, Silver Needles tea is comprised of pure, individually plucked tea buds harvested only in the early springtime.',
        price=163.85,
        size=ProductSize.ONE_POUND,
        primary_img='https://capstone-aromatea.s3.us-west-1.amazonaws.com/SilverNeedles-1.jpg',
        secondary_img='https://capstone-aromatea.s3.us-west-1.amazonaws.com/SilverNeedles-2.jpg'
    )

#################################################
    product6 = Product(
        user_id=4,
        category=CategoryEnum.BLACK,
        name='English Breakfast',
        description='This English Breakfast is malty and robust with sweet, chocolatey undertones and a brisk body that can stand up to milk and sugar.',
        price=39.9,
        size=ProductSize.ONE_POUND,
        primary_img='https://capstone-aromatea.s3.us-west-1.amazonaws.com/EnglishBreakfast-1.jpg',
        secondary_img='https://capstone-aromatea.s3.us-west-1.amazonaws.com/EnglishBreakfast-2.jpg'
    )

#################################################
    product7 = Product(
        user_id=5,
        category=CategoryEnum.BOTANICAL,
        name='Turmeric Ginger',
        description='The awesome, centering energy of golden turmeric root is enhanced by strengthening licorice root and zesty ginger in this Ayurveda inspired blend.',
        price=15.75,
        size=ProductSize.QUARTER_POUND,
        primary_img='https://capstone-aromatea.s3.us-west-1.amazonaws.com/TurmericGinger-1.jpg',
        secondary_img='https://capstone-aromatea.s3.us-west-1.amazonaws.com/TurmericGinger-2.jpg'
    )

#################################################
    product8 = Product(
        user_id=6,
        category=CategoryEnum.OOLONG,
        name='Ruby Oolong',
        description='This full-bodied oolong tea is deeply oxidized and slowly baked to bring out complex layers of cacao, raisins, and black cherry with a sublime, elegant structure.',
        price=40.35,
        size=ProductSize.QUARTER_POUND,
        primary_img='https://capstone-aromatea.s3.us-west-1.amazonaws.com/RubyOolong-1.jpg',
        secondary_img='https://capstone-aromatea.s3.us-west-1.amazonaws.com/RubyOolong-2.jpg'
    )

#################################################
    product9 = Product(
        user_id=4,
        category=CategoryEnum.GREEN,
        name='Jade Cloud',
        description='Jade Cloud is a lively green tea that we created over a decade ago in collaboration with artisans at the Xuan En Organic Yisheng Tea Cooperative in the remote mountains of Hubei province.',
        price=44.15,
        size=ProductSize.ONE_POUND,
        primary_img='https://capstone-aromatea.s3.us-west-1.amazonaws.com/JadeCloud-1.jpg',
        secondary_img='https://capstone-aromatea.s3.us-west-1.amazonaws.com/JadeCloud-2.jpg'
    )

#################################################
    product10 = Product(
        user_id=5,
        category=CategoryEnum.WHITE,
        name='White Tea Rose',
        description='This white tea blend features a base of White Peony and presents a fresh floral bouquet with a bright minty finish.',
        price=22.05,
        size=ProductSize.QUARTER_POUND,
        primary_img='https://capstone-aromatea.s3.us-west-1.amazonaws.com/WhiteTeaRoseMelange-1.jpg',
        secondary_img='https://capstone-aromatea.s3.us-west-1.amazonaws.com/WhiteTeaRoseMelange-2.jpg'
    )

#################################################
    product11 = Product(
        user_id=7,
        category=CategoryEnum.BOTANICAL,
        name='Blueberry Rooibos',
        description='Robust flavor of rooibos with fruity notes of elderberries, blueberries and hibiscus to create a tart yet sweet herbal blend.',
        price=18.90,
        size=ProductSize.QUARTER_POUND,
        primary_img='https://capstone-aromatea.s3.us-west-1.amazonaws.com/BlueberryRooibos.jpg',
        secondary_img='https://capstone-aromatea.s3.us-west-1.amazonaws.com/BlueberryRooibos2.jpg'
    )

#################################################
    product12 = Product(
        user_id=7,
        category=CategoryEnum.BLACK,
        name='Masala Chai',
        description='Hot and citrusy ginger and sweet cinnamon, with accents of pungent cracked black pepper and fragrant cloves.',
        price=39.90,
        size=ProductSize.ONE_POUND,
        primary_img='https://capstone-aromatea.s3.us-west-1.amazonaws.com/MasalaChai.jpg',
        secondary_img='https://capstone-aromatea.s3.us-west-1.amazonaws.com/MasalaChai2.jpg'
    )

#################################################
    product13 = Product(
        user_id=7,
        category=CategoryEnum.OOLONG,
        name='Iron Goddess of Mercy',
        description="Hand-crafted twice each year, in spring and winter, by a fourth-generation artisan oolong teamaker in Mingjian Village in Taiwan's central Nantou county.",
        price=63.00,
        size=ProductSize.ONE_POUND,
        primary_img='https://capstone-aromatea.s3.us-west-1.amazonaws.com/IronGoddeessofMercy.jpg',
        secondary_img='https://capstone-aromatea.s3.us-west-1.amazonaws.com/IronGoddessofMercy2.jpg'
    )

#################################################
    product14 = Product(
        user_id=7,
        category=CategoryEnum.GREEN,
        name='Jasmine Pearls',
        description='Jasmine Pearls are a treasure for lovers of floral teas. Delicately sweet and refreshing with a beautiful aromatic finish.',
        price=79.70,
        size=ProductSize.QUARTER_POUND,
        primary_img='https://capstone-aromatea.s3.us-west-1.amazonaws.com/JasminePearls.jpg',
        secondary_img='https://capstone-aromatea.s3.us-west-1.amazonaws.com/JasminePearls2.jpg'
    )


#################################################
    product15 = Product(
        user_id=7,
        category=CategoryEnum.BOTANICAL,
        name='Hibiscus Berry',
        description='Hibiscus Berry makes a great fruity base for sangria and is wonderful served with an orange wheel garnish over ice for a sugar-free fruit punch.',
        price=39.90,
        size=ProductSize.ONE_POUND,
        primary_img='https://capstone-aromatea.s3.us-west-1.amazonaws.com/HibiscusBerry.jpg',
        secondary_img='https://capstone-aromatea.s3.us-west-1.amazonaws.com/HibiscusBerry2.jpg'
    )


    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)
    db.session.add(product7)
    db.session.add(product8)
    db.session.add(product9)
    db.session.add(product10)
    db.session.add(product11)
    db.session.add(product12)
    db.session.add(product13)
    db.session.add(product14)
    db.session.add(product15)

    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
