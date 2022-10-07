import os
import sys
import smtplib

from cs50 import SQL
from flask import Flask, flash, jsonify, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions
from werkzeug.security import check_password_hash, generate_password_hash
from collections import Counter, defaultdict
from itertools import groupby
from operator import itemgetter
from timeit import timeit


# Please change name of this file and import later
# from nazwa import login_required, apology

# Variables for the app
list_a = [0]
server = smtplib.SMTP('smtp.gmail.com', 587)

# App configuration
app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_FILE_DIR"] = mkdtemp()
Session(app)

# SQLite database
db = SQL("sqlite:///database.db")


@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response
