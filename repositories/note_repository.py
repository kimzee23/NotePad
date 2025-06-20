from app import mongo
from bson import ObjectId

class NoteRepository:
    @staticmethod
    def create_note(note: dict) -> str:
        result = mongo.db.notes.insert_one(note)
        return str(result.inserted_id)

    @staticmethod
    def get_notes_by_user(user_id: str) -> list[dict]:
        return list(mongo.db.notes.find({"user_id": user_id}))

    @staticmethod
    def update_note_by_id(note_id: str, update_fields: dict) -> bool:
        result = mongo.db.notes.update_one(
            {"_id": ObjectId(note_id)},
            {"$set": update_fields}
        )
        return result.modified_count > 0

    @staticmethod
    def delete_note(note_id: str) -> bool:
        result = mongo.db.notes.delete_one({"_id": ObjectId(note_id)})
        return result.deleted_count > 0
