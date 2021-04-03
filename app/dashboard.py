from flask import Blueprint, render_template
from flask.globals import session
from .__init__ import *

dashboard = Blueprint('views', __name__)

#used to do CRUD for user to enter thier premiers reading challange books. 

@dashboard.route('/about')
def about():
    return render_template('dashboard/about.html')

@dashboard.route('/dashboard')
def main():
    return render_template('dashboard/main.html')

# @dashboard.route('/entry')
# def entry():
#     return render_template('dashboard/about.html')

@dashboard.route('/list')
def list():
    return render_template('dashboard/about.html')