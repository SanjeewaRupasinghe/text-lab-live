from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session

from app.services.image_service import ImageUploadService
from app.schemas.blog import BlogResponse, BlogList, BlogCreate
from app.core.database import get_db
from app.api.deps import (
    get_blog_by_id_or_404,
    get_blog_by_slug_or_404,
    get_current_user,
)
from app.crud.blog import blog as blog_crud
from app.models.blog import Blog
from app.core.validators.blog import validate_blog

router = APIRouter()


@router.post("/", response_model=BlogResponse)
def create_blog(
    blog: BlogCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),  # Authenticated user
):
    """
    Create a new blog post.
    Only accessible to authenticated users.
    """

    # Validate blog data
    validate_blog(db=db, slug=blog.slug)

    return blog_crud.create(db=db, obj_in=blog)


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
    current_user: dict = Depends(get_current_user),  # Authenticated user
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
    current_user: dict = Depends(get_current_user),  # Authenticated user
):
    """
    Update a blog post by ID.
    Only accessible to authenticated users.
    """

    # Validate blog data
    validate_blog(db=db, slug=blog_in.slug, exclude_id=blog.id)

    return blog_crud.update(db=db, blog_db=blog, blog_in=blog_in)


@router.post("/{blog_id}/image")
async def upload_blog_image(
    blog: Blog = Depends(get_blog_by_id_or_404),
    feature_image: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),  # Authenticated user
):
    """
    Upload an image for a blog post.
    """

    # Upload and validate an image file.
    new_feature_image_url = ImageUploadService.upload_image(file=feature_image)

    # delete existing image if one exists
    if blog.feature_image:
        ImageUploadService.delete_image(blog.feature_image)

    # Update the blog with the image URL
    blog.feature_image = new_feature_image_url
    db.commit()
    db.refresh(blog)

    return blog
