from app.database.db_handles import nOfRecords, returnAllFromEntries, returnDataFromEntries
import sqlite3

from werkzeug.utils import redirect
from app.database import db_var
from sqlite3.dbapi2 import Cursor
from flask import Blueprint, render_template
from flask.globals import request, session
from .entry_form import EntryForm
import datetime
from app.database.db_handles import libquery, nOflibs
from flask import Flask, render_template, request, redirect, Blueprint
import datetime
dashboard = Blueprint('views', __name__)

#used to do CRUD for user to enter thier premiers reading challange books. 



@dashboard.route('/about')
def about():
    return render_template('dashboard/about.html',Dashboard_Url='/dashboard/'+session['username'])


@dashboard.route('/dashboard')
def main():

    return render_template(
        'dashboard/main.html',

        latest_book = returnDataFromEntries('Booktitle'),

        when_read = returnDataFromEntries('Dateofaccess'),

        number_of_books = returnDataFromEntries('Numberofhours'),

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
            return redirect('/dashboard')

    else:
        form = EntryForm()
        current_datevar = datetime.datetime.now()
        current_date = f"today's date is : {current_datevar.day}/{current_datevar.month}/{current_datevar.year}"
        return render_template('dashboard/entry.html', form=form, current_date=current_date , Dashboard_Url='/dashboard/'+session['username'])


@dashboard.route('/list')
def list():
    Entryid = nOfRecords()
    bookTitle = returnAllFromEntries('bookTitle')

    bookAuthor = returnAllFromEntries('bookAuthor')
    genre = returnAllFromEntries('Genre')
    libraryName = returnAllFromEntries('Libraryname')
    dateOfAcess = returnAllFromEntries('Dateofaccess')
    Numberofhours = returnAllFromEntries('Numberofhours')
    Numberofpages = returnAllFromEntries('Numberofpages')

        
    return render_template('dashboard/list.html',
    Entryid = Entryid ,
    date = dateOfAcess, 
    booktitle = bookTitle, 
    bookAuthor = bookAuthor,
    genre = genre,
    libraryName = libraryName,
    Numberofhours = Numberofhours,
    Numberofpages = Numberofpages,

    )

@dashboard.route('/library', methods=["GET", "POST"])
def library():
    if request.method == "POST":
        form = EntryForm()
        postcodevar  = request.form['postcode']
        Entryid = (nOflibs(postcodevar)-1)
        return render_template(
            "library/library.html",
            form = form,
            dataisentered=True ,
            Entryid=Entryid ,
            postcode = postcodevar,
            BranchName         =  libquery(postcodevar,'Branch Name'         ),
            WiFiAvailability   =  libquery(postcodevar,'WiFi Availability'   ),
            AddressLine1       =  libquery(postcodevar,'Address Line 1'       ),
            Postcode           =  libquery(postcodevar,'Adress Postcode'    ),
            Contact            =  libquery(postcodevar,'Contact'            ),
            BranchManagerName  =  libquery(postcodevar,'Branch Manager Name'  ),
            BranchManagerEmail =  libquery(postcodevar,'Branch Manager Email' ),
            Phone              =  libquery(postcodevar,'Phone'              ),
            Monday             =  libquery(postcodevar,'Monday'             ),
            Tuesday            =  libquery(postcodevar,'Tuesday'            ),
            Wednesday          =  libquery(postcodevar,'Wednesday'          ),
            Thursday           =  libquery(postcodevar,'Thursday'           ),
            Friday             =  libquery(postcodevar,'Friday'             ),
            Saturday           =  libquery(postcodevar,'Saturday'           ),
            Sunday             =  libquery(postcodevar,'Sunday'             ),
            )
    else:
        form = EntryForm()
        return render_template("library/library.html",form=form,dataisentered=False)

@dashboard.route("/debug")
def debug():
    BranchName =  libquery("4212",'BranchName'),

    return str(BranchName)