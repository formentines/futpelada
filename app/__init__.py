from flask import Flask
from flask_mail import Mail
from config import Config
from models import db
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)  # Carregando configurações de e-mail e outras
    
    db.init_app(app)
    
    mail = Mail(app)

    from . import routes
    routes.init_app(app)

    return app