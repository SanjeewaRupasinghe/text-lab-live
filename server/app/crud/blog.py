from sqlalchemy.orm import Session

from app.models.blog import Blog
from app.schemas.blog import BlogCreate


class CRUDBlog:
    def create(self, db: Session, obj_in: BlogCreate) -> Blog:
        """
        Create a new blog post.
        """
        blog = Blog(
            title=obj_in.title,
            description=obj_in.description,
            status=obj_in.status,
            feature_image=obj_in.feature_image,
            faqs=obj_in.faqs,
            slug=obj_in.slug,
            meta_title=obj_in.meta_title,
            meta_description=obj_in.meta_description,
            meta_keywords=obj_in.meta_keywords,
            custom_json_ld=obj_in.custom_json_ld,
            published_at=obj_in.published_at,
            category=obj_in.category,
            tags=obj_in.tags,
        )
        db.add(blog)
        db.commit()
        db.refresh(blog)
        return blog

    def get_by_id(self, db: Session, blog_id: int) -> Blog | None:
        """
        Get a blog post by ID.
        """
        return db.query(Blog).filter(Blog.id == blog_id).first()

    def get_by_slug(self, db: Session, slug: str) -> Blog | None:
        """
        Get a blog post by slug.
        """
        return db.query(Blog).filter(Blog.slug == slug).first()

    def get_all(self, db: Session) -> tuple[list[Blog], int]:
        """
        Get all blog posts.
        """
        blogs = db.query(Blog).all()
        total = len(blogs)
        return blogs, total

    def update(self, db: Session, blog_db: Blog, blog_in: BlogCreate) -> Blog | None:
        """
        Update a blog post.
        """
        for key, value in blog_in.model_dump(exclude_unset=True).items():
            setattr(blog_db, key, value)
        db.commit()
        db.refresh(blog_db)
        return blog_db


blog = CRUDBlog()
