class stat_returns:
  def __init__(self):
      self.db = db_var()
      self.curs = self.db.cursor()

  def latest_book(self):    
    self.curs.execute(''' SELECT Booktitle FROM Entries WHERE CreatorID = (SELECT MAX (?) FROM Entries)  ''',(str(session['userid'])))
    g = self.curs.fetchall()
    if len(g) < 1 | 0:
      ret = "You haven't read any books"
      return ret
    else:

      ret = len(g) - 1; returning_value = str(g[ret]).strip("('',) '") 
      return returning_value

  def when_read(self):
    self.curs.execute(''' SELECT Dateofaccess FROM Entries WHERE CreatorID = (SELECT MAX (?) FROM Entries) ''',(str(session['userid'])))
    g = self.curs.fetchall()
    if len(g) < 1 | 0:
      ret = "You haven't read any books"
      return ret
    else:

      ret = len(g) - 1; returning_value = str(g[ret]).strip("('',) '") 
      return returning_value

  def number_of_books(self):
    self.curs.execute(''' SELECT Numberofhours FROM Entries WHERE CreatorID = (SELECT MAX (?) FROM Entries)  ''',(str(session['userid'])))
    g = self.curs.fetchall()
    if len(g) < 1 | 0:
      ret = "You haven't read any books"
      return ret
    else:
      ret = len(g) - 1; returning_value = str(g[ret]).strip("('',) '") 
      return returning_value
  
  def book_author(self):
    self.curs.execute(''' SELECT Bookauthor FROM Entries WHERE CreatorID = (SELECT MAX (?) FROM Entries)  ''',(str(session['userid'])))
    g = self.curs.fetchall()
    if len(g) < 1 | 0:
      ret = "You haven't read any books"
      return ret
    else:
      ret = len(g) - 1; returning_value = str(g[ret]).strip("('',) '") 
      return returning_value

  def genre(self):
    self.curs.execute(''' SELECT Genre FROM Entries WHERE CreatorID = (SELECT MAX (?) FROM Entries)  ''',(str(session['userid'])))
    g = self.curs.fetchall()
    if len(g) < 1 | 0:
      ret = "You haven't read any books"
      return ret
    else:
      ret = len(g) - 1; returning_value = str(g[ret]).strip("('',) '") 
      return returning_value

  def library_name (self):
    self.curs.execute(''' SELECT Libraryname FROM Entries WHERE CreatorID = (SELECT MAX (?) FROM Entries)  ''',(str(session['userid'])))
    g = self.curs.fetchall()
    if len(g) < 1 | 0:
      ret = "You haven't read any books"
      return ret
    else:
      ret = len(g) - 1; returning_value = str(g[ret]).strip("('',) '") 
      return returning_value
  
  def number_of_pages (self):
    self.curs.execute(''' SELECT Numberofpages FROM Entries WHERE CreatorID = (SELECT MAX (?) FROM Entries)  ''',(str(session['userid'])))
    g = self.curs.fetchall()
    if len(g) < 1 | 0:
      ret = "You haven't read any books"
      return ret
    else:
      ret = len(g) - 1; returning_value = str(g[ret]).strip("('',) '") 
      return returning_value
