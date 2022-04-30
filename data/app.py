from flask import Flask, render_template
from chartcode import cc

app = Flask(__name__)
app.register_blueprint(cc)


if __name__ == '__main__':
    app.run(debug=True)