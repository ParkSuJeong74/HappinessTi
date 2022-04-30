from heapq import heappush
from tabnanny import verbose
from flask import Flask
from controller.chartcode import cc
from controller.happy_ML import ml
from settings import PORT, DEBUG
app = Flask(__name__)
app.register_blueprint(cc)
app.register_blueprint(ml)


if __name__ == 'main':
    app.run(port=PORT, debug=DEBUG)
