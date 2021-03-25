from app.database.db_handles import db_var, login_user, register_user
from flask import Flask, render_template, request, redirect, Blueprint
from flask.helpers import flash
from .database import *

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=("GET", "POST"))
def login():
    
    if request.method == "POST":
        email = request.form['email']
        password = request.form['password']
        db = db_var()
        check_email = db.execute("SELECT * FROM users WHERE email= ?",(email))
        check_password = db.execute("SELECT * FROM users WHERE password = ?",(password))
        if email == check_email and password == check_password:
            if login_user(email, password) == True:
                flash("you were successfully logged in")
            else:
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