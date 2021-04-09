from app.database.db_handles import stat_returns
import sqlite3

from werkzeug.utils import redirect
from app.database import db_var
from sqlite3.dbapi2 import Cursor
from flask import Blueprint, render_template
from flask.globals import request, session
from .entry_form import EntryForm
import datetime

dashboard = Blueprint('views', __name__)

#used to do CRUD for user to enter thier premiers reading challange books. 



@dashboard.route('/about')
def about():
    return render_template('dashboard/about.html',Dashboard_Url='/dashboard/'+session['username'])


@dashboard.route('/dashboard/<user>')
def main(user):
    return_inst = stat_returns()
    return render_template(
        'dashboard/main.html',

        latest_book = return_inst.latest_book(),

        when_read = return_inst.when_read(),

        number_of_books = return_inst.number_of_books(),

        Dashboard_Url = '/dashboard/'+session['username'],

        username = session['username']
     )


@dashboard.route('/Entry', methods=("GET", "POST"))
def entry():

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
        dbc = db.cursor()
        try:
            dbc.execute('''
        INSERT INTO Entries (Booktitle,Bookauthor,Libraryname,Genre,Dateofaccess,Numberofhours,Numberofpages,CreatorID) VALUES(?,?,?,?,?,?,?,?)
        ''',(title, Bookauthor, Genre, Library, Date_of_ac, n_hrs, n_pages,session['userid'])
        )
        except sqlite3.OperationalError as e:
            return str(e)
        else:
            db.commit()
            db.close()
            return redirect('/dashboard/'+session['username'])

    else:
        form = EntryForm()
        current_datevar = datetime.datetime.now()
        current_date = f"today's date is : {current_datevar.day}/{current_datevar.month}/{current_datevar.year}"
        return render_template('dashboard/entry.html', form=form, current_date=current_date , Dashboard_Url='/dashboard/'+session['username'])


@dashboard.route('/list')
def list():
    return render_template('dashboard/about.html')