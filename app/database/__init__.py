import csv
import os
import sqlite3

BASE_DIR = os.path.abspath(os.path.dirname(__file__))  

DBLOCATION = os.path.join(BASE_DIR, 'database.db')

def db_var():
    try:
        con = sqlite3.connect(DBLOCATION)
    except sqlite3.OperationalError as e:
      if e.args[0].startswith('no such table'):
        exists = False
      else:
        raise
    return con

def create_table_users():
    con = db_var()
    try:
        con.execute('''
        CREATE TABLE users (
            id INTEGER PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL),
            "Book title" VARCHAR(255) NOT NULL ,
            "Book author VARCHAR(255) NOT NULL"  ,
            Genre TEXT NOT NULL,
            "Library name" VARCHAR(255) NOT NULL,
            Date of access" DATE NOT NULL ,
            "Number of hours spent on reading" INT NOT NULL ,
            Number of pages BIT NOT NULL,
            ''')
        con.commit()
        con.close()
    except Error as e:
        print(e)
    else:
        pass

def init_insert():
  con = db_var()
  cur = con.cursor()
  data = open(BASE_DIR+'\lib_data.csv')
  rows = csv.reader(data)
  cur.executemany('''
  INSERT INTO library VALUES (
    ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
    ,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  ''', rows)
  cur.execute('SELECT * FROM library')
  print(cur.fetchall())
  con.commit() and con.close()

def init_create_table_library_Bloated():
  con = db_var()
  con.execute('''
    CREATE TABLE library(
    "Directory URL" TEXT,
    "Branch Name" TEXT,
    "Branch Type" TEXT,
    "Name of Library Service" TEXT,
    "Library Service Type" TEXT,
    "WiFi Availability" TEXT,
    "Address Line 1" TEXT,
    "Address Line 2" TEXT,
    "Address Locality" TEXT,
    "Address Postcode" TEXT,
    "Postal Address Line 1" TEXT,
    "Postal Address Line 2" TEXT,
    "Postal Address Locality" TEXT,
    "Postal Address Postcode" TEXT,
    "ILL Address Line 1" TEXT,
    "ILL Address Line 2" TEXT,
    "ILL Address Line 3" TEXT,
    "ILL Address Line 4" TEXT,
    "ILL Address Locality" TEXT,
    "ILL Address Postcode" TEXT,
    "Phone" TEXT,
    "Phone (after hours)" TEXT,
    "Mobile" TEXT,
    "Email" TEXT,
    "Monday" TEXT,
    "Tuesday" TEXT,
    "Wednesday" TEXT,
    "Thursday" TEXT,
    "Friday" TEXT,
    "Saturday" TEXT,
    "Sunday" TEXT,
    "Latitude (Decimal)" TEXT,
    "Longitude (Decimal)" TEXT,
    "Branch Manager Title" TEXT,
    "Branch Manager Personal Title" TEXT,
    "Branch Manager Name" TEXT,
    "Branch Manager Phone" TEXT,
    "Branch Manager Email" TEXT,
    "Other Staff Member Position Title" TEXT,
    "Other Staff Member Personal Title" TEXT,
    "Other Staff Member Name" TEXT,
    "Other Staff Member Phone" TEXT,
    "Other Staff Member Email" TEXT,
    "Date Created" TEXT,
    "Date Last Updated" TEXT
  )''')
  con.commit() and con.close()

  
