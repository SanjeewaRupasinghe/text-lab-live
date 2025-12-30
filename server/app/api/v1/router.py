from fastapi import APIRouter

from app.api.v1.endpoints import auth,blog


"""Main router file"""

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(blog.router, prefix="/blogs", tags=["blog"])
