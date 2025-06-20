from datetime import datetime
from repositories.note_repository import NoteRepository

class NoteService:
    @staticmethod
    def create_note(data):
        now = datetime.utcnow()
        note = {
            "title": data.title,
            "content": data.content,
            "user_id": data.user_id,
            "createdAt": now,
            "updatedAt": now
        }
        note_id = NoteRepository.create_note(note)
        return {"msg": "Note created", "note_id": note_id}

    @staticmethod
    def get_notes_by_user(user_id: str):
        notes = NoteRepository.get_notes_by_user(user_id)
        return [{
            "id": str(note["_id"]),
            "title": note["title"],
            "content": note["content"],
            "createdAt": note["createdAt"].isoformat(),
            "updatedAt": note["updatedAt"].isoformat(),
        } for note in notes]

    @staticmethod
    def update_note(note_id: str, data):
        update_fields = {
            "title": data.title,
            "content": data.content,
            "updatedAt": datetime.utcnow()
        }
        updated = NoteRepository.update_note_by_id(note_id, update_fields)
        if not updated:
            return {"msg": "Note not found or not updated"}, 404
        return {"msg": "Note updated successfully"}, 200
