from flask_wtf import FlaskForm
from wtforms import Form, FormField, FieldList, StringField, IntegerField, TextAreaField, SelectField, FloatField, SubmitField
from wtforms.validators import DataRequired, Length, URL
from app.models import Product, ProductSize


class VariantForm(Form):
    size = SelectField('Size', choices=[(size.value, size.value) for size in ProductSize])
    price = FloatField('Price', validators=[DataRequired()])

class CreateProductForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(min=3, max=200)])
    description = TextAreaField('Add a description', validators=[DataRequired()])
    # primary_img = StringField('Image URL', validators=[DataRequired(), URL()])
    primary_img = StringField('Image URL')
    # secondary_img = StringField('Image URL', validators=[URL()])
    secondary_img = StringField('Image URL')

    variants = FieldList(FormField(VariantForm))
    # variants
    # size = SelectField('Size', choices=[(size.name, size.value) for size in ProductSize])
    # price = FloatField('Price', validators=[DataRequired()])

    submit = SubmitField('Submit')
