from flask import Flask, render_template, request, redirect, Blueprint

library = Blueprint('library', __name__)

@library.route('/main')
def func():
    return "<h1>main-library</h1>"