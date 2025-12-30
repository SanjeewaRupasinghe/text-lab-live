from fastapi import APIRouter, Depends, HTTPException, status
from app.api.deps import get_current_user
from sqlalchemy.orm import Session

from app.crud import user as crud_user
from app.models.user import User
from app.core.database import get_db
from app.schemas.user import UserRegister, UserLogin, TokenResponse, TokenRefresh
from app.core.security import hash_password


router = APIRouter()


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
    user.password = hashed_password
    new_user = crud_user.create_user(db=db, obj_in=user)

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

    return crud_user.login(db=db, credentials=user)


@router.post("/refresh")
def refresh_token(req: TokenRefresh):
    """Refresh access token using refresh token."""

    return crud_user.refresh_token(req.refresh_token)


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
