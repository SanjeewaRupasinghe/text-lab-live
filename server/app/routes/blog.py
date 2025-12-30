from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.validation.blog import get_blog_by_id_or_404, get_blog_by_slug_or_404
from app.models.blog import Blog
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
def get_blog_by_id(
    blog: Blog = Depends(get_blog_by_id_or_404),
):
    """
    Get a blog post by ID.
    Only accessible to authenticated users.
    """
    return blog


@router.get("/{slug}/slug", response_model=BlogResponse)
def get_blog_by_slug(blog: Blog = Depends(get_blog_by_slug_or_404)):
    """
    Get a blog post by slug.
    """
    return blog


@router.put("/{blog_id}", response_model=BlogResponse)
def update_blog(
    blog_in: BlogCreate,
    blog: Blog = Depends(get_blog_by_id_or_404),
    db: Session = Depends(get_db),
):
    """
    Update a blog post by ID.
    Only accessible to authenticated users.
    """
    return blog_crud.update(db=db, blog_db=blog, blog_in=blog_in)
