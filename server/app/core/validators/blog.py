from typing import Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.crud import blog as crud_blog


def validate_unique_slug(
    db: Session, slug: str, exclude_id: Optional[int] = None
) -> None:
    """Validate that the blog slug is unique."""
    # Check if slug exists for a different blog (if exclude_id is provided)
    existing = crud_blog.get_by_slug(db=db, slug=slug)
    if existing and existing.id != exclude_id:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
            detail=[
                {
                    "loc": ["body", "slug"],
                    "msg": "Slug already exists",
                    "type": "value_error",
                }
            ],
        )


def validate_blog(db: Session, slug: str, exclude_id: Optional[int] = None) -> None:
    """Validate blog data."""

    # Slug validation
    validate_unique_slug(db, slug, exclude_id)
