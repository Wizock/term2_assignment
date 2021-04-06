import os, sqlite3
import csv
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