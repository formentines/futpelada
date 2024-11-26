from flask import Flask
from config import Config
from models import db

def create_app():
    app = Flask(__name__)

    from . import routes
    routes.init_app(app)

    return app