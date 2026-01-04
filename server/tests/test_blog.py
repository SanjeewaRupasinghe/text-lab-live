from app.config import settings


class TestBlogCreate:
    def test_create_blog(self, client, auth_headers, blog_data):
        # Test creating a blog
        response = client.post(
            f"{settings.API_V1_PREFIX}/blogs", json=blog_data, headers=auth_headers
        )
        assert response.status_code == 200
        data = response.json()
        assert data["title"] == blog_data["title"]
        assert data["description"] == blog_data["description"]
        assert data["slug"] == blog_data["slug"]
