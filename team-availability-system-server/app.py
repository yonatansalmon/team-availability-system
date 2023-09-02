from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
from db.init_db import db
import os

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")

bcrypt = Bcrypt(app)
CORS(app)


from api.routes import init_routes
init_routes(app, bcrypt)


def seed_db():
    existing_users_count = db.users.count_documents({})
    print(existing_users_count)
    if existing_users_count < 2:
        users = [
            {"userName": "John Doe", "email": "john@example.com", "password": "HLG4uqIS1hpohElfS2GMvpTdaIFGFC9aq842", "status": "Working"},
            {"userName": "Jane Doe", "email": "jane@example.com", "password": "90qr71r7u901u", "status": "Working Remotely"},
            {"userName": "Mark Anthony", "email": "mark@example.com", "password": "90qr71r7u901u", "status": "On Vacation"},
            {"userName": "Fred Franks", "email": "fred@example.com", "password": "90qr71asfasr7u901u", "status": "On Vacation"},
        ]
        db.users.insert_many(users)
seed_db()

if __name__ == '__main__':
    seed_db()
    app.run(debug=True)
