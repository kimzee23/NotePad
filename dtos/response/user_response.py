from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserResponse(BaseModel):
    id: str
    username: str
    email: EmailStr
    phone: str
    createdAt: datetime
    updatedAt: datetime
