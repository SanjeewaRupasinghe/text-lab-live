from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime, timezone

from app.core.database import Base


class Blog(Base):
    __tablename__ = "blogs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    status = Column(String(50), default="draft") 
    published_at = Column(DateTime)
    feature_image = Column(String(500))
    faqs = Column(Text)  # JSON string
    slug = Column(String(255))
    meta_title = Column(String(255))
    meta_description = Column(Text)
    meta_keywords = Column(Text)
    category = Column(String(255))
    tags = Column(Text)
    custom_json_ld = Column(Text)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )
