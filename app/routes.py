from flask import render_template, request, redirect, url_for
from app import db
from app.models import Usuario
from sqlalchemy.exc import IntegrityError


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
            
            new_user = Usuario(username=username, email=email, birth_date=birth_date, password=password)

            try:
                db.session.add(new_user)
                db.session.commit()

            except IntegrityError:
                db.session.rollback()
                return "Usuário ou E-mail já existe!", 400

            return redirect(url_for('login'))
        
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
    