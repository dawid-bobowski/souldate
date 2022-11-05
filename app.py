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

lista = [0]

server = smtplib.SMTP('smtp.gmail.com', 587)

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
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "*"
    return response


db = SQL("sqlite:///database.db")


def login_required(f):

    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return redirect("/login")
        return f(*args, **kwargs)

    return decorated_function


@app.route('/api/index')
def index():
    return jsonify(komunikat="hejka", czy_dziala="tak")


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
        if not db.execute(
                "SELECT username FROM users WHERE username = :username",
                username=request.args.get("username")):
            hashword = generate_password_hash(request.args.get("password"))
            users = db.execute(
                "INSERT INTO users (username, hashword, email) VALUES(:username, :hash, :email)",
                username=request.args.get("username"),
                hash=hashword,
                email=request.args.get("email"))
            rows = db.execute("SELECT * FROM users WHERE username = :username",
                              username=request.args.get("username"))
            session["user_id"] = rows[0]["user_id"]
            return jsonify({
                "msg":
                "Użytkownik " + request.args.get("username") +
                " został utworzony!"
            }), 201
        elif True:
            return jsonify({
                "errorMsg":
                "Użytkownik o nazwie " + request.args.get("username") +
                " już istnieje!"
            }), 409


@app.route("/api/login", methods=["POST"])
def login():
    if request.method == "POST":
        if not request.args.get("username"):
            return jsonify({"errorMsg": "Must provide username!"}), 403
        elif not request.args.get("password"):
            return jsonify({"errorMsg": "Must provide password!"}), 403
        rows = db.execute("SELECT * FROM users WHERE username = :username",
                          username=request.args.get("username"))
        if len(rows) != 1 or not check_password_hash(
                rows[0]["hashword"], request.args.get("password")):
            return jsonify({"errorMsg":
                            "Invalid username and/or password!"}), 403
        session["user_id"] = rows[0]["user_id"]
        return jsonify({"username": request.args.get("username")}), 200


@app.route("/api/personality_test", methods=["GET", "POST"])
# Currently not working properly
# @login_required
def personalityTest():
    if request.method == "GET":
        session["user_id"]
        return jsonify("Strona z testem osobowości")
    if request.method == "POST":
        answers = json.loads(request.data.decode('utf-8'))
        ekstrawersja = (answers["EXT1"] + answers["EXT3"] + answers["EXT5"] + answers["EXT7"] +
            answers["EXT9"] - answers["EXT2"] - answers["EXT4"] - answers["EXT6"] - answers["EXT8"] - answers["EXT10"])
        ugodowosc = (answers["AGR2"] + answers["AGR4"] +answers["AGR6"] + answers["AGR8"] + answers["AGR9"] +
            answers["AGR10"] - answers["AGR1"] - answers["AGR3"] - answers["AGR5"] - answers["AGR7"])
        swiadomosc = (answers["CSN1"] + answers["CSN3"] +answers["CSN5"] + answers["CSN7"] + answers["CSN9"] +
            answers["CSN10"] - answers["CSN2"] - answers["CSN4"] - answers["CSN6"] - answers["CSN8"])
        stabilnosc = (answers["EST2"] + answers["EST4"] - answers["EST1"] - answers["EST3"] - answers["EST5"] -
            answers["EST6"] - answers["EST7"] - answers["EST8"] - answers["EST9"] - answers["EST10"])
        otwartosc = (answers["OPN1"] + answers["OPN3"] + answers["OPN5"] + answers["OPN7"] + answers["OPN8"] +
            answers["OPN9"] + answers["OPN10"] - answers["OPN2"] - answers["OPN4"] - answers["OPN6"])

        print(ekstrawersja, ugodowosc, swiadomosc, stabilnosc, otwartosc)

        # Currently not working properly
        # user = db.execute(
        #     "SELECT user_id FROM traits where user_id = :user_id",
        #     user_id=session["user_id"])

        return jsonify({
            "ekstrawersja": ekstrawersja,
            "ugodowosc": ugodowosc,
            "swiadomosc": swiadomosc,
            "stabilnosc": stabilnosc,
            "otwartosc": otwartosc
            }), 201

@app.route("/api/personality_questions", methods=["GET"])
def personalityQuestions():
    if request.method == "GET":
        questions = db.execute('SELECT * FROM "personality-questions"')
        return jsonify({"questions": questions}), 200


@app.route("/api/lifestyle_test", methods=["GET", "POST"])
@login_required
def lifestyle():
    if request.method == "GET":
        return jsonify("Strona z testem zainteresowań")
        session["user_id"]
    for i in range(1, 15):
        zmienna_pomocnicza_a = "lf" + str(i)
        tablica_pomocnicza_b = []
        if request.form.get(zmienna_pomocnicza_a):
            tablica_pomocnicza_b[i] = 1
        else:
            tablica_pomocnicza_b[i] = 0
        user = db.execute(
            "SELECT user_id FROM traits where user_id = :user_id",
            user_id=session["user_id"])
        if not user:
            db.execute(
                "INSERT INTO traits (lf1, lf2, lf3, lf4, lf5, lf6, lf7, lf8, lf9, lf10, lf11, lf12, lf13, lf14, lf15, user_id) VALUES (:lf1, :lf2, :lf3, :lf4, :lf5, :lf6, :lf7, :lf8, :lf9, :lf10, :lf11, :lf12, :lf13, :lf14, :lf15, :user_id)",
                lf1=tablica_pomocnicza_b[1],
                lf2=tablica_pomocnicza_b[2],
                lf3=tablica_pomocnicza_b[3],
                lf4=tablica_pomocnicza_b[4],
                lf5=tablica_pomocnicza_b[5],
                lf6=tablica_pomocnicza_b[6],
                lf7=tablica_pomocnicza_b[7],
                lf8=tablica_pomocnicza_b[8],
                lf9=tablica_pomocnicza_b[9],
                lf10=tablica_pomocnicza_b[10],
                lf11=tablica_pomocnicza_b[11],
                lf12=tablica_pomocnicza_b[12],
                lf13=tablica_pomocnicza_b[13],
                lf14=tablica_pomocnicza_b[14],
                lf15=tablica_pomocnicza_b[15],
                user_id=session["user_id"])
            return jsonify("Wypełniono test")
        else:
            db.execute(
                "UPDATE traits SET lf1=:lf1, lf2=:lf2, lf3=:lf3, lf4=:lf4, lf5=:lf5, lf6=:lf6, lf7=:lf7, lf8=:lf8, lf9=:lf9, lf10=:lf10, lf11=:lf11, lf12=:lf12, lf13=:lf13, lf14=:lf14, lf15=:lf15 WHERE user_id= :user_id",
                lf1=tablica_pomocnicza_b[1],
                lf2=tablica_pomocnicza_b[2],
                lf3=tablica_pomocnicza_b[3],
                lf4=tablica_pomocnicza_b[4],
                lf5=tablica_pomocnicza_b[5],
                lf6=tablica_pomocnicza_b[6],
                lf7=tablica_pomocnicza_b[7],
                lf8=tablica_pomocnicza_b[8],
                lf9=tablica_pomocnicza_b[9],
                lf10=tablica_pomocnicza_b[10],
                lf11=tablica_pomocnicza_b[11],
                lf12=tablica_pomocnicza_b[12],
                lf13=tablica_pomocnicza_b[13],
                lf14=tablica_pomocnicza_b[14],
                lf15=tablica_pomocnicza_b[15],
                user_id=session["user_id"])
            return jsonify("Poprawiono test")


@app.route("/api/logout")
def logout():
    session.clear()
    return {}, 204


@app.route("/api/matching", methods=["GET"])
@login_required
def matching():
    otwartosc = db.execute("SELECT OPN FROM traits WHERE user_id=:user_id",
                           user_id=session["user_id"])[0]['OPN']
    ugodowosc = db.execute("SELECT AGR FROM traits WHERE user_id=:user_id",
                           user_id=session["user_id"])[0]['AGR']
    stabilnosc = db.execute("SELECT EST FROM traits WHERE user_id=:user_id",
                            user_id=session["user_id"])[0]['EST']
    swiadomosc = db.execute("SELECT CON FROM traits WHERE user_id=:user_id",
                            user_id=session["user_id"])[0]['CON']
    ekstrawersja = db.execute("SELECT EXT FROM traits WHERE user_id=:user_id",
                              user_id=session["user_id"])[0]['EXT']

    otw = db.execute(
        "SELECT user_id FROM traits WHERE OPN BETWEEN :value1 AND :value2",
        value1=otwartosc - 5,
        value2=otwartosc + 5)
    ugd = db.execute(
        "SELECT user_id FROM traits WHERE AGR BETWEEN :value1 AND :value2",
        value1=ugodowosc - 5,
        value2=ugodowosc + 5)
    stab = db.execute(
        "SELECT user_id FROM traits WHERE EST BETWEEN :value1 AND :value2",
        value1=stabilnosc - 5,
        value2=stabilnosc + 5)
    swd = db.execute(
        "SELECT user_id FROM traits WHERE CON BETWEEN :value1 AND :value2",
        value1=swiadomosc - 5,
        value2=swiadomosc + 5)
    ekt = db.execute(
        "SELECT user_id FROM traits WHERE EXT BETWEEN :value1 AND :value2",
        value1=ekstrawersja - 5,
        value2=ekstrawersja + 5)

    for item in otw:
        lista.append(item['user_id'])
    for item in ugd:
        lista.append(item['user_id'])
    for item in stab:
        lista.append(item['user_id'])
    for item in swd:
        lista.append(item['user_id'])
    for item in ekt:
        lista.append(item['user_id'])

    lf1 = db.execute("SELECT lf1 FROM traits WHERE user_id=:user_id",
                     user_id=session["user_id"])[0]['lf1']
    lf2 = db.execute("SELECT lf2 FROM traits WHERE user_id=:user_id",
                     user_id=session["user_id"])[0]['lf2']
    lf3 = db.execute("SELECT lf3 FROM traits WHERE user_id=:user_id",
                     user_id=session["user_id"])[0]['lf3']
    lf4 = db.execute("SELECT lf4 FROM traits WHERE user_id=:user_id",
                     user_id=session["user_id"])[0]['lf4']
    lf5 = db.execute("SELECT lf5 FROM traits WHERE user_id=:user_id",
                     user_id=session["user_id"])[0]['lf5']
    lf6 = db.execute("SELECT lf6 FROM traits WHERE user_id=:user_id",
                     user_id=session["user_id"])[0]['lf6']
    lf7 = db.execute("SELECT lf7 FROM traits WHERE user_id=:user_id",
                     user_id=session["user_id"])[0]['lf7']
    lf8 = db.execute("SELECT lf8 FROM traits WHERE user_id=:user_id",
                     user_id=session["user_id"])[0]['lf8']
    lf9 = db.execute("SELECT lf9 FROM traits WHERE user_id=:user_id",
                     user_id=session["user_id"])[0]['lf9']
    lf10 = db.execute("SELECT lf10 FROM traits WHERE user_id=:user_id",
                      user_id=session["user_id"])[0]['lf10']
    lf11 = db.execute("SELECT lf11 FROM traits WHERE user_id=:user_id",
                      user_id=session["user_id"])[0]['lf11']
    lf12 = db.execute("SELECT lf12 FROM traits WHERE user_id=:user_id",
                      user_id=session["user_id"])[0]['lf12']
    lf13 = db.execute("SELECT lf13 FROM traits WHERE user_id=:user_id",
                      user_id=session["user_id"])[0]['lf13']
    lf14 = db.execute("SELECT lf14 FROM traits WHERE user_id=:user_id",
                      user_id=session["user_id"])[0]['lf14']
    lf15 = db.execute("SELECT lf15 FROM traits WHERE user_id=:user_id",
                      user_id=session["user_id"])[0]['lf15']

    lifestyle1 = db.execute("SELECT user_id FROM traits WHERE lf1=:lf1",
                            lf1=lf1)
    lifestyle2 = db.execute("SELECT user_id FROM traits WHERE lf2=:lf2",
                            lf2=lf2)
    lifestyle3 = db.execute("SELECT user_id FROM traits WHERE lf3=:lf3",
                            lf3=lf3)
    lifestyle4 = db.execute("SELECT user_id FROM traits WHERE lf4=:lf4",
                            lf4=lf4)
    lifestyle5 = db.execute("SELECT user_id FROM traits WHERE lf5=:lf5",
                            lf5=lf5)
    lifestyle6 = db.execute("SELECT user_id FROM traits WHERE lf6=:lf6",
                            lf6=lf6)
    lifestyle7 = db.execute("SELECT user_id FROM traits WHERE lf7=:lf7",
                            lf7=lf7)
    lifestyle8 = db.execute("SELECT user_id FROM traits WHERE lf8=:lf8",
                            lf8=lf8)
    lifestyle9 = db.execute("SELECT user_id FROM traits WHERE lf9=:lf9",
                            lf9=lf9)
    lifestyle10 = db.execute("SELECT user_id FROM traits WHERE lf10=:lf10",
                             lf10=lf10)
    lifestyle11 = db.execute("SELECT user_id FROM traits WHERE lf11=:lf11",
                             lf11=lf11)
    lifestyle12 = db.execute("SELECT user_id FROM traits WHERE lf12=:lf12",
                             lf12=lf12)
    lifestyle13 = db.execute("SELECT user_id FROM traits WHERE lf13=:lf13",
                             lf13=lf13)
    lifestyle14 = db.execute("SELECT user_id FROM traits WHERE lf14=:lf14",
                             lf14=lf14)
    lifestyle15 = db.execute("SELECT user_id FROM traits WHERE lf15=:lf15",
                             lf15=lf15)

    for item in lifestyle1:
        lista.append(item['user_id'])
    for item in lifestyle2:
        lista.append(item['user_id'])
    for item in lifestyle3:
        lista.append(item['user_id'])
    for item in lifestyle4:
        lista.append(item['user_id'])
    for item in lifestyle5:
        lista.append(item['user_id'])
    for item in lifestyle6:
        lista.append(item['user_id'])
    for item in lifestyle7:
        lista.append(item['user_id'])
    for item in lifestyle8:
        lista.append(item['user_id'])
    for item in lifestyle9:
        lista.append(item['user_id'])
    for item in lifestyle10:
        lista.append(item['user_id'])
    for item in lifestyle11:
        lista.append(item['user_id'])
    for item in lifestyle12:
        lista.append(item['user_id'])
    for item in lifestyle13:
        lista.append(item['user_id'])
    for item in lifestyle14:
        lista.append(item['user_id'])
    for item in lifestyle15:
        lista.append(item['user_id'])

    user_id = session["user_id"]
    nova = [x for x in lista if x != user_id]
    partner = max(set(nova), key=nova.count)
    name = db.execute(
        "SELECT username, email FROM users WHERE user_id=:user_id",
        user_id=partner)
    return jsonify(komunikat="Masz parkę", nazwa=name)
