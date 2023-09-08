from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SelectField, FloatField, SubmitField
from wtforms.validators import DataRequired, Length, URL
from app.models import Product, ProductSize

class CreateProductForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(min=3, max=200)])
    description = TextAreaField('Add a description', validators=[DataRequired()])
    primary_img = StringField('Image URL', validators=[DataRequired(), URL()])
    secondary_img = StringField('Image URL', validators=[URL()])

    # variants
    size = SelectField('Size', choices=[(size.name, size.value) for size in ProductSize], validators=[DataRequired()])
    price = FloatField('Price', validators=[DataRequired()]),

    submit = SubmitField('Submit')
