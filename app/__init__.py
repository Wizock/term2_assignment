from flask_login import LoginManager
from flask import Flask

app = Flask(__name__)

login = LoginManager(app)