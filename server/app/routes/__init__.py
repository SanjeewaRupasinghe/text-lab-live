from fastapi import APIRouter
from .auth import router as auth_router
from .blog import router as blog_router


router = APIRouter(prefix="/api/v1")
router.include_router(auth_router, prefix="/auth", tags=["auth"])
router.include_router(blog_router, prefix="/blog", tags=["blog"])
