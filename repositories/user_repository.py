from app import mongo
from bson import ObjectId
from models.user_model import User

class UserRepository:
    @staticmethod
    def create_user(user: User) -> str:
        user_data = {
            "username": user.username,
            "email": user.email,
            "phone": user.phone,
            "password": user.password,
            "createdAt": user.createdAt,
            "updatedAt": user.updatedAt
        }
        result = mongo.db.users.insert_one(user_data)
        return str(result.inserted_id)

    @staticmethod
    def email_exists(email: str) -> bool:
        return mongo.db.users.find_one({"email": email}) is not None

    @staticmethod
    def find_by_email(email: str) -> User | None:
        doc = mongo.db.users.find_one({"email": email})
        if doc:
            return User(
                id=str(doc["_id"]),
                username=doc["username"],
                email=doc["email"],
                phone=doc["phone"],
                password=doc["password"],
                createdAt=doc.get("createdAt"),
                updatedAt=doc.get("updatedAt")
            )
        return None

    @staticmethod
    def find_by_id(user_id: str) -> User | None:
        doc = mongo.db.users.find_one({"_id": ObjectId(user_id)})
        if doc:
            return User(
                id=str(doc["_id"]),
                username=doc["username"],
                email=doc["email"],
                phone=doc["phone"],
                password=doc["password"],
                createdAt=doc.get("createdAt"),
                updatedAt=doc.get("updatedAt")
            )
        return None
