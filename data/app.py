from heapq import heappush
from tabnanny import verbose
from flask import Flask
from controller.chartcode import cc
from controller.happy_ML import ml
from dotenv import load_dotenv
import os
load_dotenv()
app = Flask(__name__)
app.register_blueprint(cc)
app.register_blueprint(ml)


if __name__ == 'main':
    app.run(host='0.0.0.0',port=os.environ.get("FLASK_PORT"), debug=os.environ.get("FLASK_DEBUG"))
