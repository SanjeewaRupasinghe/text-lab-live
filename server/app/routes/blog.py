from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.routes.auth import router
from app.config.database import get_db
from app.schemas.blog import BlogCreate, BlogList, BlogResponse
from app.crud.blog import blog as blog_crud

router = APIRouter()


@router.post("/", response_model=BlogResponse)
def create_blog(blog: BlogCreate, db: Session = Depends(get_db)):
    """
    Create a new blog post.
    Only accessible to authenticated users.
    """

    return blog_crud.create(db, blog)


@router.get("/", response_model=BlogList)
def get_blogs(db: Session = Depends(get_db)):
    """
    Get all blog posts.
    """
    blogs, total = blog_crud.get_all(db=db)
    return {"blogs": blogs, "total": total}


@router.get("/{blog_id}/id", response_model=BlogResponse)
def get_blog_by_id(blog_id: int, db: Session = Depends(get_db)):
    """
    Get a blog post by ID.
    Only accessible to authenticated users.
    """
    blog = blog_crud.get_by_id(db, blog_id)
    if not blog:
        # 404 - Blog not found
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Blog not found"
        )
    return blog

@router.get("/{slug}/slug", response_model=BlogResponse)
def get_blog_by_slug(slug: str, db: Session = Depends(get_db)):
    """
    Get a blog post by slug.
    """
    blog = blog_crud.get_by_slug(db, slug)
    if not blog:
        # 404 - Blog not found
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Blog not found"
        )
    return blog


@router.put("/{blog_id}", response_model=BlogResponse)
def update_blog(blog_id: int, blog: BlogCreate, db: Session = Depends(get_db)):
    """
    Update a blog post by ID.
    Only accessible to authenticated users.
    """
    updated_blog = blog_crud.update(db, blog_id, blog)
    if not updated_blog:
        # 404 - Blog not found
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Blog not found"
        )
    return updated_blog
