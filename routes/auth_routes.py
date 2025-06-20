from flask import Blueprint, request, jsonify, session
from dtos.request.user_register_request import UserRegisterRequest
from dtos.request.user_login_request import UserLoginRequest
from services.user_service import UserService
from exceptions.InvalidInputExecption import  InvalidInputException

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data:
        return jsonify({"msg": "Missing JSON data"}), 400

    try:
        register_dto = UserRegisterRequest(**data)
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    try:
        user_id = UserService.register_user(register_dto)
        return jsonify({"msg": "Registration successful", "user_id": user_id}), 201
    except InvalidInputException as e:
        return jsonify({"msg": str(e)}), 400
    except ValueError as e:
        return jsonify({"msg": str(e)}), 409


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({"msg": "Missing JSON data"}), 400

    try:
        login_dto = UserLoginRequest(**data)
        user_response = UserService.authenticate_user(login_dto)
        session['user_id'] = user_response.id
        return jsonify({"msg": f"Welcome back {user_response.username}", "user_id": user_response.id}), 200
    except (InvalidInputException, ValueError) as e:
        return jsonify({"msg": str(e)}), 401


@auth_bp.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"msg": "Logout successful"}), 200
