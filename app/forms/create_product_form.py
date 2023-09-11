from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, IntegerField, TextAreaField, SelectField, FloatField, SubmitField
from wtforms.validators import DataRequired, Length, Optional
from app.models import Product, ProductSize, CategoryEnum

from ..api.aws_helpers import ALLOWED_EXTENSIONS


class CreateProductForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(min=3, max=200)])
    category = SelectField('Type', choices=[(category.name, category.value) for category in CategoryEnum])
    description = TextAreaField('Add a description', validators=[DataRequired(), Length(min=5, max=2000)])
    # primary_img = StringField('Image URL', validators=[DataRequired(), URL()])
    primary_img = FileField('Image File', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    # secondary_img = StringField('Image URL', validators=[Optional(),URL()])
    secondary_img = FileField('Image File', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    size = SelectField('Size', choices=[(choice.name, choice.value) for choice in ProductSize])
    price = FloatField('Price', validators=[DataRequired()])

    submit = SubmitField('Submit')
