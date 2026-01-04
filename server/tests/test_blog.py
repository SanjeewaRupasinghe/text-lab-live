from app.config import settings


class TestBlogCreate:
    def test_create_blog(self, client, auth_headers, blog_data):
        """Test creating a blog"""
        response = client.post(
            f"{settings.API_V1_PREFIX}/blogs", json=blog_data, headers=auth_headers
        )
        assert response.status_code == 200
        data = response.json()
        assert data["title"] == blog_data["title"]
        assert data["description"] == blog_data["description"]
        assert data["slug"] == blog_data["slug"]

    def test_create_blog_with_only_required_fields(
        self, client, auth_headers, blog_data
    ):
        """Test creating a blog with only required fields"""
        # Use the existing blog_data but remove optional fields
        required_blog_data = {
            "title": blog_data["title"],
            "description": blog_data["description"],
            "slug": blog_data["slug"],
        }
        response = client.post(
            f"{settings.API_V1_PREFIX}/blogs",
            json=required_blog_data,
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert data["title"] == required_blog_data["title"]
        assert data["description"] == required_blog_data["description"]
        assert data["slug"] == required_blog_data["slug"]
        assert data["created_at"] is not None
        assert data["updated_at"] is not None

    def test_create_blog_missing_required_fields(self, client, auth_headers):
        """Test creating a blog without required fields should fail"""
        blog_data = {}
        response = client.post(
            f"{settings.API_V1_PREFIX}/blogs", json=blog_data, headers=auth_headers
        )
        assert response.status_code == 422

    def test_create_blog_with_invalid_slug(self, client, auth_headers, blog_data):
        """Test creating a blog with an invalid slug"""
        blog_data["slug"] = "invalid slug with spaces"
        response = client.post(
            f"{settings.API_V1_PREFIX}/blogs", json=blog_data, headers=auth_headers
        )
        assert response.status_code == 200
        data = response.json()
        assert data["slug"] == "invalid-slug-with-spaces"  # slug should be normalized
        assert data["title"] == blog_data["title"]
        assert data["description"] == blog_data["description"]

    def test_create_blog_with_duplicate_slug(self, client, auth_headers, blog_data):
        """Test creating a blog with a duplicate slug should fail"""
        # First create a blog
        response1 = client.post(
            f"{settings.API_V1_PREFIX}/blogs", json=blog_data, headers=auth_headers
        )
        assert response1.status_code == 200

        # Try to create another blog with the same slug
        response2 = client.post(
            f"{settings.API_V1_PREFIX}/blogs", json=blog_data, headers=auth_headers
        )
        assert response2.status_code == 422

    def test_create_blog_with_empty_fields(self, client, auth_headers):
        """Test creating a blog with empty fields"""
        blog_data = {"title": "", "description": "", "slug": ""}
        response = client.post(
            f"{settings.API_V1_PREFIX}/blogs", json=blog_data, headers=auth_headers
        )
        assert response.status_code == 422

    def test_create_blog_with_special_characters_in_slug(
        self, client, auth_headers, blog_data
    ):
        """Test creating a blog with special characters in slug"""
        blog_data["slug"] = "slug-with-special-chars-!@#$%^&*()"
        response = client.post(
            f"{settings.API_V1_PREFIX}/blogs", json=blog_data, headers=auth_headers
        )
        assert response.status_code == 200
        data = response.json()
        # Special characters should be normalized or handled appropriately
        assert data["slug"] is not None

    def test_create_blog_without_auth(self, client, blog_data):
        """Test creating a blog without authentication should fail"""
        response = client.post(f"{settings.API_V1_PREFIX}/blogs", json=blog_data)
        assert response.status_code == 401

    def test_create_blog_with_invalid_auth_token(self, client, blog_data):
        """Test creating a blog with an invalid auth token should fail"""
        response = client.post(
            f"{settings.API_V1_PREFIX}/blogs",
            json=blog_data,
            headers={"Authorization": "Bearer invalid_token"},
        )
        assert response.status_code == 401

