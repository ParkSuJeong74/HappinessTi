from flask import Flask, render_template
from chartcode import cc
from happy_ML import ml

app = Flask(__name__)
app.register_blueprint(cc)
app.register_blueprint(ml)

if __name__ == 'main':
    app.run(debug=True)