from flask import Flask, app
from flask.helpers import url_for
from .auth import *
from flask_login import LoginManager

def create_app():
    app = Flask(__name__)
    from .dashboard import dashboard # profile pages, personal infomation and data access
    from .auth import auth # small routing group | used to authenticate or register a user
    from .library import library as libraryviews # library data operation routes. 
    app.secret_key = '76d9a377304d34988ab3e10dc'
    app.register_blueprint(dashboard, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')
    app.register_blueprint(libraryviews, url_prefix='/')

    return app


def return_login_var():
    app = create_app()
    login_manager = LoginManager()
    login_manager.init_app(app)