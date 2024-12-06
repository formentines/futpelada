from flask import render_template, request, redirect, url_for, flash
from flask_mail import Message
from app import db, mail
from models import User, Team
from itsdangerous import URLSafeTimedSerializer, BadSignature, SignatureExpired
from sqlalchemy.exc import IntegrityError
from werkzeug.security import generate_password_hash
from werkzeug.utils import secure_filename
import os

serializer = URLSafeTimedSerializer('sua-chave-secreta')

def generate_token(email):
    return serializer.dumps(email, salt='salt-resetar-senha')

# Função para verificar token
def verify_token(token, expiration=3600):
    try:
        email = serializer.loads(token, salt='salt-resetar-senha', max_age=expiration)
        return email
    except (SignatureExpired, BadSignature):
        return None
    
def allow_file(filename):
    allowed_extensions = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename.rsplit('.', 1)[1].lower() in allowed_extensions
    
def init_app(app):
    @app.route('/')
    def index():
        return render_template('index.html')
    
    @app.route('/register', methods=['GET', 'POST'])
    def register():
        if request.method == ['POST']:
            username = request.form.get('NOME DO USUÁRIO')
            email = request.form.get('E-MAIL')
            birth_date = request.form.get('DATA DE ANIVERSÁRIO')
            password = request.form.get('SENHA')
            confirm_password = request.form.get('CONFIRMAR SENHA')

            if not username or not email or not birth_date or not password or not confirm_password:
                return "Todos os campos são obrigatórios!", 400
            
            new_user = User(username=username, email=email, birth_date=birth_date, password=password)

            try:
                db.session.add(new_user)
                db.session.commit()
            
            except IntegrityError:
                db.session.rollback()
                return "Usuário ou E-mail já existe!", 400

            return redirect(url_for('affiliation'))
        
        return render_template('register.html')
    
    @app.route('/login', methods =['GET', 'POST'])
    def login():
        if request.method == ['POST']:
            username = request.form.get('NOME DE USUÁRIO')
            email = request.form.get('E-MAIL')
            password = request.form.get('SENHA')
            if username:
                result = db.session.execute(
                    'SELECT * FROM Usuarios WHERE username = :username',
                    {'username': username}
                ).fetchone()

            elif email:
                result = db.session.execute(
                    'SELECT * FROM Usuarios WHERE email = :email',
                    {'email': email}
                ).fetchone()

            if result:
                if result['password'] == password:
                    return redirect(url_for('index'))
            
            return "Usuário, E-Mail ou Senha incorretos!", 401
        
        return render_template('login.html')
    
    @app.route('forgotpassword', methods = ['GET', 'POST'])
    def forgotpassowrd():
        if request.method == ['POST']:
            username = request.form.get('NOME DE USUÁRIO')
            email = request.form.get('E-MAIL')

            if not username and not email:
                flash('Por favor, forneça um nome de usuário ou um e-mail.', 'danger')
                return redirect(url_for('forgotpassword'))

            if username:
                user = User.query.filter_by(username=username).first()
            elif email:
                user = User.query.filter_by(email=email).first()
            
            if user:
                token = generate_token(user.email)
                reset_link = url_for('resetpassword', token=token, _external=True)
                msg = Message('Redefinição de Senha', sender='seu-email@gmail.com', recipients=[user.email])
                msg.body = f'Clique no link para redefinir sua senha: {reset_link}'
                
                try:
                    app.mail.send(msg) 
                    flash('E-mail com o link de redefinição de senha enviado!', 'info')
                
                except:
                    flash('Erro ao enviar e-mail.', 'danger')
            
            else:
                flash('Não foi encontrado nenhum usuário com esse nome de usuário ou e-mail.', 'danger')

            return redirect(url_for('forgotpassword'))
        
        return render_template('forgotpassword.html')

    @app.route('/resetpassword/<token>', methods = ['GET', 'POST'])
    def resetpassword(token):
        email = verify_token(token)
        if email is None:
            flash('O token expirou ou é invalido!', 'danger')
            return redirect(url_for('forgotpassword'))
        
        if request.method == ['POST']:
            password = request.form.get('SENHA')
            hashed_password = generate_password_hash(password)

            user = User.query.filter_by(email=email).first()
            if user:
                user.password_hash = hashed_password
                db.session.commit
                flash('A senha foi redefinida com sucesso!', 'sucess')

                return redirect(url_for('index'))
        
        return render_template('resetpassword'), token==token   
    
    @app.route('/create_team', methods = ['GET', 'POST'])
    def createteam():
        if request.method == ['POST']:
            name = request.form.get('NOME DO TIME') 
            description = request.form.get('DESCRIÇÃO')
            social_media = request.form.get('REDES SOCIAIS')
            state = request.form.get('ESTADO')
            category = request.form.get('CATEGORIA')

            image = request.files.get('SELECIONAR IMAGEM')
            team_shield = None
            if image:
                if allow_file(image.filename):
                    filename = secure_filename(image.filename)
                    teamshield = os.path.json(app.config['UPLOAD_FOLDER'], filename)
                    image.save(teamshield)
            
            new_team = Team(name=name, description=description, team_shield=teamshield, social_media=social_media, category=category, state=state)
            
            db.session.add(new_team)
            db.session.commit()
            
            return redirect(url_for('index'))
        
        return render_template('create_team.html')