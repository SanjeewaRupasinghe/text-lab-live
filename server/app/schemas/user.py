from pydantic import BaseModel, EmailStr, field_validator


class UserRegister(BaseModel):
    """User registration schema"""

    email: EmailStr
    password: str

    @field_validator("password")
    @classmethod
    def validate_password(cls,v:str) ->str:
        """Validate password doesn't exceed bcrypt's 72 byte limit"""
        if len(v.encode("utf-8")) > 72:
            raise ValueError("Password cannot exceed 72 bytes")
        return v


class UserLogin(BaseModel):
    """User login schema"""

    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    """Token response schema"""

    access_token: str
    refresh_token: str
    token_type: str


class TokenRefresh(BaseModel):
    """Token refresh schema"""

    refresh_token: str
