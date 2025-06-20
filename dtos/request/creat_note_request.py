from pydantic import BaseModel

class NoteCreateRequest(BaseModel):
    title: str
    content: str
    user_id: str
