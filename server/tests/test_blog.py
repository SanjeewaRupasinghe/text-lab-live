from app.config import settings
from app.services.image_service import ImageUploadService
from tests.factories.factories import ImageFactory


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


class TestBlogUpdate:
    """Test blog update endpoints"""

    def test_update_blog(self, client, auth_headers, create_blog, blog_data):
        """Test updating a blog"""
        update_blog_data = blog_data
        response = client.put(
            f"{settings.API_V1_PREFIX}/blogs/{create_blog.id}",
            json=update_blog_data,
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert data["title"] == update_blog_data["title"]
        assert data["description"] == update_blog_data["description"]
        assert data["slug"] == update_blog_data["slug"]

    def test_update_blog_without_auth(self, client, create_blog, blog_data):
        """Test updating a blog without authentication should fail"""
        update_blog_data = blog_data
        response = client.put(
            f"{settings.API_V1_PREFIX}/blogs/{create_blog.id}", json=update_blog_data
        )
        assert response.status_code == 401

    def test_update_nonexistent_blog(self, client, auth_headers, blog_data):
        """Test updating a non-existent blog should fail"""
        update_blog_data = blog_data
        response = client.put(
            f"{settings.API_V1_PREFIX}/blogs/999",
            json=update_blog_data,
            headers=auth_headers,
        )
        assert response.status_code == 404

    def test_update_blog_with_invalid_id(self, client, auth_headers):
        """Test updating a blog with an invalid ID should fail"""
        update_data = {"title": "Updated Title"}
        response = client.put(
            f"{settings.API_V1_PREFIX}/blogs/invalid-id",
            json=update_data,
            headers=auth_headers,
        )
        assert response.status_code == 422  # Validation error for invalid ID

    def test_update_blog_with_empty_title(
        self, client, auth_headers, create_blog, blog_data
    ):
        """Test updating a blog with empty title should fail"""
        update_blog_data = blog_data
        update_blog_data["title"] = ""
        response = client.put(
            f"{settings.API_V1_PREFIX}/blogs/{create_blog.id}",
            json=update_blog_data,
            headers=auth_headers,
        )
        assert response.status_code == 422  # Validation error for empty title

    def test_update_blog_with_empty_description(
        self, client, auth_headers, create_blog, blog_data
    ):
        """Test updating a blog with empty description should fail"""
        update_blog_data = blog_data
        update_blog_data["description"] = ""
        response = client.put(
            f"{settings.API_V1_PREFIX}/blogs/{create_blog.id}",
            json=update_blog_data,
            headers=auth_headers,
        )
        assert response.status_code == 422  # Empty description should not be allowed

    def test_update_blog_with_same_slug(
        self, client, auth_headers, create_blog, blog_data
    ):
        """Test updating a blog with the same slug should succeed"""
        update_blog_data = blog_data
        update_blog_data["slug"] = create_blog.slug
        response = client.put(
            f"{settings.API_V1_PREFIX}/blogs/{create_blog.id}",
            json=update_blog_data,
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert data["title"] == update_blog_data["title"]
        assert data["description"] == update_blog_data["description"]
        assert data["slug"] == create_blog.slug

    def test_update_blog_with_different_slug(
        self, client, auth_headers, create_blog, blog_data
    ):
        """Test updating a blog with a different slug should succeed"""
        update_blog_data = blog_data
        update_blog_data["slug"] = "different-slug"
        response = client.put(
            f"{settings.API_V1_PREFIX}/blogs/{create_blog.id}",
            json=update_blog_data,
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert data["title"] == update_blog_data["title"]
        assert data["description"] == update_blog_data["description"]
        assert data["slug"] == "different-slug"


class TestBlogRead:
    """Test blog read endpoints"""

    def test_get_blogs_while_not_exists(self, client):
        """Test getting blogs when none exist"""
        response = client.get(f"{settings.API_V1_PREFIX}/blogs")
        assert response.status_code == 200
        data = response.json()
        assert data["blogs"] == []
        assert data["total"] == 0

    def test_get_blogs(
        self,
        client,
        multiple_published_blogs,  # Create multiple published blogs for testing
    ):
        """Test getting all blogs"""
        response = client.get(f"{settings.API_V1_PREFIX}/blogs")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, dict)
        assert "blogs" in data
        assert "total" in data

    def test_get_blog_by_id(self, client, auth_headers, create_blog):
        """Test getting a blog by ID. Auth needed to get blogs with IDs"""
        response = client.get(
            f"{settings.API_V1_PREFIX}/blogs/{create_blog.id}/id", headers=auth_headers
        )
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == create_blog.id
        assert data["title"] == create_blog.title

    def test_get_nonexistent_blog_with_id(self, client, auth_headers):
        """Test getting a non-existent blog should fail"""
        response = client.get(
            f"{settings.API_V1_PREFIX}/blogs/999/id", headers=auth_headers
        )
        assert response.status_code == 404

    def test_get_blog_by_id_without_auth(self, client, create_blog):
        """Test getting a blog by ID without authentication should fail"""
        response = client.get(f"{settings.API_V1_PREFIX}/blogs/{create_blog.id}/id")
        assert response.status_code == 401

    def test_get_blog_by_slug(self, client, create_blog):
        """Test getting a blog by slug"""
        response = client.get(f"{settings.API_V1_PREFIX}/blogs/{create_blog.slug}/slug")
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == create_blog.id
        assert data["title"] == create_blog.title

    def test_get_nonexistent_blog_by_slug(self, client):
        """Test getting a non-existent blog by slug should fail"""
        response = client.get(f"{settings.API_V1_PREFIX}/blogs/nonexistent-slug/slug")
        assert response.status_code == 404


class TestBlogImage:
    """Test blog image endpoints"""

    def test_upload_blog_image(self, client, auth_headers, create_blog):
        """Test uploading a blog image"""
        response = client.post(
            f"{settings.API_V1_PREFIX}/blogs/{create_blog.id}/image",
            headers=auth_headers,
            files={
                "feature_image": (
                    "test_image.webp",
                    ImageFactory.get_sample_image_bytes(),
                )
            },
        )
        assert response.status_code == 200
        feature_image = response.json()["feature_image"]
        assert feature_image is not None

        print(f"Feature image: {feature_image}")

        if feature_image is not None:
            # remove testing image
            ImageUploadService.delete_image(feature_image)
