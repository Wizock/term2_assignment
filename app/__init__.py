from flask import Flask, app
from flask.helpers import url_for
from .auth import *

def create_app():
    app = Flask(__name__)
    from .dashboard import dashboard # profile pages, personal infomation and data access
    from .auth import auth # small routing group | used to authenticate or register a user
    from .library import library as libraryviews # library data operation routes. 
    login_manager.init_app(app)
    app.register_blueprint(dashboard, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')
    app.register_blueprint(libraryviews, url_prefix='/')
    
    
    return app

