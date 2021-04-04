from flask_login import UserMixin


class User():

    def __init__(self,email,password, active = True):
        self.email = email
        self.password = password
        self.active = active

    def is_authenticated(self):
        return True
        #return true if user is authenticated, provided credentials

    def is_active(self):
        return True
    #return true if user is activte and authenticated