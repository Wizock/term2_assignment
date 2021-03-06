import datetime
from flask.globals import session
from app.database.db_handles import authenticate, register_user, return_id, return_user
from flask import render_template, request, redirect, Blueprint
from flask.helpers import flash

from .database import *

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=("GET", "POST"))
def login():
    
    if request.method == "POST":
        email = request.form['email']
        password = request.form['password']
        
        if authenticate(email, password) ==True :
            if return_user(email, password) or return_id(email, password) != None or 0:
                session['username'] = return_user(email, password)
                session['userid'] = return_id(email, password)
                return redirect('/dashboard')
            else:
                "<h1> you entered a wrong password or email. please click <a href='/l' > here </a> to try again </h1>"
                flash("There was a error while logging in, please try again.")
    else:
        return render_template('auth/login.html')


@auth.route('/reg', methods=("GET", "POST"))
def reg():
    if request.method == "POST":
        email = request.form['email']
        username = request.form['username']
        password = request.form['password']
        password2 = request.form['password2']

        if email is not None and username is not None:
            if password == password2 or password2 == password:
                register_user(email, username, password, password2)
                return redirect('/login')
    else:
        return render_template('auth/register.html', title="login")

@auth.route("/")
@auth.route('/index')
def index():
    return render_template('auth/index.html')

@auth.route('/logout')
def logout():
    session['userid'] == None
    return redirect("/")

@auth.route('/deb')
def debug():
    x = datetime.datetime.now()
    return str(x)