import json
import os
import datetime
from tempfile import mkdtemp
from cs50 import SQL
from flask import (Flask, jsonify, request, flash, send_file)
from flask_jwt_extended import (JWTManager, create_access_token, jwt_required, get_jwt_identity)
from werkzeug.security import check_password_hash, generate_password_hash
from flask_uploads import IMAGES, UploadSet, configure_uploads

lista = [0]
user_sessions = []

app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config["JWT_SECRET_KEY"] = "super-secret"
app.config["SECRET_KEY"] = "pass"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(seconds=604800) # default to 7 days

jwt = JWTManager(app)

if __name__ == '__main__':
    app.run(debug=True)

photos = UploadSet("photos", IMAGES)
app.config["UPLOADED_PHOTOS_DEST"] = "public/users/"
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


@app.route("/api/register", methods=["POST"])
def register():
    data = json.loads(request.data.decode('utf-8'))
    username = data['username']
    password = data['password']
    email = data['email']
    if not username:
        return jsonify({ "msg": "Podaj nazwę użytkownika." }), 400
    if not email:
        return jsonify({ "msg": "Podaj adres email." }), 400
    if not password:
        return jsonify({ "msg": "Podaj hasło." }), 400
    if not db.execute("SELECT username FROM users WHERE username = :username",
                      username=username):
        hashword = generate_password_hash(password)
        users = db.execute(
            "INSERT INTO users (username, hashword, email) VALUES(:username, :hash, :email)",
            username=username,
            hash=hashword,
            email=email)
        rows = db.execute("SELECT * FROM users WHERE username = :username",
                          username=username)
        return jsonify({ "msg": "Użytkownik :s został utworzony!".format(username) }), 201
    elif True:
        return jsonify({ "msg": "Użytkownik o nazwie :s już istnieje!".format(username) }), 409


@app.route("/api/login", methods=["POST"])
def login():
    data = json.loads(request.data.decode('utf-8'))
    username = data['username']
    password = data['password']
    rows = db.execute("SELECT * FROM users WHERE username = :username",
                      username=username)
    if len(rows) != 1 or not check_password_hash(rows[0]["hashword"],
                                                 password):
        return jsonify({"msg": "Nieprawidłowy login i/lub hasło!"}), 401
    access_token = create_access_token(identity=username)
    user_sessions.append(username)
    return jsonify({"username":username,"token":access_token}), 200


@app.route("/api/personality_questions", methods=["GET"])
def personalityQuestions():
    questions = db.execute('SELECT * FROM "personality-questions"')
    return jsonify({"questions":questions}), 200


@app.route("/api/lifestyle_questions", methods=["GET"])
def lifestyleQuestions():
    questions = db.execute('SELECT * FROM "lifestyle-questions"')
    return jsonify({"questions":questions}), 200


@app.route("/api/personality_test", methods=["POST"])
@jwt_required()
def personalityTest():
    username = get_jwt_identity()
    if username == []:
        return jsonify({"msg":"Sesja wygasła! Zaloguj się ponownie."}), 403
    else:
        data = json.loads(request.data.decode('utf-8'))
        answers = data['answers']

        ekstrawersja = (answers["EXT1"] + answers["EXT3"] + answers["EXT5"] +
                        answers["EXT7"] + answers["EXT9"] - answers["EXT2"] -
                        answers["EXT4"] - answers["EXT6"] - answers["EXT8"] -
                        answers["EXT10"])
        ugodowosc = (answers["AGR2"] + answers["AGR4"] + answers["AGR6"] +
                    answers["AGR8"] + answers["AGR9"] + answers["AGR10"] -
                    answers["AGR1"] - answers["AGR3"] - answers["AGR5"] -
                    answers["AGR7"])
        swiadomosc = (answers["CSN1"] + answers["CSN3"] + answers["CSN5"] +
                    answers["CSN7"] + answers["CSN9"] + answers["CSN10"] -
                    answers["CSN2"] - answers["CSN4"] - answers["CSN6"] -
                    answers["CSN8"])
        stabilnosc = (answers["EST2"] + answers["EST4"] - answers["EST1"] -
                    answers["EST3"] - answers["EST5"] - answers["EST6"] -
                    answers["EST7"] - answers["EST8"] - answers["EST9"] -
                    answers["EST10"])
        otwartosc = (answers["OPN1"] + answers["OPN3"] + answers["OPN5"] +
                    answers["OPN7"] + answers["OPN8"] + answers["OPN9"] +
                    answers["OPN10"] - answers["OPN2"] - answers["OPN4"] -
                    answers["OPN6"])

        user = db.execute("SELECT * FROM users where username = :username",
                        username=username)

        userid = user[0]['user_id']

        traits_user = db.execute(
            "SELECT user_id FROM traits where user_id = :user_id", user_id=userid)
        if not traits_user:
            db.execute(
                "INSERT INTO traits (EXT, AGR, CON, EST, OPN, user_id) VALUES (:EXT, :AGR, :CON, :EST, :OPN, :user_id)",
                EXT=ekstrawersja,
                AGR=ugodowosc,
                CON=swiadomosc,
                EST=stabilnosc,
                OPN=otwartosc,
                user_id=userid)
        else:
            db.execute(
                "UPDATE traits SET EXT=:EXT, AGR=:AGR, CON=:CON, EST=:EST, OPN=:OPN WHERE user_id= :user_id",
                EXT=ekstrawersja,
                AGR=ugodowosc,
                CON=swiadomosc,
                EST=stabilnosc,
                OPN=otwartosc,
                user_id=userid)
        return jsonify({
            "ekstrawersja": ekstrawersja,
            "ugodowosc": ugodowosc,
            "swiadomosc": swiadomosc,
            "stabilnosc": stabilnosc,
            "otwartosc": otwartosc
        }), 201


@app.route("/api/lifestyle_test", methods=["POST"])
@jwt_required()
def lifestyle():
    username = get_jwt_identity()
    if username == []:
        return jsonify({"msg":"Sesja wygasła! Zaloguj się ponownie."}), 403
    else:
        data = json.loads(request.data.decode('utf-8'))
        answers = data['answers']

        user = db.execute("SELECT * FROM users where username = :username",
                          username=username)

        userid = user[0]['user_id']

        traits_user = db.execute(
            "SELECT user_id FROM traits where user_id = :user_id",
            user_id=userid)

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
    return jsonify({'msg':'Test zainteresowań został wypełniony!'}), 201


@app.route("/api/logout")
@jwt_required()
def logout():
    username_to_logout = get_jwt_identity()
    user_loggedin = [username for username in user_sessions if username == username_to_logout]
    if user_loggedin != [] and username_to_logout == user_loggedin[0]:
      return jsonify({"msg":'Użytkownik wylogowany!'}), 204
    else:
      return jsonify({"msg":"Sesja wygasła! Zaloguj się ponownie."}), 403


@app.route("/api/matching", methods=["GET"])
@jwt_required()
def matching():
    username = get_jwt_identity()
    if username == []:
        return jsonify({"msg":"Sesja wygasła! Zaloguj się ponownie."}), 403
    else:
        user = db.execute("SELECT * FROM users where username = :username",
                        username=username)
        user_id = user[0]['user_id']
        traits_done = db.execute("SELECT user_id FROM traits WHERE user_id=:user_id",user_id=user_id)
        if traits_done == []:
            return jsonify({"msg":"Brak wypełnionego testu!"}), 406
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

        nova1 = [x for x in lista if x != user_id]
        partner = max(set(nova1), key=nova1.count)
    
        partner_name = db.execute(
            "SELECT username FROM users WHERE user_id=:user_id",
            user_id=partner)[0]['username']
        partner_email = db.execute("SELECT email FROM users WHERE user_id=:user_id",
                            user_id=partner)[0]['email']
        partner_ig = db.execute(
            "SELECT instalink FROM users WHERE user_id=:user_id",
            user_id=partner)[0]['instalink']
        partner_fb = db.execute("SELECT fblink FROM users WHERE user_id=:user_id",
                            user_id=partner)[0]['fblink']
        partner_tt = db.execute(
            "SELECT twitterlink FROM users WHERE user_id=:user_id",
            user_id=partner)[0]['twitterlink']
        partner_city = db.execute("SELECT city FROM users WHERE user_id=:user_id",
                            user_id=partner)[0]['city']
        partner_bday = db.execute(
            "SELECT bday FROM users WHERE user_id=:user_id",
            user_id=partner)[0]['bday']
        return jsonify({
            "username": partner_name,
            "email": partner_email,
            "ig": partner_ig,
            "fb": partner_fb,
            "tt": partner_tt,
            "city": partner_city,
            "bday": partner_bday
        }), 200


################# photo upload
@app.post("/api/profile-picture")
@jwt_required()
def uploadPicture():
    username = get_jwt_identity()
    if username == []:
        return jsonify({"msg":"Sesja wygasła! Zaloguj się ponownie."}), 403
    else:
        photo = request.files['photo']
        myfile = "{}.jpg".format(username)
        path = 'public/users/{}.jpg'.format(username)
        isExist = os.path.exists(path)
        if isExist == True:
            os.remove('public/users/{}.jpg'.format(username))
        if photo:
            photos.save(photo, name=myfile)
            flash("Photo saved successfully.")
            return jsonify({"msg":"Zdjęcie zostało zaktualizowane!"}), 201
        else:
            return jsonify({"msg":"Wystąpił problem podczas dodawania zdjęcia! Spróbuj ponownie."}), 404


# get user profile picture
@app.route("/api/users/<string:filename>")
def return_pic(filename):
    path = 'public/users/{}'.format(filename)
    if os.path.exists(path) == True:
        return send_file(path)
    else:
      return send_file('public/default_user.jpg')


@app.route("/api/user", methods=["GET", "PATCH"])
@jwt_required()
def userData():
    username = get_jwt_identity()
    if username == []:
        return jsonify({"msg":"Sesja wygasła! Zaloguj się ponownie."}), 403
    else:
        if request.method == "GET":
            user = db.execute("SELECT * FROM users where username = :username",
                            username=username)
            user_id = user[0]['user_id']
            name = db.execute(
                "SELECT username FROM users WHERE user_id=:user_id",
                user_id=user_id)[0]['username']
            email = db.execute(
                "SELECT email FROM users WHERE user_id=:user_id",
                user_id=user_id)[0]['email']
            instagram = db.execute(
                "SELECT instalink FROM users WHERE user_id=:user_id",
                user_id=user_id)[0]['instalink']
            facebook = db.execute("SELECT fblink FROM users WHERE user_id=:user_id",
                                user_id=user_id)[0]['fblink']
            twitter = db.execute(
                "SELECT twitterlink FROM users WHERE user_id=:user_id",
                user_id=user_id)[0]['twitterlink']
            miasto = db.execute("SELECT city FROM users WHERE user_id=:user_id",
                                user_id=user_id)[0]['city']
            data_urodzenia = db.execute(
                "SELECT bday FROM users WHERE user_id=:user_id",
                user_id=user_id)[0]['bday']
            return jsonify({
                "username": name,
                "email": email,
                "ig": instagram,
                "fb": facebook,
                "tt": twitter,
                "city": miasto,
                "bday": data_urodzenia
            }), 200
        if request.method == "PATCH":
            data = json.loads(request.data.decode('utf-8'))
            instagram = data['iglink']
            facebook = data['fblink']
            twitter = data['ttlink']
            city = data['city']
            bday = data['bday']
            if db.execute("SELECT username FROM users WHERE username = :username",
                        username=username):
                users = db.execute(
                    "UPDATE users SET instalink=:instagram, fblink=:facebook, twitterlink=:twitter, city=:city, bday=:bday WHERE username=:username",
                    username=username,
                    instagram=instagram,
                    facebook=facebook,
                    twitter=twitter,
                    city=city,
                    bday=bday)
                rows = db.execute("SELECT * FROM users WHERE username = :username",
                                username=username)
                return jsonify({"msg":"Profil zaktualizowany!"}), 201
            elif True:
                return jsonify({"msg":"Wystąpił problem podczas aktualizacji profilu! Spróbuj ponownie"}), 409
