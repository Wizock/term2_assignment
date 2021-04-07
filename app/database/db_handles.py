import os, sqlite3
import csv

from flask.globals import session
from .__init__ import DBLOCATION, db_var

def register_user(email, username, password, password2):
  try:
    db = db_var()
    db.execute("INSERT INTO users (email, username, password) VALUES(?,?,?)",(email,username,password))
    db.commit() and db.close()
  except sqlite3.OperationalError as e:
      print(e)

def authenticate(email, password):
  try:
    db = db_var()
    login_flag = db.execute("SELECT email, password FROM users WHERE email = ? AND password = ?",(email, password))
    if login_flag == False or None:
      return False
    else:
      return True
  except sqlite3.OperationalError as e:
      print(e)


def return_user(email,password):
  db = db_var()
  curs = db.cursor()
  curs.execute(''' SELECT username FROM users WHERE email = ? AND password = ? ''',(email, password))
  g = curs.fetchone()
  return g[0]

def return_id(email,password):
  db = db_var()
  curs = db.cursor()
  curs.execute(''' SELECT id FROM users WHERE email = ? AND password = ? ''',(email, password))
  g = curs.fetchone()
  return g[0]

      


def latest_book():
  
  db = db_var()
  curs = db.cursor()
  curs.execute(''' SELECT Booktitle FROM Entries WHERE CreatorID = (SELECT MAX (?) FROM Entries)  ''',(str(session['userid'])))
  g = curs.fetchone()
  return g[::1]

def when_read():
  id = session['userid']
  db = db_var()
  curs = db.cursor()
  curs.execute(''' SELECT Dateofaccess FROM Entries WHERE CreatorID = (SELECT MAX (?) FROM Entries) ''',(str(session['userid'])))
  g = curs.fetchone()
  return g[0]

def number_of_books():
  id = session['userid']
  db = db_var()
  curs = db.cursor()
  curs.execute(''' SELECT Numberofhours FROM Entries WHERE CreatorID = (SELECT MAX (?) FROM Entries)  ''',(str(session['userid'])))
  g = curs.fetchone()
  return g[::1]