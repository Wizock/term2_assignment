from flask_wtf import FlaskForm
from wtforms import *
from wtforms.validators import DataRequired

class EntryForm(FlaskForm):
    
    title       = StringField('title')
    Bookauthor  = StringField('authors')
    Genre       = StringField('genre' )
    Library     = StringField('library')
    Date_of_ac  = DateTimeField('date_read')
    n_hrs       = IntegerField('hours')
    n_pages     = IntegerField('pages')
    remember_me = BooleanField('Remember Me')
    postcode = StringField('postcode')
    submit      = SubmitField('Complete entry')
    


    
