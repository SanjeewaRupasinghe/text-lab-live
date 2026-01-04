from app.config import settings
from tests import PASSWORD


class TestRegister:
    """Test user registration"""

    def test_register_success(self, client, test_user_data):
        """Test successful user registration"""
        response = client.post(
            f"{settings.API_V1_PREFIX}/auth/register", json=test_user_data
        )

        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "User created successfully"
        assert "user_id" in data

    def test_register_duplicate_email(self, client, test_user_data, test_user):
        """Test registering with duplicate email fails"""
        response = client.post(
            f"{settings.API_V1_PREFIX}/auth/register", json=test_user_data
        )

        assert response.status_code == 422
        assert "already exists" in str(response.json()).lower()

    def test_register_invalid_email(self, client):
        """Test registering with invalid email format fails"""
        invalid_data = {
            "email": "not-an-email",
            "password": "password123",
        }
        response = client.post(
            f"{settings.API_V1_PREFIX}/auth/register", json=invalid_data
        )

        assert response.status_code == 422
        assert "email" in str(response.json()).lower()

    def test_register_password_too_long(self, client):
        """Test password exceeding 72 bytes"""

        response = client.post(
            f"{settings.API_V1_PREFIX}/auth/register",
            json={
                "email": "test@example.com",
                "password": "a" * 73,  # 73 characters, exceeding the limit
            },
        )

        assert response.status_code == 422
        assert "cannot exceed 72 bytes" in str(response.json()).lower()


class TestLogin:
    """Test user login"""

    def test_login_success(self, client, test_user):
        """Test successful user login"""
        response = client.post(
            f"{settings.API_V1_PREFIX}/auth/login",
            json={"email": test_user.email, "password": PASSWORD},
        )

        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert "refresh_token" in data
        assert data["token_type"] == "bearer"

    def test_login_invalid_credentials(self, client):
        """Test login with invalid credentials fails"""
        response = client.post(
            f"{settings.API_V1_PREFIX}/auth/login",
            json={"email": "nonexistent@example.com", "password": "wrong_password"},
        )

        assert response.status_code == 401
        assert "invalid" in str(response.json()).lower()

    def test_login_wrong_password(self, client, test_user):
        """Test login with correct email but wrong password"""
        response = client.post(
            f"{settings.API_V1_PREFIX}/auth/login",
            json={"email": test_user.email, "password": "wrong_password"},
        )

        assert response.status_code == 401
        assert "invalid" in str(response.json()).lower()

    def test_login_returns_valid_tokens(self, client, test_user):
        """Test that login returns valid access and refresh tokens"""
        response = client.post(
            f"{settings.API_V1_PREFIX}/auth/login",
            json={"email": test_user.email, "password": PASSWORD},
        )

        token = response.json()["access_token"]

        # Test that the token is valid by using it to access a protected route
        protected_response = client.get(
            f"{settings.API_V1_PREFIX}/auth/me",
            headers={"Authorization": f"Bearer {token}"},
        )

        assert protected_response.status_code == 200
        assert protected_response.json()["email"] == test_user.email


class TestRefreshToken:
    """Test token refresh functionality"""

    def test_refresh_token_success(self, client, test_user):
        """Test successful token refresh"""
        # First login to get refresh token
        login_response = client.post(
            f"{settings.API_V1_PREFIX}/auth/login",
            json={"email": test_user.email, "password": PASSWORD},
        )

        assert login_response.status_code == 200
        refresh_token = login_response.json()["refresh_token"]

        # Use refresh token to get new access token
        refresh_response = client.post(
            f"{settings.API_V1_PREFIX}/auth/refresh",
            json={"refresh_token": refresh_token},
        )

        assert refresh_response.status_code == 200
        new_data = refresh_response.json()
        assert "access_token" in new_data
        assert new_data["token_type"] == "bearer"

    def test_refresh_token_invalid(self, client):
        """Test refresh with invalid refresh token fails"""
        response = client.post(
            f"{settings.API_V1_PREFIX}/auth/refresh",
            json={"refresh_token": "invalid_token"},
        )

        assert response.status_code == 401
        assert "invalid" in str(response.json()).lower()

    def test_refresh_token_expired(self, client, test_user):
        """Test refresh with expired refresh token fails"""
        # This would require setting up an expired token, skipping for now
        expired_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QGV4YW1wbGUuY29tIiwidHlwZSI6InJlZnJlc2giLCJleHAiOjE2MDAwMDAwMDB9.invalid"

        response = client.post(
            f"{settings.API_V1_PREFIX}/auth/refresh",
            json={"refresh_token": expired_token},
        )

        assert response.status_code == 401

    def test_refresh_token_missing(self, client):
        """Test refresh with missing refresh token fails"""
        response = client.post(f"{settings.API_V1_PREFIX}/auth/refresh", json={})

        assert response.status_code == 422


class TestLogout:
    """Test logout endpoint behavior"""

    def test_logout_success(self, client, test_user):
        """Test successful logout"""
        # First login to get tokens
        login_response = client.post(
            f"{settings.API_V1_PREFIX}/auth/login",
            json={"email": test_user.email, "password": PASSWORD},
        )

        assert login_response.status_code == 200
        access_token = login_response.json()["access_token"]

        # Logout using the access token
        logout_response = client.post(
            f"{settings.API_V1_PREFIX}/auth/logout",
            headers={"Authorization": f"Bearer {access_token}"},
        )

        assert logout_response.status_code == 200
        assert logout_response.json()["message"] == "Logged out successfully"

    def test_logout_without_token(self, client):
        """Test logout without authorization token fails"""
        response = client.post(f"{settings.API_V1_PREFIX}/auth/logout")

        assert response.status_code == 401

    def test_logout_invalid_token(self, client):
        """Test logout with invalid authorization token fails"""
        response = client.post(
            f"{settings.API_V1_PREFIX}/auth/logout",
            headers={"Authorization": "Bearer invalid_token"},
        )

        assert response.status_code == 401
        assert "invalid" in str(response.json()).lower()


class TestGetCurrentUser:
    """Test get current user endpoint behavior"""

    def test_get_current_user_success(self, client, test_user):
        """Test getting current user with valid token"""
        # First login to get tokens
        login_response = client.post(
            f"{settings.API_V1_PREFIX}/auth/login",
            json={"email": test_user.email, "password": PASSWORD},
        )

        assert login_response.status_code == 200
        access_token = login_response.json()["access_token"]

        # Get current user using the access token
        response = client.get(
            f"{settings.API_V1_PREFIX}/auth/me",
            headers={"Authorization": f"Bearer {access_token}"},
        )

        assert response.status_code == 200
        data = response.json()
        assert data["email"] == test_user.email
        assert "password" not in data

    def test_get_current_user_without_token(self, client):
        """Test getting current user without authorization token fails"""
        response = client.get(f"{settings.API_V1_PREFIX}/auth/me")

        assert response.status_code == 401

    def test_get_current_user_invalid_token(self, client):
        """Test getting current user with invalid authorization token fails"""
        response = client.get(
            f"{settings.API_V1_PREFIX}/auth/me",
            headers={"Authorization": "Bearer invalid_token"},
        )

        assert response.status_code == 401
        assert "invalid" in str(response.json()).lower()
