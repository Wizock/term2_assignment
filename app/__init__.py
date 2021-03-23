from flask import Flask, app
from flask.helpers import url_for

def create_app():
    app = Flask(__name__)
    from .dashboard import dashboard
    from .auth import auth
    from .library import library as libraryviews

    app.register_blueprint(dashboard, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')
    app.register_blueprint(libraryviews, url_prefix='/')
    
    return app