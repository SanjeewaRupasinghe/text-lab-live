import json
from random import choice, randint
from faker import Faker
from sqlalchemy.orm import Session

fake = Faker()

# ============================================
# BLOGS FACTORIES
# ============================================


class BlogFactory:
    """Generate fake blogs for testing."""

    @staticmethod
    def create_data():
        """Create a fake blog instance."""
        title = fake.catch_phrase()

        return {
            "title": title,
            "description": fake.text(max_nb_chars=200),
            "slug": fake.slug(),
            "category": choice(
                ["Technology", "Business", "Lifestyle", "Travel", "Food"]
            ),
            "tags": ", ".join([fake.word() for _ in range(3)]),
            "status": choice(["draft", "published"]),
            "meta_title": fake.text(max_nb_chars=60),
            "meta_description": fake.text(max_nb_chars=160),
            "meta_keywords": ", ".join([fake.word() for _ in range(5)]),
            "custom_json_ld": json.dumps(
                {
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    "headline": title,
                    "description": fake.text(max_nb_chars=100),
                }
            ),
            "faqs": json.dumps(
                [
                    {
                        "question": fake.sentence(),
                        "answer": fake.text(max_nb_chars=100),
                    }
                    for _ in range(randint(1, 3))
                ]
            ),
        }

    @staticmethod
    def create_blog(db: Session, **kwargs):
        from app.models.blog import Blog

        # Create obj
        data = BlogFactory.create_data()
        data.update(kwargs)

        # Blog instance
        blog = Blog(**data)

        # Create
        db.add(blog)
        db.flush()  # Flush to get the ID without committing
        db.commit()
        db.refresh(blog)
        return blog

    @staticmethod
    def create_many_blogs(db: Session, count: int = 5):
        """Create multiple blogs for testing."""
        blogs = []

        for _ in range(count):
            blog = BlogFactory.create_blog(db=db)
            blogs.append(blog)
        return blogs


# ============================================
# END BLOG FACTORIES
# ============================================


# ============================================
# IMAGE FACTORIES
# ============================================


class ImageFactory:
    """Generate the fake images"""

    @staticmethod
    def get_sample_image_bytes():
        """Return sample image bytes for testing."""
        # Minimal 1x1 PNG image (valid image file)
        png_bytes = (
            b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01"
            b"\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\x0cIDATx\x9cc\xf8\x0f\x00"
            b"\x00\x01\x01\x00\x05\x18\r\xb6\x00\x00\x00\x00IEND\xaeB`\x82"
        )
        return png_bytes


# ============================================
# END IMAGE FACTORIES
# ============================================
