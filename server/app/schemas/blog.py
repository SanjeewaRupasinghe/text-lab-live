from pydantic import BaseModel, ConfigDict, field_validator
from datetime import datetime


class BlogBase(BaseModel):
    """
    Base schema for blog posts.
    """

    title: str
    description: str | None = None
    status: str = "draft"
    feature_image: str | None = None
    faqs: str | None = None
    slug: str | None = None
    meta_title: str | None = None
    meta_description: str | None = None
    meta_keywords: str | None = None
    custom_json_ld: str | None = None
    published_at: datetime | None = None
    category: str | None = None
    tags: str | None = None

    # Validation rules for blog fields
    @field_validator("title")
    @classmethod
    def validate_title(cls, v):
        if not v:
            raise ValueError("Title must not be empty")
        if len(v) > 255:
            raise ValueError("Title must be at most 255 characters")
        return v

    # Validation rules for description
    @field_validator("description")
    @classmethod
    def validate_description(cls, v):
        if not v:
            raise ValueError("Description must not be empty")
        return v

    # Validation rules for slug
    @field_validator("slug")
    @classmethod
    def validate_slug(cls, v):
        if not v:
            raise ValueError("Slug must not be empty")
        return v

    model_config = ConfigDict(from_attributes=True)


class BlogCreate(BlogBase):
    """
    Schema for creating a new blog post.
    """

    pass


class BlogResponse(BlogBase):
    """
    Schema for returning a blog post response.
    """

    id: int
    created_at: datetime
    updated_at: datetime

class BlogList(BaseModel):
    """
    Schema for returning a list of blog posts.
    """
    
    blogs: list[BlogResponse]
    total: int

    model_config = ConfigDict(from_attributes=True)

__all__ = ["BlogCreate", "BlogResponse", "BlogList"]
