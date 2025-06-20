from datetime import datetime

class User:
    def __init__(self, id, username, email, phone, password, createdAt=None, updatedAt=None):
        self.id = id
        self.username = username
        self.email = email
        self.phone = phone
        self.password = password
        self.createdAt = createdAt or datetime.utcnow()
        self.updatedAt = updatedAt or datetime.utcnow()
