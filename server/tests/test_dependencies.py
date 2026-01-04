from app.config import settings


class TestGetCurrentUser:
    """Test get_current_user dependency"""

    def test_get_current_user_valid_token(self, client, auth_headers):
        """Test getting current user with valid token"""

        response = client.get(f"{settings.API_V1_PREFIX}/auth/me", headers=auth_headers)
        print("Response:", response.json())
        assert response.status_code == 200

    def test_get_current_user_invalid_token(self, client):
        """Test getting current user with invalid token"""
        response = client.get(
            f"{settings.API_V1_PREFIX}/auth/me", headers={"Authorization": "Bearer invalid_token"}
        )
        assert response.status_code == 401

    def test_get_current_user_without_token(self, client):
        """Test getting current user with missing token"""
        response = client.get(f"{settings.API_V1_PREFIX}/auth/me")
        assert response.status_code == 401

    def test_get_current_user_wrong_scheme(self, client, auth_token):
        """Test getting current user with wrong auth scheme"""
        response = client.get(
            f"{settings.API_V1_PREFIX}/auth/me", headers={"Authorization": f"Basic {auth_token}"}
        )
        assert response.status_code == 401
