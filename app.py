import json
import os
import sys
import smtplib
import urllib.parse

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
from functools import wraps

# Table necessary for matching
lista = [0]

# This is interesting, CHECK OUT
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
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


# Database
db = SQL("sqlite:///database.db")


# Login required
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return redirect("/login")
        return f(*args, **kwargs)
    return decorated_function

# API index
@app.route('/api/index')
def index():
    return jsonify(komunikat="hejka", czy_dziala="tak")

# API authors
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
    return jsonify(value, value2)

# API register
@app.route("/api/register", methods=["GET", "POST"])
def register():
    if request.method == "GET":
        info = 'Strona rejestracji'
        return jsonify(info)
    elif request.method == "POST":
        if not request.args.get("username"):
            return jsonify("You must provide a username.")
        if not request.args.get("email"):
            return jsonify("You must provide a valid email.")
        if not request.args.get("password"):
            return jsonify("You must provide a password.")
        if not request.args.get("confirmation"):
            return jsonify("You must confirm your password.")
        if request.args.get("password") != request.args.get("confirmation"):
            return jsonify("Your passwords don't match! Try typing again.")
        if not db.execute("SELECT username FROM users WHERE username = :username", username=request.args.get("username")):
            hashword = generate_password_hash(request.args.get("password"))
            users = db.execute("INSERT INTO users (username, hashword, email) VALUES(:username, :hash, :email)",
                               username=request.args.get("username"), hash=hashword, email=request.args.get("email"))
            rows = db.execute("SELECT * FROM users WHERE username = :username",
                              username=request.args.get("username"))
            session["user_id"] = rows[0]["user_id"]
            return jsonify({
                "msg": "Użytkownik " + request.args.get("username") + " został utworzony!"
            }), 201
        elif True:
            return jsonify({
                "errorMsg": "Użytkownik o nazwie " + request.args.get("username") + " już istnieje!"
            }), 409

# API login
@app.route("/api/login", methods=["GET"])
def login():
    if request.method == "GET":
        if not request.args.get("username"):
            return jsonify({"errorMsg": "Must provide username!"}), 403
        elif not request.args.get("password"):
            return jsonify({"errorMsg": "Must provide password!"}), 403
        rows = db.execute("SELECT * FROM users WHERE username = :username",
                          username=request.args.get("username"))
        if len(rows) != 1 or not check_password_hash(rows[0]["hashword"], request.args.get("password")):
            return jsonify({"errorMsg": "Invalid username and/or password!"}), 403
        session["user_id"] = rows[0]["user_id"]
        return jsonify({"username": request.args.get("username")}), 200

# API personal test
@app.route("/api/personal_test", methods=["GET", "POST"])
@login_required
def personalTest():
    if request.method == "GET":
        session["user_id"]
        return jsonify("Strona z testem osobowości")
    session["user_id"]
    if request.method == "POST":
        ekstrawersja = int(request.args.get("EXT1")) + int(request.args.get("EXT3")) + int(request.args.get("EXT5")) + int(request.args.get("EXT7")) + int(request.args.get(
            "EXT9")) - int(request.args.get("EXT2")) - int(request.args.get("EXT4")) - int(request.args.get("EXT6")) - int(request.args.get("EXT8")) - int(request.args.get("EXT10"))
        ugodowosc = int(request.args.get("AGR2")) + int(request.args.get("AGR4")) + int(request.args.get("AGR6")) + int(request.args.get("AGR8")) + int(request.args.get(
            "AGR9")) + int(request.args.get("AGR10")) - int(request.args.get("AGR1")) - int(request.args.get("AGR3")) - int(request.args.get("AGR5")) - int(request.args.get("AGR7"))
        swiadomosc = int(request.args.get("CSN1")) + int(request.args.get("CSN3")) + int(request.args.get("CSN5")) + int(request.args.get("CSN7")) + int(request.args.get(
            "CSN9")) + int(request.args.get("CSN10")) - int(request.args.get("CSN2")) - int(request.args.get("CSN4")) - int(request.args.get("CSN6")) - int(request.args.get("CSN8"))
        stabilnosc = int(request.args.get("EST2")) + int(request.args.get("EST4")) - int(request.args.get("EST1")) - int(request.args.get("EST3")) - int(request.args.get(
            "EST5")) - int(request.args.get("EST6")) - int(request.args.get("EST7")) - int(request.args.get("EST8")) - int(request.args.get("EST9")) - int(request.args.get("EST10"))
        otwartosc = int(request.args.get("OPN1")) + int(request.args.get("OPN3")) + int(request.args.get("OPN5")) + int(request.args.get("OPN7")) + int(request.args.get(
            "OPN8")) + int(request.args.get("OPN9")) + int(request.args.get("OPN10")) - int(request.args.get("OPN2")) - int(request.args.get("OPN4")) - int(request.args.get(
                "OPN6"))

        user = db.execute(
            "SELECT user_id FROM traits where user_id = :user_id", user_id=session["user_id"])
    return jsonify("KONIEC")

# API lifestyle test (testing required)
@app.route("/api/lifestyle_test", methods=["GET", "POST"])
@login_required
def lifestyle():
    if request.method == "GET":
        return jsonify("Strona z testem zainteresowań")
        session["user_id"]
    for i in range(1, 15):
        zmienna_pomocnicza_a = "lf"+str(i)
        tablica_pomocnicza_b = []
        if request.form.get(zmienna_pomocnicza_a):
            tablica_pomocnicza_b[i] = 1
        else:
            tablica_pomocnicza_b[i] = 0
        user = db.execute(
            "SELECT user_id FROM traits where user_id = :user_id", user_id=session["user_id"])
        if not user:
            db.execute("INSERT INTO traits (lf1, lf2, lf3, lf4, lf5, lf6, lf7, lf8, lf9, lf10, lf11, lf12, lf13, lf14, lf15, user_id) VALUES (:lf1, :lf2, :lf3, :lf4, :lf5, :lf6, :lf7, :lf8, :lf9, :lf10, :lf11, :lf12, :lf13, :lf14, :lf15, :user_id)",
                       lf1=tablica_pomocnicza_b[1], lf2=tablica_pomocnicza_b[2], lf3=tablica_pomocnicza_b[3], lf4=tablica_pomocnicza_b[4], lf5=tablica_pomocnicza_b[5], lf6=tablica_pomocnicza_b[6], lf7=tablica_pomocnicza_b[7], lf8=tablica_pomocnicza_b[
                           8], lf9=tablica_pomocnicza_b[9], lf10=tablica_pomocnicza_b[10], lf11=tablica_pomocnicza_b[11], lf12=tablica_pomocnicza_b[12], lf13=tablica_pomocnicza_b[13], lf14=tablica_pomocnicza_b[14], lf15=tablica_pomocnicza_b[15],
                       user_id=session["user_id"])
            return jsonify("Wypełniono test")
        else:
            db.execute("UPDATE traits SET lf1=:lf1, lf2=:lf2, lf3=:lf3, lf4=:lf4, lf5=:lf5, lf6=:lf6, lf7=:lf7, lf8=:lf8, lf9=:lf9, lf10=:lf10, lf11=:lf11, lf12=:lf12, lf13=:lf13, lf14=:lf14, lf15=:lf15 WHERE user_id= :user_id",
                       lf1=tablica_pomocnicza_b[1], lf2=tablica_pomocnicza_b[2], lf3=tablica_pomocnicza_b[3], lf4=tablica_pomocnicza_b[4], lf5=tablica_pomocnicza_b[5], lf6=tablica_pomocnicza_b[6], lf7=tablica_pomocnicza_b[7], lf8=tablica_pomocnicza_b[
                           8], lf9=tablica_pomocnicza_b[9], lf10=tablica_pomocnicza_b[10], lf11=tablica_pomocnicza_b[11], lf12=tablica_pomocnicza_b[12], lf13=tablica_pomocnicza_b[13], lf14=tablica_pomocnicza_b[14], lf15=tablica_pomocnicza_b[15],
                       user_id=session["user_id"])
            return jsonify("Poprawiono test")

# API logout
@app.route("/api/logout")
def logout():
    session.clear()
    return jsonify("Wylogowano")


# sample subpages below with api
# @app.route('/api/hello')
# def hello():
#    return jsonify(simanko="no_hej")
# @app.route('/api/user/<username>')
# def show_user(username):
#    # returns the username
#    return 'Username: %s' % username
# @app.route('/api/post/<int:post_id>')
# def show_post(post_id):
    # returns the post, the post_id should be an int
#   return str(post_id)