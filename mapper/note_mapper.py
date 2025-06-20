from models.note_model import Note
from bson import ObjectId

def document_to_note(doc: dict) -> Note:
    return Note(
        id=str(doc.get('_id')),
        title=doc['title'],
        content=doc['content'],
        user_id=doc['user_id'],
        createdAt=doc['createdAt'],
        updatedAt=doc['updatedAt']
    )

def note_to_dict(note: Note) -> dict:
    return {
        "title": note.title,
        "content": note.content,
        "user_id": note.user_id,
        "createdAt": note.createdAt,
        "updatedAt": note.updatedAt
    }
