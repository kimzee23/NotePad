from models.user_model import User
from dtos.request.user_register_request import UserRegisterRequest
from dtos.response.user_response import UserResponse
from bson import ObjectId


def user_model_to_document(user: User) -> dict:
    return {
        "_id": ObjectId(user.id) if user.id else None,
        "username": user.username,
        "email": user.email,
        "phone": user.phone,
        "password": user.password,
        "createdAt": user.createdAt,
        "updatedAt": user.updatedAt
    }


def document_to_user_model(doc: dict) -> User:
    return User(
        id=str(doc.get("_id")),
        username=doc.get("username"),
        email=doc.get("email"),
        phone=doc.get("phone"),
        password=doc.get("password"),
        createdAt=doc.get("createdAt"),
        updatedAt=doc.get("updatedAt")
    )


def user_model_to_response_dto(user: User) -> UserResponse:
    return UserResponse(
        id=user.id,
        username=user.username,
        email=user.email,
        phone=user.phone,
        createdAt=user.createdAt,
        updatedAt=user.updatedAt
    )


def request_to_user_model(req: UserRegisterRequest, hashed_password: str) -> User:
    from datetime import datetime
    now = datetime.utcnow()
    return User(
        id=None,
        username=req.username,
        email=req.email,
        phone=req.phone,
        password=hashed_password,
        createdAt=now,
        updatedAt=now
    )
