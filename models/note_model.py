from datetime import datetime

class Note:
    def __init__(self, id, title, content, user_id, createdAt=None, updatedAt=None):
        self.id = id
        self.title = title
        self.content = content
        self.user_id = user_id
        self.createdAt = createdAt or datetime.utcnow()
        self.updatedAt = updatedAt or datetime.utcnow()
