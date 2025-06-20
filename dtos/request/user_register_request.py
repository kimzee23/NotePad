from pydantic import BaseModel, EmailStr, model_validator

class UserRegisterRequest(BaseModel):
    username: str
    email: EmailStr
    phone: str
    password: str
    confirm_password: str

    @model_validator(mode="after")
    def validate_passwords(self):
        if self.password != self.confirm_password:
            raise ValueError("Passwords do not match")
        return self
