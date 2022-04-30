import os
from os.path import dirname, join
from dotenv import load_dotenv
load_dotenv(verbose=True)
dotenv_path=join(dirname(__file__),".env")
PORT=os.environ.get("FLASK_PORT")
DEBUG=os.environ.get("FLASK_DEBUG")