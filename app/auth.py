from flask.globals import session
from app.database import db_handles
from app.database.db_handles import db_var, authenticate, register_user
from flask import Flask, render_template, request, redirect, Blueprint
from flask.helpers import flash
from .database import *
from .user import User
from .__init__ import return_login_var

from flask_login import login_user, login_required, logout_user, login_manager
return_login_var.login_view = '/login'

auth = Blueprint('auth', __name__)

# @login_manager.user_loader
# @auth.route('/deb-user', methods=("GET", "POST"))
# def load_user(id):
#     db = db_var()
#     c = db.execute("SELECT username from users where username = (?)", [id])
#     userrow = c.fetchone()
#     userid = userrow[0] 
#     return userid


@auth.route('/login', methods=("GET", "POST"))
def login():
    
    if request.method == "POST":
        email = request.form['email']
        password = request.form['password']
        user = User(email=email,password=password)

        if authenticate(email, password) == True:
            login_user(user)

            return redirect('/dashboard')
        else:
            session['logged_in'] = 'False'
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

@auth.route('/logout', methods=("GET", "POST"))
@login_required 
def logout():
    logout_user()
    return redirect('/')

@auth.route("/")
@auth.route('/index')
def index():
    return render_template('auth/index.html')


@auth.route('/deb')
def debug():
    return f"{session['username']} and {session['logged_in']}"