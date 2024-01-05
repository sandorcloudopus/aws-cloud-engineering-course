from flask import Flask


app = Flask(__name__)


@app.route("/")
def hello_world():
    return "<p>Hello fellow Engineers, I am glad that you have visited the Website!</p>"
