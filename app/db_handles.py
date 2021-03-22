import os, sqlite3

def db_var():
    try:
        con = sqlite3.connect(os.getcwd() + '/example.db')
    except sqlite3.OperationalError as e:
      if e.args[0].startswith('no such table'):
        exists = False
      else:
        raise
    return con

def create_table():
    con = db_var()
    con.execute('''
        CREATE TABLE users (
            id INTEGER PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
            )
            ''')
    con.commit()
    con.close()


def register_user(email, username, password, password2):
  try:
    db = db_var()
    db.execute("INSERT INTO users (email, username, password) VALUES(?,?,?)",(email,username,password))
    db.commit() and db.close()
  except sqlite3.OperationalError as e:
      print(e)

def login_user(email, password):
  try:
    db = db_var()
    login_flag = db.execute("SELECT email, password FROM users WHERE email = ? AND password = ?",(email, password))
    if login_flag == False or None:
      return False
    else:
      return True
  except sqlite3.OperationalError as e:
      print(e)