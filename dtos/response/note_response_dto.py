from pydantic import BaseModel
from datetime import datetime

class NoteResponse(BaseModel):
    id: str
    title: str
    content: str
    createdAt: datetime
    updatedAt: datetime
