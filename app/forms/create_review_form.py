from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange

class CreateReviewForm(FlaskForm):
    comment = TextAreaField('Add your review here...', validators=[DataRequired(), Length(min=3, max=200)])
    rating = IntegerField('Star Rating', validators=[DataRequired(), NumberRange(min=1, max=5)])
    submit = SubmitField('Submit')
