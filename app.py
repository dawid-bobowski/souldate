from cs50 import SQL
from flask import Flask, flash, jsonify, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions
from werkzeug.security import check_password_hash, generate_password_hash
import sys
from collections import Counter, defaultdict
from itertools import groupby
from operator import itemgetter
from timeit import timeit
import smtplib

# What is this?
lista = [0]
server = smtplib.SMTP('smtp.gmail.com', 587)

# Configure application
app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

if __name__ == '__main__':
    app.run(debug=True)

# 

@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

# Routes
@app.route('/')
def index():
    return 'Index Page'

@app.route('/hello')
def hello():
    return jsonify('Hello, greetings from different endpoint', 'e')

@app.route('/user/<username>')
def show_user(username):
    # returns the username
    return 'Username: %s' % username

@app.route('/post/<int:post_id>')
def show_post(post_id):
    # returns the post, the post_id should be an int
    return str(post_id)
