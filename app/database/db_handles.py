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
    curs = db.cursor()
    login_flag = curs.execute("SELECT email, password FROM users WHERE email = ? AND password = ?",(email, password))
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
  if g == None:
    return "No user"
  else:

    return g[0]

def return_id(email,password):
  db = db_var()
  curs = db.cursor()
  curs.execute(''' SELECT id FROM users WHERE email = ? AND password = ? ''',(email, password))
  g = curs.fetchone()
  if g == None:
    return "No user"
  else:

    return g[0]

def returnDataFromEntries(element):
  db = db_var()
  curs = db.cursor()
  curs.row_factory = lambda cursor, row: row[0]
  curs.execute(f''' SELECT {element} FROM Entries WHERE CreatorID = (SELECT MAX (?) FROM Entries)  ''',((str(session['userid']))))
  g = curs.fetchall()
  
  if len(g) < 1 | 0:
  
    return "You haven't read any books"
  else:
    return str(g[len(g) - 1]).strip("('',) '")

def returnAllFromEntries(element):
  db = db_var()
  curs = db.cursor()
  curs.row_factory = lambda cursor, row: row[0]
  return_list = []
  for var in curs.execute(f''' SELECT {element} FROM Entries WHERE CreatorID = ? ''',((str(session['userid'])))):
      return_list.append(var)
  return return_list


def nOfRecords():
  
  db = db_var()
  curs = db.cursor()
  curs.row_factory = lambda cursor, row: row[0]
  user = str(session['userid'])
  curs.execute(f'''SELECT COUNT(*)
                  FROM Entries WHERE CreatorID = ? ;''',(user))
  return curs.fetchone() 
  