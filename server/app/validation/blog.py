from fastapi import Depends
from sqlalchemy.orm import Session

from app.crud.blog import blog as blog_crud
from app.schemas.blog import BlogResponse
from app.config.database import get_db


def get_blog_by_id_or_404(blog_id: int, db: Session = Depends(get_db)) -> BlogResponse:
    """Get a blog post by ID or raise 404 if not found."""

    blog = blog_crud.get_by_id(db, blog_id)
    if not blog:
        from fastapi import HTTPException, status

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Blog not found"
        )
    return blog


def get_blog_by_slug_or_404(slug: str, db: Session = Depends(get_db)) -> BlogResponse:
    """Get a blog post by slug or raise 404 if not found."""

    blog = blog_crud.get_by_slug(db, slug)
    if not blog:
        from fastapi import HTTPException, status

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Blog not found"
        )
    return blog
