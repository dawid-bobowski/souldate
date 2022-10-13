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

@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

# Routes
# Index Page Json
@app.route('/api/index')
def index():
    return jsonify(komunikat="hejka",czy_dziala="tak")

# Authors Page Json
@app.route('/api/authors')
def authors():
    # Define Variable
    imie1 = "Dawid"
    nazwisko1 = "Bobowski"
    Itemid1 = 1

    imie2 = "Igor"
    nazwisko2 = "Olszewski"
    Itemid2 = 2

    value = {
        "imie": imie1,
        "nazwisko": nazwisko1,
        "id": Itemid1
    }
    value2 = {
        "imie": imie2,
        "nazwisko": nazwisko2,
        "id": Itemid2
    }
    return jsonify(value,value2)

# Register Page Json
@app.route("/api/register", methods=["GET", "POST"])
def register():
    # Render register page json
    if request.method == "GET":
        info = 'Strona rejestracji'
        return jsonify(info)

    # Checking if user provided all the required fields correctly and if the username is taken
    elif request.method == "POST":
        if not request.form.get("username"):
            return jsonify("You must provide a username.")
        if not request.form.get("email"):
            return jsonify("You must provide a valid email.")
        if not request.form.get("password"):
            return jsonify("You must provide a password.")
        if not request.form.get("confirmation"):
            return jsonify("You must confirm your password.")
        if request.form.get("password") != request.form.get("confirmation"):
            return jsonify("Your passwords don't match! Try typing again.")
        if not db.execute("SELECT username FROM users WHERE username = :username", username=request.form.get("username")):
            hashword = generate_password_hash(request.form.get("password"))
            users = db.execute("INSERT INTO users (username, hashword, email) VALUES(:username, :hash, :email)",
                               username=request.form.get("username"), hash=hashword, email=request.form.get("email"))
            rows = db.execute("SELECT * FROM users WHERE username = :username",
                              username=request.form.get("username"))
            session["user_id"] = rows[0]["user_id"]
            return redirect("/index")
        elif True:
            return jsonify("Username was already taken!")
### sample subpages below with api

#@app.route('/api/hello')
#def hello():
#    return jsonify(simanko="no_hej")

#@app.route('/api/user/<username>')
#def show_user(username):
#    # returns the username
#    return 'Username: %s' % username

#@app.route('/api/post/<int:post_id>')
#def show_post(post_id):
    # returns the post, the post_id should be an int
#   return str(post_id)