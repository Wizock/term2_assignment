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