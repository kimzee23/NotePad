from pydantic import BaseModel

class NoteUpdateRequest(BaseModel):
    title: str
    content: str
