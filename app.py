from flask import Flask, jsonify
app = Flask(__name__)

if __name__ == '__main__':
    app.run(debug=True)


@app.route('/')
def index():
    return 'Index Page'


@app.route('/hello')
def hello():
    return jsonify('Hello, greetings from different endpoint', 'e')

# adding variables


@app.route('/user/<username>')
def show_user(username):
    # returns the username
    return 'Username: %s' % username


@app.route('/post/<int:post_id>')
def show_post(post_id):
    # returns the post, the post_id should be an int
    return str(post_id)
