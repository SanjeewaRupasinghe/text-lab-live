from fastapi import UploadFile
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
import pytest
from fastapi.testclient import TestClient

from tests.factories.factories import BlogFactory, ImageFactory
from app.config import settings
from app.main import app
from app.core.database import Base, get_db
from app.models import User, Blog
from app.core.security import hash_password

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ============================================
# USER & AUTH FIXTURES
# ============================================


@pytest.fixture(scope="function")
def db():
    """Create fresh database for each testing."""

    # Create tables
    Base.metadata.create_all(bind=engine)

    db_session = TestingSessionLocal()
    yield db_session

    # Cleanup
    db_session.close()
    Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="function")
def client(db: Session):
    """Create test client with database dependency."""

    def override_get_db():
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db

    return TestClient(app)


@pytest.fixture
def test_user_data():
    return {"email": "test@example.com", "password": "password123"}


@pytest.fixture
def test_user(db: Session, test_user_data):
    """Create a test user in the database."""

    hashed_password = hash_password(test_user_data["password"])
    user = User(email=test_user_data["email"], hashed_password=hashed_password)

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


@pytest.fixture
def auth_token(client: TestClient, test_user, test_user_data):
    """Get valid JWT token for testing"""

    response = client.post(
        f"{settings.API_V1_PREFIX}/auth/login",
        json={"email": test_user.email, "password": test_user_data["password"]},
    )

    assert response.status_code == 200
    return response.json()["access_token"]


@pytest.fixture
def auth_headers(auth_token):
    """Get authorization headers for testing"""
    return {"Authorization": f"Bearer {auth_token}"}


# ============================================
# USER & AUTH FIXTURES
# ============================================

# ============================================
# BLOGS FIXTURES
# ============================================


@pytest.fixture
def blog_data():
    """Get test blog data using factory."""
    return BlogFactory.create_data()


@pytest.fixture
def create_blog(db: Session, blog_data):
    """Create a test blog in the database."""
    return BlogFactory.create_blog(db=db, **blog_data)


@pytest.fixture
def multiple_published_blogs(db: Session, test_user, blog_data):
    """Create published blogs"""

    blogs = []
    for _ in range(5):
        blog_data = BlogFactory.create_data()
        blog_data["status"] = "published"
        blog = Blog(**blog_data)
        db.add(blog)
        blogs.append(blog)
    db.commit()
    return blogs


@pytest.fixture
def multiple_drafted_blogs(db: Session, test_user, blog_data):
    """Create draft blogs"""

    blogs = []
    for _ in range(5):
        blog_data = BlogFactory.create_data()
        blog_data["status"] = "draft"
        blog = Blog(**blog_data)
        db.add(blog)
        blogs.append(blog)
    db.commit()
    return blogs


# ============================================
# END BLOGS FIXTURES
# ============================================


# ============================================
# IMAGE FIXTURES
# ============================================


@pytest.fixture
def sample_image():
    """Get sample image for testing."""
    return ImageFactory.get_sample_image_bytes()


@pytest.fixture
def sample_upload_file(sample_image):
    """Get sample upload file for testing."""
    return UploadFile(
        file=sample_image,
        filename="test_image.png",
        sisze=len(sample_image.getvalue()),
    )


# ============================================
# END IMAGE FIXTURES
# ============================================
