from heapq import heappush
from tabnanny import verbose
from flask import Flask
from controller.chartcode import cc
from controller.happy_ML import ml
# from dotenv import load_dotenv
import os
# load_dotenv()
app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
with app.app_context():
    app.register_blueprint(cc)
    app.register_blueprint(ml)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.environ.get("PORT"), debug=True)
