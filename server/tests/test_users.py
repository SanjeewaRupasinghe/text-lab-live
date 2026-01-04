from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
import pytest

from tests import PASSWORD
from app.core.security import hash_password
from app.models.user import User


class TestUserModel:
    """Test User Model functionality"""

    def test_user_creation(self, db: Session, test_user_data):
        """Test basic user creation"""

        user = User(
            email=test_user_data["email"],
            hashed_password=hash_password(test_user_data["password"]),
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        assert user.id is not None
        assert user.email == test_user_data["email"]
        assert user.created_at is not None

    def test_user_email_unique(self, db: Session, test_user_data):
        """Test that user email is unique"""

        user = User(
            email=test_user_data["email"],
            hashed_password=hash_password(test_user_data["password"]),
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        # Now try to create another user with the same email - should fail
        duplicate_user = User(
            email=test_user_data["email"],
            hashed_password=hash_password("another_password"),
        )
        db.add(duplicate_user)
        
        with pytest.raises(IntegrityError):
            db.commit()
        db.rollback()  # Clean up the failed transaction

        assert True  # Test passed - duplicate email correctly rejected
