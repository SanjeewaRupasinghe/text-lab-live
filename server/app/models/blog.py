from app.core.database import Base
from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime


class Blog(Base):
    __tablename__ = "blogs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    status = Column(
        String(50),
        default="draft",
        server_default="draft",
        server_onupdate="draft",
        type_enums=["draft", "published"],
    )
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
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
