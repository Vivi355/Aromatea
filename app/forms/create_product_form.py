from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SelectField, FloatField, SubmitField
from wtforms.validators import DataRequired, Length, URL
from app.models import Product, ProductSize, CategoryEnum



class CreateProductForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(min=3, max=200)])
    category = SelectField('Type', choices=[(category.name, category.value) for category in CategoryEnum])
    description = TextAreaField('Add a description', validators=[DataRequired(), Length(min=5, max=2000)])
    primary_img = StringField('Image URL', validators=[DataRequired(), URL()])
    secondary_img = StringField('Image URL', validators=[URL()])
    size = SelectField('Size', choices=[(choice.name, choice.value) for choice in ProductSize])
    price = FloatField('Price', validators=[DataRequired()])

    submit = SubmitField('Submit')
