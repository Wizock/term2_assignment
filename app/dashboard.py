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
        else:
            form = EntryForm()
            return render_template('dashboard/entry.html', form=form)
    else:
        return redirect('/login')

@dashboard.route('/list')
def list():
    return render_template('dashboard/about.html')