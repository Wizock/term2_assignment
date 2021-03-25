from flask import Blueprint, render_template

dashboard = Blueprint('views', __name__)

#used to do CRUD for user to enter thier premiers reading challange books. 

@dashboard.route("/")
@dashboard.route('/home')
def home():
    return render_template('auth/index.html')

@dashboard.route('/about')
def about():
    return render_template('dashboard/about.html')
