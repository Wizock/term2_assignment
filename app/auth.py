from flask.globals import session
from app.database import db_handles
from app.database.db_handles import db_var, authenticate, register_user
from flask import Flask, render_template, request, redirect, Blueprint
from flask.helpers import flash
from .database import *

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=("GET", "POST"))
def login():
    if session['logged_in'] == 'False':
        if request.method == "POST":
            email = request.form['email']
            password = request.form['password']
            print(f"email:{email} password:{password}")
            db = db_var()
            check_email = db.execute("SELECT * FROM users WHERE email= ?",(email,))
            check_password = db.execute("SELECT * FROM users WHERE password = ?",(password,))
            print(f"check_email:{check_email} check_password:{check_password}")
            print('database shit is happened')

            if authenticate(email, password) == True:
                session['username'] = f"{email}"
                session['logged_in'] = 'True'
                flash("you were successfully logged in")
                return redirect('/dashboard')
            else:
                session['logged_in'] = 'False'
                flash("There was a error while logging in, please try again.")
        else:
            return render_template('auth/login.html')
    else:
        return redirect('/about')

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
def logout():
    if session['logged_in'] == "True":
        session['logged_in'] = 'False'
        return redirect('/')
    elif session['logged_in'] == "False":
        return redirect('/list')

@auth.route("/")
@auth.route('/index')
def index():
    if session['logged_in'] == "True":
        return redirect('/about')
    return render_template('auth/index.html')

@auth.route('/deb')
def debug():
    return f"{session['username']} and {session['logged_in']}"