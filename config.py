import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///futpelada.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = '12345678'