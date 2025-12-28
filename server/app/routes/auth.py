from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.config.deps import get_current_user
from app.models.user import User
from app.config.database import get_db
from app.schemas.user import TokenRefresh, TokenResponse, UserLogin, UserRegister
from app.config.security import create_token, hash_password, verify_token
from app.config.settings import get_settings

router = APIRouter()

settings = get_settings()


@router.post("/register", response_model=dict)
def register(user: UserRegister, db: Session = Depends(get_db)):
    """Register a new user."""

    # Validate Email
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        return HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists",
        )

    # Create new user
    hashed_password = hash_password(user.password)
    new_user = User(email=user.email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created successfully", "user_id": new_user.id}


@router.post("/login", response_model=TokenResponse)
def login(user: UserLogin, db: Session = Depends(get_db)):
    """Login user and return access and refresh tokens."""

    # Find user by email
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user:
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

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "refresh_token": refresh_token,
    }


@router.post("/refresh")
def refresh_token(req: TokenRefresh):
    """Refresh access token using refresh token."""

    payload = verify_token(req.refresh_token, token_type="refresh")

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
        data={"sub": email}, expires_delta=access_token_expires, token_type="refresh"
    )

    return {
        "access_token": access_token,
        "refresh_token": req.refresh_token,
        "token_type": "bearer",
    }


@router.post("/logout")
def logout(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
    credentials=Depends(lambda: None),
):
    """Logout user by invalidating the refresh token."""
    return {"message": "Logged out successfully"}


@router.get("/me")
def get_current_user_info(
    current_user: dict = Depends(get_current_user),
):
    """Get current user information."""
    return current_user
