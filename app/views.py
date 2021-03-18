import sqlite3
import os
from flask_login import LoginManager
from flask import Flask, render_template, request, redirect, login_required
from db_handles import *
from flask.helpers import flash

@app.route("/")
@app.route('/home')
@login_required 
def home():
    return render_template('index.html')


@app.route('/login', methods=("GET", "POST"))
def login():
    
    if request.method == "GET":
        email = request.form['email']
        password = request.form['password']
        db = db_var()
        check_email = db.execute("SELECT * FROM users WHERE email= ?",(email))
        check_password = db.execute("SELECT * FROM users WHERE password = ?",(password))
        if email == check_email and password == check_password:
            login_user(email, password)
            flash("you were sucessfully logged in")
    else:
        return render_template('login.html')

@app.route('/reg', methods=("GET", "POST"))
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
        return render_template('register.html', title="login")