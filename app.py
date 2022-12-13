import json
import os
import datetime
from tempfile import mkdtemp
from cs50 import SQL
from flask import (Flask, jsonify, request, session, flash)
from flask_jwt_extended import (JWTManager, create_access_token, jwt_required)
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash
from flask_uploads import IMAGES, UploadSet, configure_uploads

lista = [0]
username_globalzmienna = []

app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.config["JWT_SECRET_KEY"] = "super-secret"
app.config["SECRET_KEY"] = "pass"
# app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(seconds=20) :) :) :) :)

Session(app)
jwt = JWTManager(app)

if __name__ == '__main__':
    app.run(debug=True)

################# photo upload
photos=UploadSet("photos", IMAGES)
app.config["UPLOADED_PHOTOS_DEST"] = "src/assets/users"
configure_uploads(app, photos)

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


@app.route('/api/index')
def index():
    return jsonify(komunikat="hejka", czy_dziala="tak")


@app.route("/api/register", methods=["GET", "POST"])
def register():
    if request.method == "GET":
        info = 'Strona rejestracji'
        return jsonify(info)
    elif request.method == "POST":
        data = json.loads(request.data.decode('utf-8'))
        username = data['username']
        password = data['password']
        email = data['email']
        if not username:
            return jsonify({"errorMsg":"You must provide a username."}), 400
        if not email:
            return jsonify({"errorMsg":"You must provide a valid email."}), 400
        if not password:
            return jsonify({"errorMsg":"You must provide a password."}), 400
        if not db.execute(
                "SELECT username FROM users WHERE username = :username",
                username=username):
            hashword = generate_password_hash(password)
            users = db.execute(
                "INSERT INTO users (username, hashword, email) VALUES(:username, :hash, :email)",
                username=username,
                hash=hashword,
                email=request.args.get("email"))
            rows = db.execute("SELECT * FROM users WHERE username = :username",
                              username=username)
            return jsonify({
                "msg":
                "Użytkownik " + username +
                " został utworzony!"
            }), 201
        elif True:
            return jsonify({
                "errorMsg":
                "Użytkownik o nazwie " + username +
                " już istnieje!"
            }), 409


@app.route("/api/login", methods=["POST"])
def login():
    if request.method == "POST":
        data = json.loads(request.data.decode('utf-8'))
        username = data['username']
        password = data['password']
        rows = db.execute("SELECT * FROM users WHERE username = :username", username=username)
        if len(rows) != 1 or not check_password_hash(rows[0]["hashword"], password):
            return jsonify({"errorMsg":"Invalid username and/or password!"}), 403
        session["user_id"] = rows[0]["user_id"]
        cos = session["user_id"]
        username_globalzmienna.clear()
        username_globalzmienna.insert(0, username)
        additional_claims = {"aud": "some_audience", "foo": "bar"}
        access_token = create_access_token(cos, additional_claims=additional_claims)
        return jsonify({"username": username, "token": access_token}), 200


@app.route("/api/personality_test", methods=["GET", "POST"])
@jwt_required()
def personalityTest():
    if request.method == "GET":
        session["user_id"]
        return jsonify("Strona z testem osobowości")
    if request.method == "POST":
        data = json.loads(request.data.decode('utf-8'))
        answers = data['answers']
        username = data['username']

        ekstrawersja = (answers["EXT1"] + answers["EXT3"] + answers["EXT5"] + answers["EXT7"] + answers["EXT9"]
                        - answers["EXT2"] - answers["EXT4"] - answers["EXT6"] - answers["EXT8"] - answers["EXT10"])
        ugodowosc = (answers["AGR2"] + answers["AGR4"] + answers["AGR6"] + answers["AGR8"] + answers["AGR9"] +
                     answers["AGR10"] - answers["AGR1"] - answers["AGR3"] - answers["AGR5"] - answers["AGR7"])
        swiadomosc = (answers["CSN1"] + answers["CSN3"] + answers["CSN5"] + answers["CSN7"] + answers["CSN9"] +
                      answers["CSN10"] - answers["CSN2"] - answers["CSN4"] - answers["CSN6"] - answers["CSN8"])
        stabilnosc = (answers["EST2"] + answers["EST4"] - answers["EST1"] - answers["EST3"] - answers["EST5"] -
                      answers["EST6"] - answers["EST7"] - answers["EST8"] - answers["EST9"] - answers["EST10"])
        otwartosc = (answers["OPN1"] + answers["OPN3"] + answers["OPN5"] + answers["OPN7"] + answers["OPN8"] +
                     answers["OPN9"] + answers["OPN10"] - answers["OPN2"] - answers["OPN4"] - answers["OPN6"])

        user = db.execute(
            "SELECT * FROM users where username = :username", username=username)

        userid = user[0]['user_id']

        traits_user = db.execute(
            "SELECT user_id FROM traits where user_id = :user_id", user_id=userid)
        print(ekstrawersja, ugodowosc, swiadomosc, stabilnosc, otwartosc)
        if not traits_user:
            db.execute("INSERT INTO traits (EXT, AGR, CON, EST, OPN, user_id) VALUES (:EXT, :AGR, :CON, :EST, :OPN, :user_id)",
                       EXT=ekstrawersja, AGR=ugodowosc, CON=swiadomosc, EST=stabilnosc, OPN=otwartosc, user_id=userid)
        else:
            db.execute("UPDATE traits SET EXT=:EXT, AGR=:AGR, CON=:CON, EST=:EST, OPN=:OPN WHERE user_id= :user_id",
                       EXT=ekstrawersja, AGR=ugodowosc, CON=swiadomosc, EST=stabilnosc, OPN=otwartosc, user_id=userid)
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


@app.route("/api/lifestyle_questions", methods=["GET"])
def lifestyleQuestions():
    if request.method == "GET":
        questions = db.execute('SELECT * FROM "lifestyle-questions"')
        return jsonify({"questions": questions}), 200


@app.route("/api/lifestyle_test", methods=["GET", "POST"])
# It sends by some miracle the value of 2, to check and test.
@jwt_required()
def lifestyle():
    if request.method == "GET":
        session["user_id"]
        return jsonify("Strona z testem zainteresowań")
    if request.method == "POST":
        data = json.loads(request.data.decode('utf-8'))
        answers = data['answers']
        username = data['username']

        user = db.execute(
            "SELECT * FROM users where username = :username", username=username)

        userid = user[0]['user_id']

        traits_user = db.execute(
            "SELECT user_id FROM traits where user_id = :user_id", user_id=userid)

        lf1 = answers['lf1']
        lf2 = answers['lf2']
        lf3 = answers['lf3']
        lf4 = answers['lf4']
        lf5 = answers['lf5']
        lf6 = answers['lf6']
        lf7 = answers['lf7']
        lf8 = answers['lf8']
        lf9 = answers['lf9']
        lf10 = answers['lf10']
        lf11 = answers['lf11']
        lf12 = answers['lf12']
        lf13 = answers['lf13']
        lf14 = answers['lf14']
        lf15 = answers['lf15']
        print(answers)
        if not traits_user:
            db.execute(
                "INSERT INTO traits (lf1, lf2, lf3, lf4, lf5, lf6, lf7, lf8, lf9, lf10, lf11, lf12, lf13, lf14, lf15, user_id) VALUES (:lf1, :lf2, :lf3, :lf4, :lf5, :lf6, :lf7, :lf8, :lf9, :lf10, :lf11, :lf12, :lf13, :lf14, :lf15, :user_id)",
                lf1=lf1,
                lf2=lf2,
                lf3=lf3,
                lf4=lf4,
                lf5=lf5,
                lf6=lf6,
                lf7=lf7,
                lf8=lf8,
                lf9=lf9,
                lf10=lf10,
                lf11=lf11,
                lf12=lf12,
                lf13=lf13,
                lf14=lf14,
                lf15=lf15,
                user_id=userid)
        else:
            db.execute(
                "UPDATE traits SET lf1=:lf1, lf2=:lf2, lf3=:lf3, lf4=:lf4, lf5=:lf5, lf6=:lf6, lf7=:lf7, lf8=:lf8, lf9=:lf9, lf10=:lf10, lf11=:lf11, lf12=:lf12, lf13=:lf13, lf14=:lf14, lf15=:lf15 WHERE user_id= :user_id",
                lf1=lf1,
                lf2=lf2,
                lf3=lf3,
                lf4=lf4,
                lf5=lf5,
                lf6=lf6,
                lf7=lf7,
                lf8=lf8,
                lf9=lf9,
                lf10=lf10,
                lf11=lf11,
                lf12=lf12,
                lf13=lf13,
                lf14=lf14,
                lf15=lf15,
                user_id=userid)
    return {}, 201


@app.route("/api/logout")
def logout():
    session.clear()
    return {}, 204


@app.route("/api/matching", methods=["GET"])
@jwt_required()
def matching():
    username = username_globalzmienna[0]
    user = db.execute(
        "SELECT * FROM users where username = :username", username=username)
    user_id = user[0]['user_id']
    otwartosc = db.execute("SELECT OPN FROM traits WHERE user_id=:user_id",
                           user_id=user_id)[0]['OPN']
    ugodowosc = db.execute("SELECT AGR FROM traits WHERE user_id=:user_id",
                           user_id=user_id)[0]['AGR']
    stabilnosc = db.execute("SELECT EST FROM traits WHERE user_id=:user_id",
                            user_id=user_id)[0]['EST']
    swiadomosc = db.execute("SELECT CON FROM traits WHERE user_id=:user_id",
                            user_id=user_id)[0]['CON']
    ekstrawersja = db.execute("SELECT EXT FROM traits WHERE user_id=:user_id",
                              user_id=user_id)[0]['EXT']

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
                     user_id=user_id)[0]['lf1']
    lf2 = db.execute("SELECT lf2 FROM traits WHERE user_id=:user_id",
                     user_id=user_id)[0]['lf2']
    lf3 = db.execute("SELECT lf3 FROM traits WHERE user_id=:user_id",
                     user_id=user_id)[0]['lf3']
    lf4 = db.execute("SELECT lf4 FROM traits WHERE user_id=:user_id",
                     user_id=user_id)[0]['lf4']
    lf5 = db.execute("SELECT lf5 FROM traits WHERE user_id=:user_id",
                     user_id=user_id)[0]['lf5']
    lf6 = db.execute("SELECT lf6 FROM traits WHERE user_id=:user_id",
                     user_id=user_id)[0]['lf6']
    lf7 = db.execute("SELECT lf7 FROM traits WHERE user_id=:user_id",
                     user_id=user_id)[0]['lf7']
    lf8 = db.execute("SELECT lf8 FROM traits WHERE user_id=:user_id",
                     user_id=user_id)[0]['lf8']
    lf9 = db.execute("SELECT lf9 FROM traits WHERE user_id=:user_id",
                     user_id=user_id)[0]['lf9']
    lf10 = db.execute("SELECT lf10 FROM traits WHERE user_id=:user_id",
                      user_id=user_id)[0]['lf10']
    lf11 = db.execute("SELECT lf11 FROM traits WHERE user_id=:user_id",
                      user_id=user_id)[0]['lf11']
    lf12 = db.execute("SELECT lf12 FROM traits WHERE user_id=:user_id",
                      user_id=user_id)[0]['lf12']
    lf13 = db.execute("SELECT lf13 FROM traits WHERE user_id=:user_id",
                      user_id=user_id)[0]['lf13']
    lf14 = db.execute("SELECT lf14 FROM traits WHERE user_id=:user_id",
                      user_id=user_id)[0]['lf14']
    lf15 = db.execute("SELECT lf15 FROM traits WHERE user_id=:user_id",
                      user_id=user_id)[0]['lf15']

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

    user_idek = user_id

    nova1 = [x for x in lista if x != user_idek]
    partner1 = max(set(nova1), key=nova1.count)
    unwanted1 = {partner1}
    nova2=[e for e in nova1 if e not in unwanted1]
    partner2 = max(set(nova2), key=nova2.count)
    unwanted2 = {partner2}
    nova3=[e for e in nova2 if e not in unwanted2]
    partner3 = max(set(nova3), key=nova3.count)
    unwanted3 = {partner3}
    nova4=[e for e in nova3 if e not in unwanted3]
    partner4 = max(set(nova4), key=nova4.count)
    unwanted4 = {partner3}
    nova5=[e for e in nova4 if e not in unwanted4]
    partner5 = max(set(nova5), key=nova5.count)

    name1 = db.execute(
        "SELECT username, email FROM users WHERE user_id=:user_id",
        user_id=partner1)
    name2 = db.execute(
        "SELECT username, email FROM users WHERE user_id=:user_id",
        user_id=partner2)
    name3 = db.execute(
        "SELECT username, email FROM users WHERE user_id=:user_id",
        user_id=partner3)
    name4 = db.execute(
        "SELECT username, email FROM users WHERE user_id=:user_id",
        user_id=partner4)
    name5 = db.execute(
        "SELECT username, email FROM users WHERE user_id=:user_id",
        user_id=partner5)
    print(name1,name2,name3,name4,name5)
    return jsonify({"msg": "Masz parę!", "name1": name1, "name2": name2, "name3": name3, "name4": name4, "name5": name5}), 200

################# photo upload
################# jeszcze do poprawki ale już wrzucam z innymi zmianami
@app.post("/api/upload/profile-picture")
def upload():
    photo = request.files['photo']
    nazwka = username_globalzmienna[0]
    myfile = "{}.jpg".format(nazwka)
    print(myfile)
    print("Current Working Directory " , os.getcwd())
    directory = os.getcwd()
    print("Current Working Directory " , os.getcwd())
    print(os.path.isfile(myfile))
    # Specify path
    path = 'src/assets/users/{}.jpg'.format(nazwka)
    # Check whether the specified
    # path exists or not
    isExist = os.path.exists(path)
    print(isExist)
    if isExist==True:
        os.remove('src/assets/users/{}.jpg'.format(nazwka))
    if photo:
        photos.save(photo, name=myfile)
        flash("Photo saved successfully.")
        return jsonify({"msg": "Zdjęcie zostało zaktualizowane!"}), 201
    else:
        return jsonify({"msg": "Nie zaktualizowano zdjęcia!"}), 404