from flask import Blueprint, render_template

dashboard = Blueprint('views', __name__)

@dashboard.route("/")
@dashboard.route('/home')

def home():
    return render_template('index.html')