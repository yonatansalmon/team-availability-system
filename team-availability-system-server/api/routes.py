from flask import Blueprint, request, jsonify, g
from bson.objectid import ObjectId
from db.init_db import db
from models.users import User
from middleware.auth import validate_token
from models.users import User
import jwt
import datetime

bp = Blueprint('api', __name__)
bcrypt = None
app = None


def init_routes(app_obj, bcrypt_obj):
    global bcrypt, app
    bcrypt = bcrypt_obj
    app = app_obj
    app.register_blueprint(bp, url_prefix='/api')


@bp.route('/signup', methods=['POST'])
def add_user():
    try:
        data = request.json
        userName = data.get('userName')
        email = data.get('email')
        password = bcrypt.generate_password_hash(
            data.get('password')).decode('utf-8')
        status = data.get('status', 'Working')

        if User.find_by_userName(userName):
            return jsonify({"message": "Username already exists"}), 400

        new_user = User(userName, email, password, status)
        new_user.save()
        return jsonify({"ok": 'true'}), 201
    except Exception as e:
        return jsonify({"message": "An error occurred"}), 500


@bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')
        user = User.find_by_email(email)

        if not user or not bcrypt.check_password_hash(user['password'], password):
            return jsonify({"message": "Invalid username or password"}), 401

        token = jwt.encode({'id': str(user['_id']), 'exp': datetime.datetime.utcnow(
        ) + datetime.timedelta(hours=1)}, app.config['SECRET_KEY'])
        return jsonify({"token": token}), 200
    except Exception as e:
        return jsonify({"message": "An error occurred"}), 500


@bp.route('/update_status', methods=['POST'])
@validate_token
def update_status():
    try:
        data = request.json
        userId = data.get('id')
        status = data.get('status')
        User.update_status(userId, status)
        return jsonify({"message": "Status updated"}), 200
    except Exception as e:
        return jsonify({"message": "An error occurred"}), 500


@bp.route('/get_user', methods=['GET'])
@validate_token
def get_user():
    try:
        decoded_token = g.get('decoded_token', None)
        user = User.find_by_id(decoded_token["id"])
        if user:
            user['_id'] = str(user['_id'])
            return jsonify(user), 200
        else:
            return jsonify({"message": "User not found"}), 404
    except Exception as e:
        return jsonify({"message": "An error occurred"}), 500


@bp.route('/get_all_users', methods=['GET'])
@validate_token
def get_all_users():
    try:
        users = User.get_all_users()
        return jsonify(users), 200
    except Exception as e:
        print(e)
        return jsonify({"message": "An error occurred"}), 500
