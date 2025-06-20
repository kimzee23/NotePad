import email

from werkzeug.security import generate_password_hash, check_password_hash
from dtos.request.user_register_request import UserRegisterRequest
from dtos.request.user_login_request import UserLoginRequest
from dtos.response.user_response import UserResponse
from models.user_model import User
from repositories.user_repository import UserRepository
from exceptions.InvalidInputExecption import  InvalidInputException
from datetime import datetime

class UserService:
    @staticmethod
    def register_user(data: UserRegisterRequest) -> str:
        if UserRepository.email_exists(data.email):
            raise ValueError("Email already exists")

        hashed_pw = generate_password_hash(data.password)
        now = datetime.utcnow()

        user = User(
            id=None,
            username=data.username,
            email=data.email,
            phone=data.phone,
            password=hashed_pw,
            createdAt=now,
            updatedAt=now
        )

        return UserRepository.create_user(user)

    @staticmethod
    def authenticate_user(data: UserLoginRequest) -> UserResponse:
        print("🔍 Trying to log in with email:", data.email)

        user = UserRepository.find_by_email(data.email)
        if not user:
            print(" No user found with email:", data.email)
        else:
            print(" Found user:", user.email)
            print(" Checking password...")

        if not user or not check_password_hash(user.password, data.password):
            print(" Password mismatch or user not found")
            raise ValueError("Invalid email or password")

        print(" Password matched! Logging in:", user.username)

        return UserResponse(
            id=user.id,
            username=user.username,
            email=user.email,
            phone=user.phone,
            createdAt=user.createdAt,
            updatedAt=user.updatedAt
        )

    @staticmethod
    def get_user_by_id(user_id: str) -> UserResponse | None:
        user = UserRepository.find_by_id(user_id)
        if not user:
            return None

        return UserResponse(
            id=user.id,
            username=user.username,
            email=user.email,
            phone=user.phone,
            createdAt=user.createdAt,
            updatedAt=user.updatedAt
        )
