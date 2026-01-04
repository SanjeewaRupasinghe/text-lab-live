from typing import Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.models.user import User


def validate_unique_email(
    db: Session, email: str, exclude_id: Optional[int] = None
) -> None:
    """Validate that the user email is unique."""
    existing = db.query(User).filter(User.email == email).first()
    if existing and existing.id != exclude_id:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
            detail=[
                {
                    "loc": ["body", "email"],
                    "msg": "Email already exists",
                    "type": "value_error",
                }
            ],
        )


def validate_user(db: Session, email: str, exclude_id: Optional[int] = None) -> None:
    """Validate user data."""

    # Email validation
    validate_unique_email(db=db, email=email, exclude_id=exclude_id)
