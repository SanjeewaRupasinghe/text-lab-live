from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer
from app.core.database import get_db
from app.core.security import verify_token
from app.models.user import User
from sqlalchemy.orm import Session


from app.schemas.blog import BlogResponse
from app.crud.blog import blog as blog_crud

security = HTTPBearer()


async def get_current_user(
    credentials: HTTPBearer = Depends(security), db: Session = Depends(get_db)
) -> dict:
    token = credentials.credentials
    payload = verify_token(token)

    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token"
        )

    email = payload.get("sub")

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found"
        )

    return {"user_id": user.id, "email": user.email}


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
