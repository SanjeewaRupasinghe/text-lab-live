from pydantic import BaseModel, EmailStr, field_validator


class UserRegister(BaseModel):
    """User registration schema"""

    email: EmailStr
    password: str

    @field_validator("password")
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters long")
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
