from flask import Blueprint, render_template
from .__init__ import *

dashboard = Blueprint('views', __name__)

#used to do CRUD for user to enter thier premiers reading challange books. 

@dashboard.route("/")
@dashboard.route('/home')
def home():
    return render_template('auth/index.html')

@dashboard.route('/about')
@login_required
def about():
    return render_template('dashboard/about.html')
