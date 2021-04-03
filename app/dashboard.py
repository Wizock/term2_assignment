from sqlite3.dbapi2 import Cursor
from flask import Blueprint, render_template
from flask.globals import session
from .entry_form import EntryForm
from .__init__ import *

dashboard = Blueprint('views', __name__)

#used to do CRUD for user to enter thier premiers reading challange books. 

@dashboard.route('/about')
def about():
    return render_template('dashboard/about.html')

@dashboard.route('/dashboard')
def main():
    return render_template('dashboard/main.html')

@dashboard.route('/Entry', methods=("GET", "POST"))
def entry():
    if session['logged_in'] == "True":
        if request.method == 'POST':
            form = EntryForm()

            title      = request.form['title']
            Bookauthor = request.form['Bookauthor']
            Genre      = request.form['Genre']
            Library    = request.form['Library']
            Date_of_ac = request.form['Date_of_ac']
            n_hrs      = request.form['n_hrs']
            n_pages    = request.form['n_pages']

            db = db_var()
            try:
                db.execute('''
            INSERT INTO users (Booktitle,Bookauthor,Library,Genre,Dateofaccess,Numberofhours,Numberofpages) VALUES(?,?,?,?,?,?,?)
            ''',(title, Bookauthor, Genre, Library, Date_of_ac, n_hrs, n_pages)
            )
            except sqlite3.OperationalError as e:
                return e
            else:
                return redirect('/dashboard')

        else:
            form = EntryForm()
            return render_template('dashboard/entry.html', form=form)
            
    else:
        return redirect('/login')

@dashboard.route('/list')
def list():
    return render_template('dashboard/about.html')