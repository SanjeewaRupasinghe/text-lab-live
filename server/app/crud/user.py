from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta

from app.schemas.user import TokenResponse, UserLogin, UserRegister
from app.models.user import User
from app.core.security import (
    verify_password,
    create_token,
    verify_token,
)
from app.config import settings


class CRUDUser:
    def create_user(self, db: Session, obj_in: UserRegister) -> User:
        """
        Create a new user in the database.
        """

        # Create user
        db_user = User(email=obj_in.email, hashed_password=obj_in.password)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    def login(self, db: Session, credentials: UserLogin) -> TokenResponse:
        """
        Authenticate user and return access and refresh tokens.
        """

        # Find user by email
        db_user = db.query(User).filter(User.email == credentials.email).first()
        if not db_user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )

        # Verify password
        if not verify_password(credentials.password, db_user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )

        # Access token
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_token(
            data={"sub": db_user.email}, expires_delta=access_token_expires
        )

        # Refresh token
        refresh_token_expires = timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
        refresh_token = create_token(
            data={"sub": db_user.email},
            expires_delta=refresh_token_expires,
            token_type="refresh",
        )

        return TokenResponse(
            access_token=access_token,
            token_type="bearer",
            refresh_token=refresh_token,
        )

    def refresh_token(self, refresh_token: str):
        payload = verify_token(refresh_token, token_type="refresh")

        if payload is None or payload.get("type") != "refresh":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token",
            )

        email = payload.get("sub")
        if not email:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token",
            )

        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_token(
            data={"sub": email},
            expires_delta=access_token_expires,
            token_type="refresh",
        )

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
        }


user = CRUDUser()
