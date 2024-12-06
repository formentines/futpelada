from flask_sqlalchemy import SQLAlchemy
from datetime import date
from datetime import time

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'User'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True,nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    birth_date = db.Column(db.DateTime, default=db.func.current_timestamp())  

    def __repr__(self):
        return f'<Usuário {self.name}>'

class Post(db.Model):
    __tablename__ = 'Posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)

    User = db.relationship('User', backref=db.backref('Posts', lazy=True))

    def __repr__(self):
        return f'<Post {self.title}>'
    
class Category(db.model):
    __tablename__ = 'Category'

    id = db.column(db.integer, primary_key=True)
    name = db.column(db.string(100), unique=True, nullable=False)

    Category = db.relationship("Category", back_populates="Equipe")
   
    categorias = [
    {"nome": "Fut7"},
    {"nome": "Futsal"},
    {"nome": "Futebol"},
    {"nome": "Society"}
]

    def __repr__(self):
        return f"<Category(id={self.id}, nome='{self.nome}')>"

class Team(db.model):
    __tablename__ = 'Team'

    id = db.column(db.integer, primary_key=True)
    name = db.column(db.String(200), nullable=False)
    team_shield = db.column(db.String(200), nullable=False)
    social_media = db.column(db.string(300), nullable=False)
    state = db.column(db.string(70), nullable=False)
    category = db.column(db.string)
    description = db.column(db.string(500), nullable=True)


    User = db.relationship('User', beckref=db.backref('Team', lazy=True))
    Category = db.relationship("Category", backref=db.backref("Team"))

    def __repr__(self):
       return f'<Team>'
    
    def __repr__(self):
        return f"<Categoria(id={self.id}, nome='{self.name}')>"

class Referee(db.model):
    __tablename__ = 'Referee'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    User = db.relationship('User', beckref=db.backref('Referee', lazy=True))

    def __repr__(self):
        return f'<Juiz {self.name}>'

class Adress(db.model):
    __tablename__ = 'Adress'

    id = db.column(db.integer, primary_key=True)
    street = db.column(db.String(200), unique=True, nullable=False)
    district = db.column(db.String(200), unique=True, nullable=False)
    city = db.column(db.String(200), unique=True, nullable=False)
    state = db.column(db.String(200), unique=True, nullable=False)
    zip = db.column(db.String(50), unique=True, nullable=False)
    adress = db.column(db.String(200), unique=True, nullable=False)

    Adress = db.relationship('User', beckref=db.backref('Adress', lazy=True))

class Scheduling(db.model):
    __tablename__ = 'Scheduling'

    id = db.column(db.integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    local = db.column(db.string(100), unique=True, nullable=False)
    time = db.Column(db.time, nullable=False)
    price = db.column(db.Float)

    Scheduling = db.relationship('User', beckref=db.backref('agendamento', lazy=True))
    
    def __repr__(self):    
        return f"<Agendamento(id={self.id}, horario={self.time}, data={self.date})>"
    
class stats(db.model):
    __tablename__ = 'stats'

    id = db.column(db.integer, primary_key=True)
    matches = db.Column(db.Integer, nullable=False)
    victorys = db.Column(db.Integer, nullable=False)
    ties =  db.Column(db.Integer, nullable=False)
    defeats = db.Column(db.Integer, nullable=False)
    goals = db.Column(db.Integer, nullable=False)
    assists = db.Column(db.Integer, nullable=False)
    yellow_cards = db.Column(db.Integer, nullable=False)
    red_cards = db.Column(db.Integer, nullable=False)
    MOTM = db.Column(db.Integer, nullable=False)

    stats = db.relationship('User', beckref=db.backref('stats', lazy=True))
    
    def __repr__(self):    
        return f"<stats(id={self.id})>"

class team_stats(db.model):
    __tablename__ = 'team_stats'

    id = db.column(db.integer, primary_key=True)
    matches = db.Column(db.Integer, nullable=False)
    victorys = db.Column(db.Integer, nullable=False)
    ties =  db.Column(db.Integer, nullable=False)
    defeats = db.Column(db.Integer, nullable=False)
    goals = db.Column(db.Integer, nullable=False)
    assists = db.Column(db.Integer, nullable=False)
    yellow_cards = db.Column(db.Integer, nullable=False)
    red_cards = db.Column(db.Integer, nullable=False)
    highest_stiker = db.column(db.string, nullable=False)
    highest_assister = db.column(db.string, nullable=False)

    team_stats = db.relationship('team_stats', beckref=db.backref('equipe', lazy=True))

    def __repr__(self):    
        return f"<team_stats(id={self.id})>"